package com.mentor.management.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private String taskType;
    private LocalDate startDate;
    private LocalDate dueDate;
    private String createdDate;
    private String priority;
    private String attachmentUrl;
    private Long createdById;
    private String createdByName;
    private int totalAssigned;
    private int completedCount;
    private int pendingCount;
    private int overdueCount;
    private List<TaskAssignmentDTO> assignments;
}
