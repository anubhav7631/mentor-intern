package com.mentor.management.controller;

import com.mentor.management.dto.TaskAssignmentDTO;
import com.mentor.management.dto.TaskCreateRequest;
import com.mentor.management.dto.TaskDTO;
import com.mentor.management.model.User;
import com.mentor.management.repository.UserRepository;
import com.mentor.management.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/my-tasks")
    public ResponseEntity<List<TaskDTO>> getMyTasks(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(taskService.getTasksByMentor(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskCreateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(taskService.createTask(request, user.getId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @RequestBody TaskCreateRequest request) {
        return ResponseEntity.ok(taskService.updateTask(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/assign")
    public ResponseEntity<TaskDTO> assignTask(@PathVariable Long id, @RequestBody List<Long> internIds) {
        return ResponseEntity.ok(taskService.assignTaskToInterns(id, internIds));
    }

    @PutMapping("/assignments/{assignmentId}/complete")
    public ResponseEntity<TaskAssignmentDTO> completeAssignment(
            @PathVariable Long assignmentId,
            @RequestBody Map<String, Object> body) {
        String remarks = (String) body.getOrDefault("remarks", null);
        Double score = body.get("score") != null ? Double.valueOf(body.get("score").toString()) : null;
        return ResponseEntity.ok(taskService.completeAssignment(assignmentId, remarks, score));
    }

    @PutMapping("/{id}/complete-all")
    public ResponseEntity<List<TaskAssignmentDTO>> completeAll(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        String remarks = (String) body.getOrDefault("remarks", null);
        Double score = body.get("score") != null ? Double.valueOf(body.get("score").toString()) : null;
        return ResponseEntity.ok(taskService.completeAllAssignments(id, remarks, score));
    }

    @PutMapping("/assignments/{assignmentId}/status")
    public ResponseEntity<TaskAssignmentDTO> updateAssignmentStatus(
            @PathVariable Long assignmentId,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(taskService.updateAssignmentStatus(assignmentId, body.get("status")));
    }

    @GetMapping("/intern/{internId}/assignments")
    public ResponseEntity<List<TaskAssignmentDTO>> getInternAssignments(@PathVariable Long internId) {
        return ResponseEntity.ok(taskService.getAssignmentsByIntern(internId));
    }
}
