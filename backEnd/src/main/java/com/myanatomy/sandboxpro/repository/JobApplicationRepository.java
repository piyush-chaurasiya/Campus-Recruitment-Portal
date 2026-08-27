package com.myanatomy.sandboxpro.repository;

import com.myanatomy.sandboxpro.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    boolean existsByJobIdAndStudentId(
            Long jobId,
            Long studentId
    );

    List<JobApplication> findByStudentIdOrderByAppliedAtDesc(
            Long studentId
    );
}