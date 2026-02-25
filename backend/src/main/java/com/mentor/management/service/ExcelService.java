package com.mentor.management.service;

import com.mentor.management.model.Intern;
import com.mentor.management.model.UploadLog;
import com.mentor.management.model.User;
import com.mentor.management.model.enums.InternStatus;
import com.mentor.management.repository.InternRepository;
import com.mentor.management.repository.UploadLogRepository;
import com.mentor.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ExcelService {

    private final InternRepository internRepository;
    private final UserRepository userRepository;
    private final UploadLogRepository uploadLogRepository;

    // All recognized aliases for each logical column (lowercase for matching)
    private static final String[][] COLUMN_ALIASES = {
            { "intern id", "internid", "intern_id", "id", "roll no", "rollno", "roll_no", "registration no",
                    "reg no", "regno" },
            { "name", "intern name", "intern_name", "full name", "fullname", "full_name", "student name" },
            { "email", "email id", "emailid", "email_id", "email address", "mail", "e-mail" },
            { "phone", "phone no", "phone number", "phoneno", "phone_no", "mobile", "mobile no", "contact",
                    "contact no" },
            { "college", "college name", "institution", "university", "school" },
            { "department", "dept", "branch", "stream", "specialization", "domain" },
            { "start date", "startdate", "start_date", "joining date", "join date", "from date", "from" },
            { "end date", "enddate", "end_date", "completion date", "to date", "to", "leaving date" },
            { "mentor", "mentor name", "mentor_name", "guide", "supervisor" },
            { "status", "intern status", "intern_status", "current status" }
    };

    @Transactional
    public Map<String, Object> processExcelUpload(MultipartFile file, Long mentorId) {
        Map<String, Object> result = new HashMap<>();
        List<String> errors = new ArrayList<>();
        int successCount = 0;
        int totalRows = 0;

        User mentor = userRepository.findById(mentorId).orElse(null);

        try (InputStream is = file.getInputStream();
                Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);
            int lastRow = sheet.getLastRowNum();

            // === Step 1: Read header row and build column index map ===
            Row headerRow = sheet.getRow(0);
            int[] columnMap = buildColumnMap(headerRow);

            // Check if we found at least intern ID, name, and email
            if (columnMap[0] == -1 && columnMap[1] == -1 && columnMap[2] == -1) {
                errors.add("Could not find required columns. Expected headers like: "
                        + "Intern ID, Name, Email, Phone, College, Department, Start Date, End Date, Mentor, Status");
                errors.add("Found headers: " + getHeaderNames(headerRow));
            }

            if (errors.isEmpty()) {
                // === Step 2: Process data rows ===
                for (int i = 1; i <= lastRow; i++) {
                    Row row = sheet.getRow(i);
                    if (row == null || isRowEmpty(row))
                        continue;
                    totalRows++;

                    try {
                        String internId = getCellStringValue(row, columnMap[0]);
                        String name = getCellStringValue(row, columnMap[1]);
                        String email = getCellStringValue(row, columnMap[2]);
                        String phone = getCellStringValue(row, columnMap[3]);
                        String college = getCellStringValue(row, columnMap[4]);
                        String department = getCellStringValue(row, columnMap[5]);
                        LocalDate startDate = getCellDateValue(row, columnMap[6]);
                        LocalDate endDate = getCellDateValue(row, columnMap[7]);
                        String mentorName = getCellStringValue(row, columnMap[8]);
                        String status = getCellStringValue(row, columnMap[9]);

                        // Validation
                        List<String> rowErrors = new ArrayList<>();
                        if (internId == null || internId.isEmpty())
                            rowErrors.add("Intern ID is empty");
                        if (name == null || name.isEmpty())
                            rowErrors.add("Name is empty");
                        if (email == null || email.isEmpty())
                            rowErrors.add("Email is empty");

                        if (internId != null && !internId.isEmpty()
                                && internRepository.existsByInternId(internId)) {
                            rowErrors.add("Duplicate Intern ID: " + internId);
                        }

                        if (!rowErrors.isEmpty()) {
                            errors.add("Row " + (i + 1) + ": " + String.join(", ", rowErrors));
                            continue;
                        }

                        InternStatus internStatus = InternStatus.ACTIVE;
                        if (status != null && !status.isEmpty()) {
                            try {
                                internStatus = InternStatus.valueOf(status.toUpperCase().replace(" ", "_"));
                            } catch (IllegalArgumentException e) {
                                internStatus = InternStatus.ACTIVE;
                            }
                        }

                        Intern intern = Intern.builder()
                                .internId(internId)
                                .name(name)
                                .email(email)
                                .phone(phone)
                                .college(college)
                                .department(department)
                                .startDate(startDate)
                                .endDate(endDate)
                                .mentor(mentor)
                                .status(internStatus)
                                .build();

                        internRepository.save(intern);
                        successCount++;

                    } catch (Exception e) {
                        errors.add("Row " + (i + 1) + ": " + e.getMessage());
                    }
                }
            }
        } catch (Exception e) {
            errors.add("Failed to process file: " + e.getMessage());
        }

        // Save upload log
        UploadLog log = UploadLog.builder()
                .fileName(file.getOriginalFilename())
                .uploadedBy(mentor)
                .totalRows(totalRows)
                .successRows(successCount)
                .errorRows(errors.size())
                .errorDetails(errors.isEmpty() ? null : String.join("\n", errors))
                .build();
        uploadLogRepository.save(log);

        result.put("totalRows", totalRows);
        result.put("successRows", successCount);
        result.put("errorRows", errors.size());
        result.put("errors", errors);
        result.put("message", successCount + " intern(s) imported successfully"
                + (errors.isEmpty() ? "" : ". " + errors.size() + " row(s) had errors."));

        return result;
    }

    /**
     * Builds a mapping from logical column index (0=InternID, 1=Name, etc.)
     * to the actual column position in the Excel sheet by matching header names.
     */
    private int[] buildColumnMap(Row headerRow) {
        int[] map = new int[COLUMN_ALIASES.length];
        Arrays.fill(map, -1);

        if (headerRow == null)
            return map;

        for (int col = 0; col <= headerRow.getLastCellNum(); col++) {
            Cell cell = headerRow.getCell(col);
            if (cell == null)
                continue;

            String header = getCellStringValueDirect(cell);
            if (header == null || header.isEmpty())
                continue;

            String normalized = header.toLowerCase().trim()
                    .replaceAll("[^a-z0-9 ]", " ")
                    .replaceAll("\\s+", " ")
                    .trim();

            for (int logicalIdx = 0; logicalIdx < COLUMN_ALIASES.length; logicalIdx++) {
                if (map[logicalIdx] != -1)
                    continue; // already mapped
                for (String alias : COLUMN_ALIASES[logicalIdx]) {
                    if (normalized.equals(alias) || normalized.contains(alias)) {
                        map[logicalIdx] = col;
                        break;
                    }
                }
            }
        }
        return map;
    }

    private String getHeaderNames(Row headerRow) {
        if (headerRow == null)
            return "(no header row found)";
        List<String> names = new ArrayList<>();
        for (int col = 0; col <= headerRow.getLastCellNum(); col++) {
            Cell cell = headerRow.getCell(col);
            if (cell != null) {
                String val = getCellStringValueDirect(cell);
                if (val != null && !val.isEmpty())
                    names.add(val);
            }
        }
        return names.isEmpty() ? "(empty header row)" : String.join(", ", names);
    }

    private boolean isRowEmpty(Row row) {
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            if (cell != null && cell.getCellType() != CellType.BLANK) {
                String val = getCellStringValueDirect(cell);
                if (val != null && !val.isEmpty())
                    return false;
            }
        }
        return true;
    }

    private String getCellStringValue(Row row, int colIndex) {
        if (colIndex < 0 || row == null)
            return null;
        Cell cell = row.getCell(colIndex);
        return getCellStringValueDirect(cell);
    }

    private String getCellStringValueDirect(Cell cell) {
        if (cell == null)
            return null;

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue() != null ? cell.getStringCellValue().trim() : null;
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    Date date = cell.getDateCellValue();
                    return date != null ? date.toInstant().atZone(ZoneId.systemDefault())
                            .toLocalDate().toString() : null;
                }
                double num = cell.getNumericCellValue();
                if (num == Math.floor(num) && !Double.isInfinite(num)) {
                    return String.valueOf((long) num);
                }
                return String.valueOf(num);
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                try {
                    return cell.getStringCellValue();
                } catch (Exception e) {
                    try {
                        return String.valueOf(cell.getNumericCellValue());
                    } catch (Exception e2) {
                        return null;
                    }
                }
            case BLANK:
            default:
                return null;
        }
    }

    private LocalDate getCellDateValue(Row row, int colIndex) {
        if (colIndex < 0 || row == null)
            return null;
        Cell cell = row.getCell(colIndex);
        if (cell == null)
            return null;

        try {
            if (cell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(cell)) {
                Date date = cell.getDateCellValue();
                return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            } else {
                String dateStr = getCellStringValueDirect(cell);
                if (dateStr != null && !dateStr.isEmpty()) {
                    // Try multiple date formats
                    String[] formats = { "yyyy-MM-dd", "dd-MM-yyyy", "MM/dd/yyyy", "dd/MM/yyyy",
                            "d-M-yyyy", "M/d/yyyy", "yyyy/MM/dd" };
                    for (String fmt : formats) {
                        try {
                            return LocalDate.parse(dateStr, DateTimeFormatter.ofPattern(fmt));
                        } catch (Exception ignored) {
                        }
                    }
                    // Last resort: ISO format
                    return LocalDate.parse(dateStr);
                }
            }
        } catch (Exception ignored) {
        }
        return null;
    }
}
