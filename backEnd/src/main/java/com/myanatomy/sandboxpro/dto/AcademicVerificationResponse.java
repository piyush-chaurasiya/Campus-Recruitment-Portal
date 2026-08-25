package com.myanatomy.sandboxpro.dto;

import com.myanatomy.sandboxpro.model.AcademicVerificationStatus;

import java.time.LocalDateTime;

public class AcademicVerificationResponse {

    private Long requestId;

    private Double tenthPercentage;
    private Double tenthMathPercentage;

    private Double twelfthPercentage;
    private Double twelfthMathPercentage;

    private Double cgpa;
    private Integer backlogs;

    private AcademicVerificationStatus status;

    private String rejectionReason;

    private LocalDateTime submittedAt;
    private LocalDateTime reviewedAt;

    private String message;

    public AcademicVerificationResponse() {
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public Double getTenthPercentage() {
        return tenthPercentage;
    }

    public void setTenthPercentage(Double tenthPercentage) {
        this.tenthPercentage = tenthPercentage;
    }

    public Double getTenthMathPercentage() {
        return tenthMathPercentage;
    }

    public void setTenthMathPercentage(Double tenthMathPercentage) {
        this.tenthMathPercentage = tenthMathPercentage;
    }

    public Double getTwelfthPercentage() {
        return twelfthPercentage;
    }

    public void setTwelfthPercentage(Double twelfthPercentage) {
        this.twelfthPercentage = twelfthPercentage;
    }

    public Double getTwelfthMathPercentage() {
        return twelfthMathPercentage;
    }

    public void setTwelfthMathPercentage(Double twelfthMathPercentage) {
        this.twelfthMathPercentage = twelfthMathPercentage;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public Integer getBacklogs() {
        return backlogs;
    }

    public void setBacklogs(Integer backlogs) {
        this.backlogs = backlogs;
    }

    public AcademicVerificationStatus getStatus() {
        return status;
    }

    public void setStatus(AcademicVerificationStatus status) {
        this.status = status;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}