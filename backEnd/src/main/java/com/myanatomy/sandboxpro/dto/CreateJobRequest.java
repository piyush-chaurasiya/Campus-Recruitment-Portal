package com.myanatomy.sandboxpro.dto;

import com.myanatomy.sandboxpro.model.JobType;
import com.myanatomy.sandboxpro.model.WorkMode;

import java.time.LocalDate;

public class CreateJobRequest {

    private String title;
    private String companyName;
    private String description;
    private String location;

    private JobType jobType;
    private WorkMode workMode;

    private Boolean paid;
    private Double stipendOrSalary;

    private Double minimumCgpa;
    private Integer maximumBacklogs;

    private Double minimumTenthPercentage;
    private Double minimumTwelfthPercentage;

    private String eligibleBranches;

    private LocalDate applicationDeadline;
    private LocalDate joiningDate;

    public CreateJobRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public JobType getJobType() {
        return jobType;
    }

    public void setJobType(JobType jobType) {
        this.jobType = jobType;
    }

    public WorkMode getWorkMode() {
        return workMode;
    }

    public void setWorkMode(WorkMode workMode) {
        this.workMode = workMode;
    }

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public Double getStipendOrSalary() {
        return stipendOrSalary;
    }

    public void setStipendOrSalary(Double stipendOrSalary) {
        this.stipendOrSalary = stipendOrSalary;
    }

    public Double getMinimumCgpa() {
        return minimumCgpa;
    }

    public void setMinimumCgpa(Double minimumCgpa) {
        this.minimumCgpa = minimumCgpa;
    }

    public Integer getMaximumBacklogs() {
        return maximumBacklogs;
    }

    public void setMaximumBacklogs(Integer maximumBacklogs) {
        this.maximumBacklogs = maximumBacklogs;
    }

    public Double getMinimumTenthPercentage() {
        return minimumTenthPercentage;
    }

    public void setMinimumTenthPercentage(
            Double minimumTenthPercentage) {
        this.minimumTenthPercentage =
                minimumTenthPercentage;
    }

    public Double getMinimumTwelfthPercentage() {
        return minimumTwelfthPercentage;
    }

    public void setMinimumTwelfthPercentage(
            Double minimumTwelfthPercentage) {
        this.minimumTwelfthPercentage =
                minimumTwelfthPercentage;
    }

    public String getEligibleBranches() {
        return eligibleBranches;
    }

    public void setEligibleBranches(
            String eligibleBranches) {
        this.eligibleBranches =
                eligibleBranches;
    }

    public LocalDate getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(
            LocalDate applicationDeadline) {
        this.applicationDeadline =
                applicationDeadline;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(
            LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }
}