package com.mentor.management.controller;

import com.mentor.management.dto.DashboardSummary;
import com.mentor.management.dto.InternAnalytics;
import com.mentor.management.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummary> getSummary() {
        return ResponseEntity.ok(dashboardService.getSummary());
    }

    @GetMapping("/analytics")
    public ResponseEntity<List<InternAnalytics>> getAnalytics(
            @RequestParam(required = false) String batch,
            @RequestParam(required = false) String department) {
        return ResponseEntity.ok(dashboardService.getInternAnalytics(batch, department));
    }
}
