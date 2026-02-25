package com.mentor.management.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummary {
    private long totalInterns;
    private long totalMentors;
    private long activeInterns;
    private long completedInterns;
    private long droppedInterns;
    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private long overdueTasks;
    private double avgCompletionPercentage;
}
