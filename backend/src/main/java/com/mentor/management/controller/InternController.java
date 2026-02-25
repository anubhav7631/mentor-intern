package com.mentor.management.controller;

import com.mentor.management.dto.InternDTO;
import com.mentor.management.model.User;
import com.mentor.management.repository.UserRepository;
import com.mentor.management.service.ExcelService;
import com.mentor.management.service.InternService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interns")
@RequiredArgsConstructor
public class InternController {

    private final InternService internService;
    private final ExcelService excelService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<InternDTO>> getAllInterns() {
        return ResponseEntity.ok(internService.getAllInterns());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InternDTO> getIntern(@PathVariable Long id) {
        return ResponseEntity.ok(internService.getInternById(id));
    }

    @GetMapping("/by-intern-id/{internId}")
    public ResponseEntity<InternDTO> getByInternId(@PathVariable String internId) {
        return ResponseEntity.ok(internService.getInternByInternId(internId));
    }

    @PostMapping
    public ResponseEntity<InternDTO> createIntern(@RequestBody InternDTO dto) {
        return ResponseEntity.ok(internService.createIntern(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternDTO> updateIntern(@PathVariable Long id, @RequestBody InternDTO dto) {
        return ResponseEntity.ok(internService.updateIntern(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIntern(@PathVariable Long id) {
        internService.deleteIntern(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<InternDTO>> searchInterns(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String batch,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String college) {
        return ResponseEntity.ok(internService.searchInterns(search, status, batch, department, college));
    }

    @GetMapping("/filters")
    public ResponseEntity<Map<String, List<String>>> getFilterOptions() {
        return ResponseEntity.ok(internService.getFilterOptions());
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadExcel(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(excelService.processExcelUpload(file, user.getId()));
    }
}
