package com.mentor.management.service;

import com.mentor.management.model.Attendance;
import com.mentor.management.model.Intern;
import com.mentor.management.model.enums.AttendanceStatus;
import com.mentor.management.model.enums.LeaveType;
import com.mentor.management.repository.AttendanceRepository;
import com.mentor.management.repository.InternRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final InternRepository internRepository;

    // ── Intern actions ──────────────────────────────────────────

    @Transactional
    public Map<String, Object> checkIn(Long internId) {
        Intern intern = internRepository.findById(internId)
                .orElseThrow(() -> new RuntimeException("Intern not found"));

        LocalDate today = LocalDate.now();

        Optional<Attendance> existing = attendanceRepository.findByInternIdAndDate(internId, today);
        if (existing.isPresent()) {
            Attendance a = existing.get();
            if (a.getCheckInTime() != null) {
                return Map.of("message", "Already checked in today", "attendance", toMap(a));
            }
        }

        Attendance attendance = existing.orElse(Attendance.builder()
                .intern(intern)
                .date(today)
                .status(AttendanceStatus.PRESENT)
                .build());

        attendance.setCheckInTime(LocalTime.now());
        attendance.setStatus(AttendanceStatus.PRESENT);
        attendanceRepository.save(attendance);

        return Map.of("message", "Checked in successfully", "attendance", toMap(attendance));
    }

    @Transactional
    public Map<String, Object> checkOut(Long internId) {
        LocalDate today = LocalDate.now();

        Attendance attendance = attendanceRepository.findByInternIdAndDate(internId, today)
                .orElseThrow(() -> new RuntimeException("No check-in found for today. Please check in first."));

        if (attendance.getCheckInTime() == null) {
            throw new RuntimeException("Please check in before checking out.");
        }
        if (attendance.getCheckOutTime() != null) {
            return Map.of("message", "Already checked out today", "attendance", toMap(attendance));
        }

        attendance.setCheckOutTime(LocalTime.now());

        // Determine half-day based on hours worked
        long minutesWorked = java.time.Duration.between(attendance.getCheckInTime(), attendance.getCheckOutTime())
                .toMinutes();
        if (minutesWorked < 240) { // less than 4 hours
            attendance.setStatus(AttendanceStatus.HALF_DAY);
        }

        attendanceRepository.save(attendance);
        return Map.of("message", "Checked out successfully", "attendance", toMap(attendance));
    }

    @Transactional
    public Map<String, Object> applyLeave(Long internId, String dateStr, String leaveTypeStr, String reason) {
        Intern intern = internRepository.findById(internId)
                .orElseThrow(() -> new RuntimeException("Intern not found"));

        LocalDate date = LocalDate.parse(dateStr);

        if (attendanceRepository.existsByInternIdAndDate(internId, date)) {
            Attendance existing = attendanceRepository.findByInternIdAndDate(internId, date).get();
            if (existing.getStatus() == AttendanceStatus.PRESENT || existing.getCheckInTime() != null) {
                throw new RuntimeException("Cannot apply leave for a day already marked as present");
            }
            // Update existing record to leave
            existing.setStatus(AttendanceStatus.ON_LEAVE);
            existing.setLeaveType(LeaveType.valueOf(leaveTypeStr.toUpperCase()));
            existing.setLeaveReason(reason);
            attendanceRepository.save(existing);
            return Map.of("message", "Leave applied successfully", "attendance", toMap(existing));
        }

        Attendance attendance = Attendance.builder()
                .intern(intern)
                .date(date)
                .status(AttendanceStatus.ON_LEAVE)
                .leaveType(LeaveType.valueOf(leaveTypeStr.toUpperCase()))
                .leaveReason(reason)
                .build();

        attendanceRepository.save(attendance);
        return Map.of("message", "Leave applied successfully", "attendance", toMap(attendance));
    }

    // ── Queries ─────────────────────────────────────────────────

    public Map<String, Object> getTodayStatus(Long internId) {
        LocalDate today = LocalDate.now();
        Optional<Attendance> attendance = attendanceRepository.findByInternIdAndDate(internId, today);
        if (attendance.isPresent()) {
            return toMap(attendance.get());
        }
        return Map.of("status", "NOT_MARKED", "date", today.toString());
    }

    public List<Map<String, Object>> getInternHistory(Long internId, String startStr, String endStr) {
        LocalDate start = startStr != null ? LocalDate.parse(startStr) : LocalDate.now().withDayOfMonth(1);
        LocalDate end = endStr != null ? LocalDate.parse(endStr) : LocalDate.now();

        return attendanceRepository.findByInternIdAndDateBetweenOrderByDateDesc(internId, start, end)
                .stream().map(this::toMap).collect(Collectors.toList());
    }

    public Map<String, Object> getInternStats(Long internId, String startStr, String endStr) {
        LocalDate start = startStr != null ? LocalDate.parse(startStr) : LocalDate.now().withDayOfMonth(1);
        LocalDate end = endStr != null ? LocalDate.parse(endStr) : LocalDate.now();

        long present = attendanceRepository.countByInternIdAndStatusAndDateBetween(internId, AttendanceStatus.PRESENT,
                start, end);
        long halfDay = attendanceRepository.countByInternIdAndStatusAndDateBetween(internId, AttendanceStatus.HALF_DAY,
                start, end);
        long onLeave = attendanceRepository.countByInternIdAndStatusAndDateBetween(internId, AttendanceStatus.ON_LEAVE,
                start, end);
        long absent = attendanceRepository.countByInternIdAndStatusAndDateBetween(internId, AttendanceStatus.ABSENT,
                start, end);

        long totalDays = java.time.temporal.ChronoUnit.DAYS.between(start, end) + 1;
        // Exclude weekends
        long workingDays = 0;
        for (LocalDate d = start; !d.isAfter(end); d = d.plusDays(1)) {
            if (d.getDayOfWeek().getValue() <= 5)
                workingDays++;
        }

        double percentage = workingDays > 0 ? (double) (present + halfDay * 0.5) / workingDays * 100 : 0;

        Map<String, Object> stats = new HashMap<>();
        stats.put("present", present);
        stats.put("halfDay", halfDay);
        stats.put("onLeave", onLeave);
        stats.put("absent", absent);
        stats.put("totalDays", totalDays);
        stats.put("workingDays", workingDays);
        stats.put("attendancePercentage", Math.round(percentage * 10.0) / 10.0);
        stats.put("startDate", start.toString());
        stats.put("endDate", end.toString());
        return stats;
    }

    // ── Mentor views ────────────────────────────────────────────

    public List<Map<String, Object>> getAllTodayAttendance() {
        LocalDate today = LocalDate.now();
        List<Intern> allInterns = internRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Intern intern : allInterns) {
            Optional<Attendance> att = attendanceRepository.findByInternIdAndDate(intern.getId(), today);
            Map<String, Object> entry = new HashMap<>();
            entry.put("internId", intern.getId());
            entry.put("internInternId", intern.getInternId());
            entry.put("internName", intern.getName());
            entry.put("department", intern.getDepartment());
            entry.put("batch", intern.getBatch());

            if (att.isPresent()) {
                Attendance a = att.get();
                entry.put("status", a.getStatus().name());
                entry.put("checkInTime", a.getCheckInTime() != null ? a.getCheckInTime().toString() : null);
                entry.put("checkOutTime", a.getCheckOutTime() != null ? a.getCheckOutTime().toString() : null);
                entry.put("leaveType", a.getLeaveType() != null ? a.getLeaveType().name() : null);
            } else {
                entry.put("status", "NOT_MARKED");
                entry.put("checkInTime", null);
                entry.put("checkOutTime", null);
                entry.put("leaveType", null);
            }

            result.add(entry);
        }
        return result;
    }

    public List<Map<String, Object>> getAttendanceReport(String startStr, String endStr) {
        LocalDate start = startStr != null ? LocalDate.parse(startStr) : LocalDate.now().withDayOfMonth(1);
        LocalDate end = endStr != null ? LocalDate.parse(endStr) : LocalDate.now();

        List<Intern> allInterns = internRepository.findAll();
        List<Map<String, Object>> report = new ArrayList<>();

        for (Intern intern : allInterns) {
            Map<String, Object> stats = getInternStats(intern.getId(), start.toString(), end.toString());
            stats.put("internId", intern.getId());
            stats.put("internInternId", intern.getInternId());
            stats.put("internName", intern.getName());
            stats.put("department", intern.getDepartment());
            stats.put("batch", intern.getBatch());
            report.add(stats);
        }
        return report;
    }

    @Transactional
    public Map<String, Object> markAttendance(Long internId, String dateStr, String statusStr, String remarks) {
        Intern intern = internRepository.findById(internId)
                .orElseThrow(() -> new RuntimeException("Intern not found"));

        LocalDate date = LocalDate.parse(dateStr);
        AttendanceStatus status = AttendanceStatus.valueOf(statusStr.toUpperCase());

        Attendance attendance = attendanceRepository.findByInternIdAndDate(internId, date)
                .orElse(Attendance.builder()
                        .intern(intern)
                        .date(date)
                        .build());

        attendance.setStatus(status);
        attendance.setRemarks(remarks);
        attendanceRepository.save(attendance);

        return Map.of("message", "Attendance marked successfully", "attendance", toMap(attendance));
    }

    // ── Helpers ──────────────────────────────────────────────────

    private Map<String, Object> toMap(Attendance a) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", a.getId());
        map.put("internId", a.getIntern().getId());
        map.put("internName", a.getIntern().getName());
        map.put("date", a.getDate().toString());
        map.put("checkInTime", a.getCheckInTime() != null ? a.getCheckInTime().toString() : null);
        map.put("checkOutTime", a.getCheckOutTime() != null ? a.getCheckOutTime().toString() : null);
        map.put("status", a.getStatus().name());
        map.put("leaveType", a.getLeaveType() != null ? a.getLeaveType().name() : null);
        map.put("leaveReason", a.getLeaveReason());
        map.put("remarks", a.getRemarks());
        return map;
    }
}
