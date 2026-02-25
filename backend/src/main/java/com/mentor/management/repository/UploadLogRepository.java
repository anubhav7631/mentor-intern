package com.mentor.management.repository;

import com.mentor.management.model.UploadLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UploadLogRepository extends JpaRepository<UploadLog, Long> {
    List<UploadLog> findByUploadedByIdOrderByUploadedAtDesc(Long userId);
}
