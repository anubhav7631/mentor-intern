package com.mentor.management.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskCreateRequest {
    private String title;
    private String description;
    private String taskType;
    private String startDate;
    private String dueDate;
    private String priority;
    private String attachmentUrl;
    private List<Long> internIds; // specific interns
    private String assignTo; // ALL, SELECTED, BATCH, DOMAIN
    private String batchName; // if assigning by batch
    private String departmentName; // if assigning by domain
}
