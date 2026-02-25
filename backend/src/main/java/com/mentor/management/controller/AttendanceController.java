package com.mentor.management.controller;

import com.mentor.management.model.Intern;
import com.mentor.management.repository.InternRepository;
import com.mentor.management.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final InternRepository internRepository;

    // ── Resolve intern ID for logged-in user ────────────────────

    @GetMapping("/my-intern-id")
    public ResponseEntity<?> getMyInternId(@AuthenticationPrincipal UserDetails userDetails) {
        Optional<Intern> intern = internRepository.findByEmail(userDetails.getUsername());
        if (intern.isEmpty()) {
            // Try matching on email rather than username
            return ResponseEntity.ok(Map.of("internId", -1, "message", "No intern record linked to this account"));
        }
        return ResponseEntity.ok(Map.of("internId", intern.get().getId(), "internName", intern.get().getName()));
    }

    // ── Intern endpoints ────────────────────────────────────────

    @PostMapping("/check-in/{internId}")
    public ResponseEntity<?> checkIn(@PathVariable Long internId) {
        try {
            return ResponseEntity.ok(attendanceService.checkIn(internId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/check-out/{internId}")
    public ResponseEntity<?> checkOut(@PathVariable Long internId) {
        try {
            return ResponseEntity.ok(attendanceService.checkOut(internId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/leave/{internId}")
    public ResponseEntity<?> applyLeave(@PathVariable Long internId,
            @RequestBody Map<String, String> request) {
        try {
            return ResponseEntity.ok(attendanceService.applyLeave(
                    internId,
                    request.get("date"),
                    request.get("leaveType"),
                    request.get("reason")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/today/{internId}")
    public ResponseEntity<?> getTodayStatus(@PathVariable Long internId) {
        return ResponseEntity.ok(attendanceService.getTodayStatus(internId));
    }

    @GetMapping("/history/{internId}")
    public ResponseEntity<?> getInternHistory(@PathVariable Long internId,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end) {
        return ResponseEntity.ok(attendanceService.getInternHistory(internId, start, end));
    }

    @GetMapping("/stats/{internId}")
    public ResponseEntity<?> getInternStats(@PathVariable Long internId,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end) {
        return ResponseEntity.ok(attendanceService.getInternStats(internId, start, end));
    }

    // ── Mentor endpoints ────────────────────────────────────────

    @GetMapping("/today")
    public ResponseEntity<?> getAllTodayAttendance() {
        return ResponseEntity.ok(attendanceService.getAllTodayAttendance());
    }

    @GetMapping("/report")
    public ResponseEntity<?> getAttendanceReport(
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end) {
        return ResponseEntity.ok(attendanceService.getAttendanceReport(start, end));
    }

    @PostMapping("/mark/{internId}")
    public ResponseEntity<?> markAttendance(@PathVariable Long internId,
            @RequestBody Map<String, String> request) {
        try {
            return ResponseEntity.ok(attendanceService.markAttendance(
                    internId,
                    request.get("date"),
                    request.get("status"),
                    request.get("remarks")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
