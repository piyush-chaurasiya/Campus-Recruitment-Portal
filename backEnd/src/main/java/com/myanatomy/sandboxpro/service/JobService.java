package com.myanatomy.sandboxpro.service;

import com.myanatomy.sandboxpro.dto.CreateJobRequest;
import com.myanatomy.sandboxpro.dto.JobResponse;
import com.myanatomy.sandboxpro.model.Job;
import com.myanatomy.sandboxpro.model.JobStatus;
import com.myanatomy.sandboxpro.model.StudentProfile;
import com.myanatomy.sandboxpro.repository.JobRepository;
import com.myanatomy.sandboxpro.repository.StudentProfileRepository;
import com.myanatomy.sandboxpro.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final EligibilityService eligibilityService;

    public JobService(
            JobRepository jobRepository,
            StudentProfileRepository studentProfileRepository,
            UserRepository userRepository,
            EligibilityService eligibilityService
    ) {
        this.jobRepository = jobRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
        this.eligibilityService = eligibilityService;
    }

    // =========================
    // STUDENT - ALL APPROVED JOBS
    // =========================

    public List<JobResponse> getPublishedJobs(String email) {

        var user = userRepository
                .findByEmail(email)
                .orElseThrow();

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(user.getId())
                        .orElse(null);

        return jobRepository
                .findByStatus(JobStatus.APPROVED)
                .stream()
                .map(job -> {

                    JobResponse response =
                            JobResponse.from(job);

                    EligibilityService.EligibilityResult result =
                            eligibilityService.check(
                                    job,
                                    profile
                            );

                    response.setEligible(
                            result.eligible()
                    );

                    response.setEligibilityReason(
                            result.reason()
                    );

                    return response;
                })
                .toList();
    }

    // =========================
    // STUDENT - SINGLE JOB
    // =========================

    public JobResponse getJob(
            Long id,
            UserDetails userDetails
    ) {

        Job job = jobRepository
                .findById(id)
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

        var user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow();

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(user.getId())
                        .orElse(null);

        JobResponse response =
                JobResponse.from(job);

        EligibilityService.EligibilityResult result =
                eligibilityService.check(
                        job,
                        profile
                );

        response.setEligible(
                result.eligible()
        );

        response.setEligibilityReason(
                result.reason()
        );

        return response;
    }

        // =========================
        // PLACEMENT OFFICER - CREATE JOB
        // =========================

        public JobResponse createJob(
                CreateJobRequest request,
                String username
        ) {

                Job job = new Job();

                job.setTitle(request.getTitle());
                job.setCompanyName(request.getCompanyName());
                job.setDescription(request.getDescription());
                job.setLocation(request.getLocation());

                job.setJobType(request.getJobType());
                job.setWorkMode(request.getWorkMode());

                job.setPaid(request.getPaid());
                job.setStipendOrSalary(
                        request.getStipendOrSalary()
                );

                job.setMinimumCgpa(
                        request.getMinimumCgpa()
                );

                job.setMaximumBacklogs(
                        request.getMaximumBacklogs()
                );

                job.setMinimumTenthPercentage(
                        request.getMinimumTenthPercentage()
                );

                job.setMinimumTwelfthPercentage(
                        request.getMinimumTwelfthPercentage()
                );

                job.setEligibleBranches(
                        request.getEligibleBranches()
                );

                job.setApplicationDeadline(
                        request.getApplicationDeadline()
                );

                job.setJoiningDate(
                        request.getJoiningDate()
                );

                job.setCreatedBy(username);

                job.setStatus(JobStatus.PENDING);

                Job savedJob =
                        jobRepository.save(job);

                return JobResponse.from(savedJob);
        }

        // =========================
        // PLACEMENT OFFICER - APPROVE JOB
        // =========================

        public JobResponse approveJob(Long id) {

                Job job = jobRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job not found."
                                )
                        );

                job.setStatus(
                        JobStatus.APPROVED
                );

                return JobResponse.from(
                        jobRepository.save(job)
                );
        }

        // =========================
        // ADMIN - ALL JOBS
        // =========================

        public List<JobResponse> getAllJobs() {

        return jobRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(JobResponse::from)
                .toList();
        }


        // =========================
        // ADMIN - REJECT JOB
        // =========================

        public JobResponse rejectJob(
                Long id,
                String reason
        ) {

        Job job = jobRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job not found."
                        )
                );

        if (job.getStatus() != JobStatus.PENDING) {
                throw new RuntimeException(
                        "Only pending jobs can be rejected."
                );
        }

        job.setStatus(JobStatus.REJECTED);

        return JobResponse.from(
                jobRepository.save(job)
        );
        }
}