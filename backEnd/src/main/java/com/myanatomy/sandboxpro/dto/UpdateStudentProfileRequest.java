package com.myanatomy.sandboxpro.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class UpdateStudentProfileRequest {

    @Size(max = 15)
    private String phone;

    private LocalDate dateOfBirth;

    @Size(max = 30)
    private String gender;

    @Size(max = 500)
    private String address;

    @Size(max = 100)
    private String city;

    @Size(max = 100)
    private String state;

    @Size(max = 10)
    private String pincode;

    @Size(max = 100)
    private String branch;

    @Size(max = 100)
    private String course;

    private Integer passingYear;

    @Size(max = 1000)
    private String skills;

    @Size(max = 500)
    private String githubUrl;

    @Size(max = 500)
    private String linkedinUrl;

    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double tenthPercentage;

    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double tenthMathPercentage;

    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double twelfthPercentage;

    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double twelfthMathPercentage;

    @DecimalMin("0.0")
    @DecimalMax("10.0")
    private Double cgpa;

    @Min(0)
    private Integer backlogs;

    public UpdateStudentProfileRequest() {
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public Integer getPassingYear() {
        return passingYear;
    }

    public void setPassingYear(Integer passingYear) {
        this.passingYear = passingYear;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
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