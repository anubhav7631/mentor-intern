package com.mentor.management.service;

import com.mentor.management.dto.DashboardSummary;
import com.mentor.management.dto.InternAnalytics;
import com.mentor.management.model.Intern;
import com.mentor.management.model.TaskAssignment;
import com.mentor.management.model.enums.InternStatus;
import com.mentor.management.model.enums.Role;
import com.mentor.management.model.enums.TaskAssignmentStatus;
import com.mentor.management.repository.InternRepository;
import com.mentor.management.repository.TaskAssignmentRepository;
import com.mentor.management.repository.TaskRepository;
import com.mentor.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final InternRepository internRepository;
    private final TaskRepository taskRepository;
    private final TaskAssignmentRepository taskAssignmentRepository;
    private final UserRepository userRepository;

    public DashboardSummary getSummary() {
        long totalInterns = internRepository.count();
        long totalMentors = userRepository.countByRole(Role.MENTOR);
        long activeInterns = internRepository.countByStatus(InternStatus.ACTIVE);
        long completedInterns = internRepository.countByStatus(InternStatus.COMPLETED);
        long droppedInterns = internRepository.countByStatus(InternStatus.DROPPED);

        long totalTasks = taskRepository.count();
        long completedTasks = taskAssignmentRepository.countByStatus(TaskAssignmentStatus.COMPLETED);
        long pendingTasks = taskAssignmentRepository.countByStatus(TaskAssignmentStatus.NOT_STARTED)
                + taskAssignmentRepository.countByStatus(TaskAssignmentStatus.IN_PROGRESS);
        long overdueTasks = taskAssignmentRepository.countByStatus(TaskAssignmentStatus.OVERDUE);

        long totalAssignments = taskAssignmentRepository.count();
        double avgCompletion = totalAssignments > 0 ? (double) completedTasks / totalAssignments * 100 : 0;

        return DashboardSummary.builder()
                .totalInterns(totalInterns)
                .totalMentors(totalMentors)
                .activeInterns(activeInterns)
                .completedInterns(completedInterns)
                .droppedInterns(droppedInterns)
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .pendingTasks(pendingTasks)
                .overdueTasks(overdueTasks)
                .avgCompletionPercentage(Math.round(avgCompletion * 100.0) / 100.0)
                .build();
    }

    public List<InternAnalytics> getInternAnalytics(String batch, String department) {
        List<Intern> interns;

        if (batch != null && !batch.isEmpty()) {
            interns = internRepository.findByBatch(batch);
        } else if (department != null && !department.isEmpty()) {
            interns = internRepository.findByDepartment(department);
        } else {
            interns = internRepository.findAll();
        }

        return interns.stream().map(intern -> {
            List<TaskAssignment> assignments = taskAssignmentRepository.findByInternId(intern.getId());
            long total = assignments.size();
            long completed = assignments.stream().filter(a -> a.getStatus() == TaskAssignmentStatus.COMPLETED).count();
            long pending = assignments.stream().filter(a -> a.getStatus() == TaskAssignmentStatus.NOT_STARTED
                    || a.getStatus() == TaskAssignmentStatus.IN_PROGRESS).count();
            long overdue = assignments.stream().filter(a -> a.getStatus() == TaskAssignmentStatus.OVERDUE).count();

            double completionPct = total > 0 ? (double) completed / total * 100 : 0;
            double avgScore = assignments.stream()
                    .filter(a -> a.getScore() != null)
                    .mapToDouble(TaskAssignment::getScore)
                    .average()
                    .orElse(0.0);

            return InternAnalytics.builder()
                    .internId(intern.getId())
                    .internInternId(intern.getInternId())
                    .internName(intern.getName())
                    .department(intern.getDepartment())
                    .batch(intern.getBatch())
                    .totalTasks((int) total)
                    .completedTasks((int) completed)
                    .pendingTasks((int) pending)
                    .overdueTasks((int) overdue)
                    .completionPercentage(Math.round(completionPct * 100.0) / 100.0)
                    .averageScore(Math.round(avgScore * 100.0) / 100.0)
                    .build();
        }).collect(Collectors.toList());
    }
}
