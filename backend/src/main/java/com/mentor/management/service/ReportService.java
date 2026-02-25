package com.mentor.management.service;

import com.mentor.management.model.Intern;
import com.mentor.management.model.TaskAssignment;
import com.mentor.management.model.enums.TaskAssignmentStatus;
import com.mentor.management.repository.InternRepository;
import com.mentor.management.repository.TaskAssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final InternRepository internRepository;
    private final TaskAssignmentRepository taskAssignmentRepository;

    public byte[] generateInternPerformanceReport() throws Exception {
        List<Intern> interns = internRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Intern Performance");

            // Header style
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setFontHeightInPoints((short) 12);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Headers
            Row headerRow = sheet.createRow(0);
            String[] headers = { "Intern ID", "Name", "Email", "College", "Department", "Batch",
                    "Status", "Total Tasks", "Completed", "Pending", "Overdue",
                    "Completion %", "Avg Score" };

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 5000);
            }

            // Data rows
            int rowIdx = 1;
            for (Intern intern : interns) {
                List<TaskAssignment> assignments = taskAssignmentRepository.findByInternId(intern.getId());
                long total = assignments.size();
                long completed = assignments.stream().filter(a -> a.getStatus() == TaskAssignmentStatus.COMPLETED)
                        .count();
                long pending = assignments.stream().filter(a -> a.getStatus() == TaskAssignmentStatus.NOT_STARTED
                        || a.getStatus() == TaskAssignmentStatus.IN_PROGRESS).count();
                long overdue = assignments.stream().filter(a -> a.getStatus() == TaskAssignmentStatus.OVERDUE).count();
                double pct = total > 0 ? (double) completed / total * 100 : 0;
                double avgScore = assignments.stream()
                        .filter(a -> a.getScore() != null)
                        .mapToDouble(TaskAssignment::getScore)
                        .average().orElse(0.0);

                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(intern.getInternId());
                row.createCell(1).setCellValue(intern.getName());
                row.createCell(2).setCellValue(intern.getEmail());
                row.createCell(3).setCellValue(intern.getCollege() != null ? intern.getCollege() : "");
                row.createCell(4).setCellValue(intern.getDepartment() != null ? intern.getDepartment() : "");
                row.createCell(5).setCellValue(intern.getBatch() != null ? intern.getBatch() : "");
                row.createCell(6).setCellValue(intern.getStatus().name());
                row.createCell(7).setCellValue(total);
                row.createCell(8).setCellValue(completed);
                row.createCell(9).setCellValue(pending);
                row.createCell(10).setCellValue(overdue);
                row.createCell(11).setCellValue(Math.round(pct * 100.0) / 100.0);
                row.createCell(12).setCellValue(Math.round(avgScore * 100.0) / 100.0);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return out.toByteArray();
        }
    }

    public byte[] generateTaskSummaryReport() throws Exception {
        List<TaskAssignment> allAssignments = taskAssignmentRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Task Summary");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            Row headerRow = sheet.createRow(0);
            String[] headers = { "Task Title", "Intern ID", "Intern Name", "Status",
                    "Assigned Date", "Completion Date", "Remarks", "Score" };

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 5000);
            }

            int rowIdx = 1;
            for (TaskAssignment a : allAssignments) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(a.getTask().getTitle());
                row.createCell(1).setCellValue(a.getIntern().getInternId());
                row.createCell(2).setCellValue(a.getIntern().getName());
                row.createCell(3).setCellValue(a.getStatus().name());
                row.createCell(4).setCellValue(a.getAssignedDate() != null ? a.getAssignedDate().toString() : "");
                row.createCell(5).setCellValue(a.getCompletionDate() != null ? a.getCompletionDate().toString() : "");
                row.createCell(6).setCellValue(a.getRemarks() != null ? a.getRemarks() : "");
                row.createCell(7).setCellValue(a.getScore() != null ? a.getScore() : 0);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return out.toByteArray();
        }
    }
}
