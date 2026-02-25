package com.mentor.management.repository;

import com.mentor.management.model.TaskAssignment;
import com.mentor.management.model.enums.TaskAssignmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TaskAssignmentRepository extends JpaRepository<TaskAssignment, Long> {
    List<TaskAssignment> findByTaskId(Long taskId);

    List<TaskAssignment> findByInternId(Long internId);

    List<TaskAssignment> findByInternIdAndStatus(Long internId, TaskAssignmentStatus status);

    long countByStatus(TaskAssignmentStatus status);

    long countByInternId(Long internId);

    long countByInternIdAndStatus(Long internId, TaskAssignmentStatus status);

    @Query("SELECT COUNT(ta) FROM TaskAssignment ta WHERE ta.task.createdBy.id = :mentorId")
    long countByMentorId(@Param("mentorId") Long mentorId);

    @Query("SELECT COUNT(ta) FROM TaskAssignment ta WHERE ta.task.createdBy.id = :mentorId AND ta.status = :status")
    long countByMentorIdAndStatus(@Param("mentorId") Long mentorId, @Param("status") TaskAssignmentStatus status);

    @Query("SELECT ta FROM TaskAssignment ta WHERE ta.intern.id = :internId ORDER BY ta.task.dueDate ASC")
    List<TaskAssignment> findByInternIdOrderByDueDate(@Param("internId") Long internId);

    boolean existsByTaskIdAndInternId(Long taskId, Long internId);

    void deleteByInternId(Long internId);
}
