package com.myanatomy.sandboxpro.dto;

import com.myanatomy.sandboxpro.model.Job;
import com.myanatomy.sandboxpro.model.JobStatus;
import com.myanatomy.sandboxpro.model.JobType;
import com.myanatomy.sandboxpro.model.WorkMode;

import java.time.LocalDate;

public class JobResponse {

    private Long id;
    private String title;
    private String companyName;
    private String description;
    private String location;

    private JobType jobType;
    private WorkMode workMode;
    private JobStatus status;

    private Boolean paid;
    private Double stipendOrSalary;

    private Double minimumCgpa;
    private Integer maximumBacklogs;
    private Double minimumTenthPercentage;
    private Double minimumTwelfthPercentage;

    private String eligibleBranches;

    private LocalDate applicationDeadline;
    private LocalDate joiningDate;

    private Boolean eligible;
    private String eligibilityReason;

    public JobResponse() {
    }

    public static JobResponse from(Job job) {

        JobResponse response = new JobResponse();

        response.id = job.getId();
        response.title = job.getTitle();
        response.companyName = job.getCompanyName();
        response.description = job.getDescription();
        response.location = job.getLocation();

        response.jobType = job.getJobType();
        response.workMode = job.getWorkMode();
        response.status = job.getStatus();

        response.paid = job.getPaid();
        response.stipendOrSalary = job.getStipendOrSalary();

        response.minimumCgpa = job.getMinimumCgpa();
        response.maximumBacklogs = job.getMaximumBacklogs();
        response.minimumTenthPercentage =
                job.getMinimumTenthPercentage();

        response.minimumTwelfthPercentage =
                job.getMinimumTwelfthPercentage();

        response.eligibleBranches =
                job.getEligibleBranches();

        response.applicationDeadline =
                job.getApplicationDeadline();

        response.joiningDate =
                job.getJoiningDate();

        return response;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public JobType getJobType() {
        return jobType;
    }

    public WorkMode getWorkMode() {
        return workMode;
    }

    public JobStatus getStatus() {
        return status;
    }

    public Boolean getPaid() {
        return paid;
    }

    public Double getStipendOrSalary() {
        return stipendOrSalary;
    }

    public Double getMinimumCgpa() {
        return minimumCgpa;
    }

    public Integer getMaximumBacklogs() {
        return maximumBacklogs;
    }

    public Double getMinimumTenthPercentage() {
        return minimumTenthPercentage;
    }

    public Double getMinimumTwelfthPercentage() {
        return minimumTwelfthPercentage;
    }

    public String getEligibleBranches() {
        return eligibleBranches;
    }

    public LocalDate getApplicationDeadline() {
        return applicationDeadline;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public Boolean getEligible() {
        return eligible;
    }

    public String getEligibilityReason() {
        return eligibilityReason;
    }

    public void setEligible(Boolean eligible) {
        this.eligible = eligible;
    }

    public void setEligibilityReason(String eligibilityReason) {
        this.eligibilityReason = eligibilityReason;
    }
}