package com.myanatomy.sandboxpro.dto;

import com.myanatomy.sandboxpro.model.ApplicationStatus;
import com.myanatomy.sandboxpro.model.JobApplication;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Long id;

    private Long jobId;
    private String jobTitle;
    private String companyName;

    private ApplicationStatus status;

    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;

    private String remarks;

    public ApplicationResponse() {
    }

    public static ApplicationResponse from(
            JobApplication application
    ) {

        ApplicationResponse response =
                new ApplicationResponse();

        response.id = application.getId();

        response.jobId =
                application.getJob().getId();

        response.jobTitle =
                application.getJob().getTitle();

        response.companyName =
                application.getJob().getCompanyName();

        response.status =
                application.getStatus();

        response.appliedAt =
                application.getAppliedAt();

        response.updatedAt =
                application.getUpdatedAt();

        response.remarks =
                application.getRemarks();

        return response;
    }

    public Long getId() {
        return id;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getRemarks() {
        return remarks;
    }
}