package com.mentor.management.controller;

import com.mentor.management.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/intern-performance")
    public ResponseEntity<byte[]> exportInternPerformance() throws Exception {
        byte[] report = reportService.generateInternPerformanceReport();

        return ResponseEntity.ok()
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=intern_performance_report.xlsx")
                .body(report);
    }

    @GetMapping("/task-summary")
    public ResponseEntity<byte[]> exportTaskSummary() throws Exception {
        byte[] report = reportService.generateTaskSummaryReport();

        return ResponseEntity.ok()
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=task_summary_report.xlsx")
                .body(report);
    }
}
