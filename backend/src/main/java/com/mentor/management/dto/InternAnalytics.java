package com.mentor.management.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InternAnalytics {
    private Long internId;
    private String internInternId;
    private String internName;
    private String department;
    private String batch;
    private int totalTasks;
    private int completedTasks;
    private int pendingTasks;
    private int overdueTasks;
    private double completionPercentage;
    private double averageScore;
}
