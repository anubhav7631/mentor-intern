package com.mentor.management.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskAssignmentDTO {
    private Long id;
    private Long taskId;
    private String taskTitle;
    private Long internId;
    private String internInternId;
    private String internName;
    private String status;
    private LocalDate assignedDate;
    private LocalDate completionDate;
    private String remarks;
    private Double score;
}
