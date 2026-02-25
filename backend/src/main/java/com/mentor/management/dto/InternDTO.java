package com.mentor.management.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InternDTO {
    private Long id;
    private String internId;
    private String name;
    private String email;
    private String phone;
    private String college;
    private String department;
    private String batch;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long mentorId;
    private String mentorName;
    private String status;
    private int totalTasks;
    private int completedTasks;
    private double completionPercentage;
}
