package com.mentor.management.service;

import com.mentor.management.dto.InternDTO;
import com.mentor.management.exception.DuplicateResourceException;
import com.mentor.management.exception.ResourceNotFoundException;
import com.mentor.management.model.Intern;
import com.mentor.management.model.User;
import com.mentor.management.model.enums.InternStatus;
import com.mentor.management.model.enums.TaskAssignmentStatus;
import com.mentor.management.repository.AttendanceRepository;
import com.mentor.management.repository.InternRepository;
import com.mentor.management.repository.TaskAssignmentRepository;
import com.mentor.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InternService {

    private final InternRepository internRepository;
    private final UserRepository userRepository;
    private final TaskAssignmentRepository taskAssignmentRepository;
    private final AttendanceRepository attendanceRepository;

    public List<InternDTO> getAllInterns() {
        return internRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public InternDTO getInternById(Long id) {
        Intern intern = internRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Intern not found with id: " + id));
        return toDTO(intern);
    }

    public InternDTO getInternByInternId(String internId) {
        Intern intern = internRepository.findByInternId(internId)
                .orElseThrow(() -> new ResourceNotFoundException("Intern not found with ID: " + internId));
        return toDTO(intern);
    }

    @Transactional
    public InternDTO createIntern(InternDTO dto) {
        if (internRepository.existsByInternId(dto.getInternId())) {
            throw new DuplicateResourceException("Intern ID already exists: " + dto.getInternId());
        }

        Intern intern = new Intern();
        mapDtoToEntity(dto, intern);
        intern = internRepository.save(intern);
        return toDTO(intern);
    }

    @Transactional
    public InternDTO updateIntern(Long id, InternDTO dto) {
        Intern intern = internRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Intern not found with id: " + id));
        mapDtoToEntity(dto, intern);
        intern = internRepository.save(intern);
        return toDTO(intern);
    }

    @Transactional
    public void deleteIntern(Long id) {
        if (!internRepository.existsById(id)) {
            throw new ResourceNotFoundException("Intern not found with id: " + id);
        }
        // Remove related records first to avoid FK constraint violations
        taskAssignmentRepository.deleteByInternId(id);
        attendanceRepository.deleteByInternId(id);
        internRepository.deleteById(id);
    }

    public List<InternDTO> searchInterns(String search, String status, String batch, String department,
            String college) {
        InternStatus internStatus = null;
        if (status != null && !status.isEmpty()) {
            try {
                internStatus = InternStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException ignored) {
            }
        }

        return internRepository.searchInterns(
                search != null && search.isEmpty() ? null : search,
                internStatus,
                batch != null && batch.isEmpty() ? null : batch,
                department != null && department.isEmpty() ? null : department,
                college != null && college.isEmpty() ? null : college).stream().map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Map<String, List<String>> getFilterOptions() {
        Map<String, List<String>> filters = new HashMap<>();
        filters.put("batches", internRepository.findDistinctBatches());
        filters.put("departments", internRepository.findDistinctDepartments());
        filters.put("colleges", internRepository.findDistinctColleges());
        return filters;
    }

    private void mapDtoToEntity(InternDTO dto, Intern intern) {
        intern.setInternId(dto.getInternId());
        intern.setName(dto.getName());
        intern.setEmail(dto.getEmail());
        intern.setPhone(dto.getPhone());
        intern.setCollege(dto.getCollege());
        intern.setDepartment(dto.getDepartment());
        intern.setBatch(dto.getBatch());
        intern.setStartDate(dto.getStartDate());
        intern.setEndDate(dto.getEndDate());
        intern.setStatus(InternStatus.valueOf(dto.getStatus().toUpperCase()));

        if (dto.getMentorId() != null) {
            User mentor = userRepository.findById(dto.getMentorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Mentor not found"));
            intern.setMentor(mentor);
        }
    }

    private InternDTO toDTO(Intern intern) {
        long totalTasks = taskAssignmentRepository.countByInternId(intern.getId());
        long completedTasks = taskAssignmentRepository.countByInternIdAndStatus(intern.getId(),
                TaskAssignmentStatus.COMPLETED);
        double completionPct = totalTasks > 0 ? (double) completedTasks / totalTasks * 100 : 0;

        return InternDTO.builder()
                .id(intern.getId())
                .internId(intern.getInternId())
                .name(intern.getName())
                .email(intern.getEmail())
                .phone(intern.getPhone())
                .college(intern.getCollege())
                .department(intern.getDepartment())
                .batch(intern.getBatch())
                .startDate(intern.getStartDate())
                .endDate(intern.getEndDate())
                .mentorId(intern.getMentor() != null ? intern.getMentor().getId() : null)
                .mentorName(intern.getMentor() != null ? intern.getMentor().getFullName() : null)
                .status(intern.getStatus().name())
                .totalTasks((int) totalTasks)
                .completedTasks((int) completedTasks)
                .completionPercentage(Math.round(completionPct * 100.0) / 100.0)
                .build();
    }
}
