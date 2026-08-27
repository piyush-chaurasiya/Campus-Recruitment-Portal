package com.myanatomy.sandboxpro.service;

import com.myanatomy.sandboxpro.dto.ApplicationResponse;
import com.myanatomy.sandboxpro.model.ApplicationStatus;
import com.myanatomy.sandboxpro.model.Job;
import com.myanatomy.sandboxpro.model.JobApplication;
import com.myanatomy.sandboxpro.model.JobStatus;
import com.myanatomy.sandboxpro.model.StudentProfile;
import com.myanatomy.sandboxpro.repository.JobApplicationRepository;
import com.myanatomy.sandboxpro.repository.JobRepository;
import com.myanatomy.sandboxpro.repository.StudentProfileRepository;
import com.myanatomy.sandboxpro.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final EligibilityService eligibilityService;

    public JobApplicationService(
            JobApplicationRepository applicationRepository,
            JobRepository jobRepository,
            StudentProfileRepository studentProfileRepository,
            UserRepository userRepository,
            EligibilityService eligibilityService
    ) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.studentProfileRepository =
                studentProfileRepository;
        this.userRepository = userRepository;
        this.eligibilityService = eligibilityService;
    }

    // =========================
    // APPLY FOR JOB
    // =========================

    public ApplicationResponse apply(
            Long jobId,
            String email
    ) {

        var user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found."
                        )
                );

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found."
                                )
                        );

        Job job = jobRepository
                .findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job not found."
                        )
                );

        if (job.getStatus() != JobStatus.APPROVED) {

            throw new RuntimeException(
                    "This opportunity is not available."
            );
        }

        if (applicationRepository
                .existsByJobIdAndStudentId(
                        jobId,
                        profile.getId()
                )) {

            throw new RuntimeException(
                    "You have already applied for this opportunity."
            );
        }

        EligibilityService.EligibilityResult eligibility =
                eligibilityService.check(
                        job,
                        profile
                );

        if (!eligibility.eligible()) {

            throw new RuntimeException(
                    "You are not eligible. "
                            + eligibility.reason()
            );
        }

        JobApplication application =
                new JobApplication();

        application.setJob(job);
        application.setStudent(profile);
        application.setStatus(
                ApplicationStatus.APPLIED
        );

        JobApplication saved =
                applicationRepository.save(
                        application
                );

        return ApplicationResponse.from(saved);
    }

    // =========================
    // MY APPLICATIONS
    // =========================

    public List<ApplicationResponse> getMyApplications(
            String email
    ) {

        var user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found."
                        )
                );

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found."
                                )
                        );

        return applicationRepository
                .findByStudentIdOrderByAppliedAtDesc(
                        profile.getId()
                )
                .stream()
                .map(ApplicationResponse::from)
                .toList();
    }
}