package com.myanatomy.sandboxpro.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class AcademicVerificationRequestDto {

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double tenthPercentage;

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double tenthMathPercentage;

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double twelfthPercentage;

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double twelfthMathPercentage;

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("10.0")
    private Double cgpa;

    @NotNull
    @Min(0)
    private Integer backlogs;

    public AcademicVerificationRequestDto() {
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
}