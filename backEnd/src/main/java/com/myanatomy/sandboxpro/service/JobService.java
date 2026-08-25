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
import com.myanatomy.sandboxpro.dto.CreateJobRequest;

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
        this.studentProfileRepository =
                studentProfileRepository;
        this.userRepository = userRepository;
        this.eligibilityService = eligibilityService;
    }

    public List<JobResponse> getPublishedJobs(
            UserDetails userDetails
    ) {

        var user = userRepository
                .findByEmail(userDetails.getUsername())
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

    public JobResponse getJob(
            Long id,
            UserDetails userDetails
    ) {

        Job job = jobRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job not found."
                        ));

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
    public JobResponse createJob(
        CreateJobRequest request,
        UserDetails userDetails
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

    job.setCreatedBy(
            userDetails.getUsername()
    );

    job.setStatus(JobStatus.PENDING);

    Job savedJob = jobRepository.save(job);

    return JobResponse.from(savedJob);
}
}