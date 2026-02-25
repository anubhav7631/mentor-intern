package com.mentor.management.service;

import com.mentor.management.dto.TaskAssignmentDTO;
import com.mentor.management.dto.TaskCreateRequest;
import com.mentor.management.dto.TaskDTO;
import com.mentor.management.exception.ResourceNotFoundException;
import com.mentor.management.model.Intern;
import com.mentor.management.model.Task;
import com.mentor.management.model.TaskAssignment;
import com.mentor.management.model.User;
import com.mentor.management.model.enums.TaskAssignmentStatus;
import com.mentor.management.model.enums.TaskPriority;
import com.mentor.management.model.enums.TaskType;
import com.mentor.management.repository.InternRepository;
import com.mentor.management.repository.TaskAssignmentRepository;
import com.mentor.management.repository.TaskRepository;
import com.mentor.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskAssignmentRepository taskAssignmentRepository;
    private final InternRepository internRepository;
    private final UserRepository userRepository;

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksByMentor(Long mentorId) {
        return taskRepository.findByCreatedByIdOrderByCreatedDateDesc(mentorId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        return toDTO(task);
    }

    @Transactional
    public TaskDTO createTask(TaskCreateRequest request, Long mentorId) {
        User mentor = userRepository.findById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found"));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .taskType(TaskType.valueOf(request.getTaskType().toUpperCase()))
                .startDate(LocalDate.parse(request.getStartDate()))
                .dueDate(LocalDate.parse(request.getDueDate()))
                .priority(TaskPriority.valueOf(request.getPriority().toUpperCase()))
                .attachmentUrl(request.getAttachmentUrl())
                .createdBy(mentor)
                .assignments(new ArrayList<>())
                .build();

        task = taskRepository.save(task);

        // Assign task based on assignment type
        List<Intern> internsToAssign = getInternsForAssignment(request);
        for (Intern intern : internsToAssign) {
            if (!taskAssignmentRepository.existsByTaskIdAndInternId(task.getId(), intern.getId())) {
                TaskAssignment assignment = TaskAssignment.builder()
                        .task(task)
                        .intern(intern)
                        .status(TaskAssignmentStatus.NOT_STARTED)
                        .assignedDate(LocalDate.now())
                        .build();
                taskAssignmentRepository.save(assignment);
            }
        }

        return toDTO(task);
    }

    @Transactional
    public TaskDTO updateTask(Long id, TaskCreateRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setTaskType(TaskType.valueOf(request.getTaskType().toUpperCase()));
        task.setStartDate(LocalDate.parse(request.getStartDate()));
        task.setDueDate(LocalDate.parse(request.getDueDate()));
        task.setPriority(TaskPriority.valueOf(request.getPriority().toUpperCase()));
        task.setAttachmentUrl(request.getAttachmentUrl());

        task = taskRepository.save(task);
        return toDTO(task);
    }

    @Transactional
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }

    @Transactional
    public TaskAssignmentDTO completeAssignment(Long assignmentId, String remarks, Double score) {
        TaskAssignment assignment = taskAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));

        assignment.setStatus(TaskAssignmentStatus.COMPLETED);
        assignment.setCompletionDate(LocalDate.now());
        assignment.setRemarks(remarks);
        assignment.setScore(score);

        assignment = taskAssignmentRepository.save(assignment);
        return toAssignmentDTO(assignment);
    }

    @Transactional
    public List<TaskAssignmentDTO> completeAllAssignments(Long taskId, String remarks, Double score) {
        List<TaskAssignment> assignments = taskAssignmentRepository.findByTaskId(taskId);
        List<TaskAssignmentDTO> result = new ArrayList<>();

        for (TaskAssignment assignment : assignments) {
            if (assignment.getStatus() != TaskAssignmentStatus.COMPLETED) {
                assignment.setStatus(TaskAssignmentStatus.COMPLETED);
                assignment.setCompletionDate(LocalDate.now());
                assignment.setRemarks(remarks);
                assignment.setScore(score);
                taskAssignmentRepository.save(assignment);
            }
            result.add(toAssignmentDTO(assignment));
        }
        return result;
    }

    @Transactional
    public TaskAssignmentDTO updateAssignmentStatus(Long assignmentId, String status) {
        TaskAssignment assignment = taskAssignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));

        assignment.setStatus(TaskAssignmentStatus.valueOf(status.toUpperCase()));
        if (assignment.getStatus() == TaskAssignmentStatus.COMPLETED) {
            assignment.setCompletionDate(LocalDate.now());
        }

        assignment = taskAssignmentRepository.save(assignment);
        return toAssignmentDTO(assignment);
    }

    public List<TaskAssignmentDTO> getAssignmentsByIntern(Long internId) {
        return taskAssignmentRepository.findByInternIdOrderByDueDate(internId).stream()
                .map(this::toAssignmentDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public TaskDTO assignTaskToInterns(Long taskId, List<Long> internIds) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        for (Long internId : internIds) {
            Intern intern = internRepository.findById(internId)
                    .orElseThrow(() -> new ResourceNotFoundException("Intern not found: " + internId));

            if (!taskAssignmentRepository.existsByTaskIdAndInternId(taskId, internId)) {
                TaskAssignment assignment = TaskAssignment.builder()
                        .task(task)
                        .intern(intern)
                        .status(TaskAssignmentStatus.NOT_STARTED)
                        .assignedDate(LocalDate.now())
                        .build();
                taskAssignmentRepository.save(assignment);
            }
        }

        return toDTO(task);
    }

    private List<Intern> getInternsForAssignment(TaskCreateRequest request) {
        if (request.getAssignTo() == null || request.getAssignTo().isEmpty()) {
            return new ArrayList<>();
        }

        switch (request.getAssignTo().toUpperCase()) {
            case "ALL":
                return internRepository.findAll();
            case "SELECTED":
                if (request.getInternIds() != null) {
                    return internRepository.findAllById(request.getInternIds());
                }
                return new ArrayList<>();
            case "BATCH":
                if (request.getBatchName() != null) {
                    return internRepository.findByBatch(request.getBatchName());
                }
                return new ArrayList<>();
            case "DOMAIN":
                if (request.getDepartmentName() != null) {
                    return internRepository.findByDepartment(request.getDepartmentName());
                }
                return new ArrayList<>();
            default:
                return new ArrayList<>();
        }
    }

    private TaskDTO toDTO(Task task) {
        List<TaskAssignment> assignments = taskAssignmentRepository.findByTaskId(task.getId());

        long completed = assignments.stream().filter(a -> a.getStatus() == TaskAssignmentStatus.COMPLETED).count();
        long overdue = assignments.stream().filter(a -> a.getStatus() == TaskAssignmentStatus.OVERDUE).count();
        long pending = assignments.size() - completed - overdue;

        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .taskType(task.getTaskType().name())
                .startDate(task.getStartDate())
                .dueDate(task.getDueDate())
                .createdDate(task.getCreatedDate() != null ? task.getCreatedDate().toString() : null)
                .priority(task.getPriority().name())
                .attachmentUrl(task.getAttachmentUrl())
                .createdById(task.getCreatedBy().getId())
                .createdByName(task.getCreatedBy().getFullName())
                .totalAssigned(assignments.size())
                .completedCount((int) completed)
                .pendingCount((int) pending)
                .overdueCount((int) overdue)
                .assignments(assignments.stream().map(this::toAssignmentDTO).collect(Collectors.toList()))
                .build();
    }

    private TaskAssignmentDTO toAssignmentDTO(TaskAssignment a) {
        return TaskAssignmentDTO.builder()
                .id(a.getId())
                .taskId(a.getTask().getId())
                .taskTitle(a.getTask().getTitle())
                .internId(a.getIntern().getId())
                .internInternId(a.getIntern().getInternId())
                .internName(a.getIntern().getName())
                .status(a.getStatus().name())
                .assignedDate(a.getAssignedDate())
                .completionDate(a.getCompletionDate())
                .remarks(a.getRemarks())
                .score(a.getScore())
                .build();
    }
}
