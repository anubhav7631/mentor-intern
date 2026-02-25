package com.mentor.management.repository;

import com.mentor.management.model.Attendance;
import com.mentor.management.model.enums.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByInternIdAndDate(Long internId, LocalDate date);

    List<Attendance> findByInternIdOrderByDateDesc(Long internId);

    List<Attendance> findByInternIdAndDateBetweenOrderByDateDesc(Long internId, LocalDate start, LocalDate end);

    List<Attendance> findByDateOrderByInternNameAsc(LocalDate date);

    List<Attendance> findByDateBetweenOrderByDateDesc(LocalDate start, LocalDate end);

    long countByInternIdAndStatus(Long internId, AttendanceStatus status);

    long countByInternIdAndDateBetween(Long internId, LocalDate start, LocalDate end);

    long countByInternIdAndStatusAndDateBetween(Long internId, AttendanceStatus status, LocalDate start, LocalDate end);

    boolean existsByInternIdAndDate(Long internId, LocalDate date);

    void deleteByInternId(Long internId);
}
