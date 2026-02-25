export interface User {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    role: string;
    token: string;
}

export interface Intern {
    id?: number;
    internId: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    department: string;
    batch: string;
    startDate: string;
    endDate: string;
    mentorId?: number;
    mentorName?: string;
    status: string;
    totalTasks?: number;
    completedTasks?: number;
    completionPercentage?: number;
}

export interface Task {
    id?: number;
    title: string;
    description: string;
    taskType: string;
    startDate: string;
    dueDate: string;
    createdDate?: string;
    priority: string;
    attachmentUrl?: string;
    createdById?: number;
    createdByName?: string;
    totalAssigned?: number;
    completedCount?: number;
    pendingCount?: number;
    overdueCount?: number;
    assignments?: TaskAssignment[];
}

export interface TaskAssignment {
    id: number;
    taskId: number;
    taskTitle: string;
    internId: number;
    internInternId: string;
    internName: string;
    status: string;
    assignedDate: string;
    completionDate?: string;
    remarks?: string;
    score?: number;
}

export interface TaskCreateRequest {
    title: string;
    description: string;
    taskType: string;
    startDate: string;
    dueDate: string;
    priority: string;
    attachmentUrl?: string;
    internIds?: number[];
    assignTo: string;
    batchName?: string;
    departmentName?: string;
}

export interface DashboardSummary {
    totalInterns: number;
    totalMentors: number;
    activeInterns: number;
    completedInterns: number;
    droppedInterns: number;
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    overdueTasks: number;
    avgCompletionPercentage: number;
}

export interface InternAnalytics {
    internId: number;
    internInternId: string;
    internName: string;
    department: string;
    batch: string;
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    overdueTasks: number;
    completionPercentage: number;
    averageScore: number;
}
