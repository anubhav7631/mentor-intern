package com.mentor.management.repository;

import com.mentor.management.model.Intern;
import com.mentor.management.model.enums.InternStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface InternRepository extends JpaRepository<Intern, Long> {
        Optional<Intern> findByInternId(String internId);

        Optional<Intern> findByEmail(String email);

        boolean existsByInternId(String internId);

        List<Intern> findByStatus(InternStatus status);

        List<Intern> findByMentorId(Long mentorId);

        List<Intern> findByBatch(String batch);

        List<Intern> findByDepartment(String department);

        @Query("SELECT i FROM Intern i WHERE " +
                        "(:search IS NULL OR LOWER(i.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
                        "OR LOWER(i.internId) LIKE LOWER(CONCAT('%', :search, '%')) " +
                        "OR LOWER(i.email) LIKE LOWER(CONCAT('%', :search, '%'))) " +
                        "AND (:status IS NULL OR i.status = :status) " +
                        "AND (:batch IS NULL OR i.batch = :batch) " +
                        "AND (:department IS NULL OR i.department = :department) " +
                        "AND (:college IS NULL OR i.college = :college)")
        List<Intern> searchInterns(
                        @Param("search") String search,
                        @Param("status") InternStatus status,
                        @Param("batch") String batch,
                        @Param("department") String department,
                        @Param("college") String college);

        long countByStatus(InternStatus status);

        @Query("SELECT DISTINCT i.batch FROM Intern i WHERE i.batch IS NOT NULL")
        List<String> findDistinctBatches();

        @Query("SELECT DISTINCT i.department FROM Intern i WHERE i.department IS NOT NULL")
        List<String> findDistinctDepartments();

        @Query("SELECT DISTINCT i.college FROM Intern i WHERE i.college IS NOT NULL")
        List<String> findDistinctColleges();
}
