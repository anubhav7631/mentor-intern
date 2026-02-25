package com.mentor.management.repository;

import com.mentor.management.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCreatedById(Long userId);

    List<Task> findByCreatedByIdOrderByCreatedDateDesc(Long userId);
}
