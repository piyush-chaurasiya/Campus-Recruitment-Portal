package com.myanatomy.sandboxpro.service;

import com.myanatomy.sandboxpro.model.Job;
import com.myanatomy.sandboxpro.model.StudentProfile;
import org.springframework.stereotype.Service;

@Service
public class EligibilityService {

    public EligibilityResult check(
            Job job,
            StudentProfile student
    ) {

        if (student == null) {
            return new EligibilityResult(
                    false,
                    "Student profile is incomplete."
            );
        }

        if (job.getMinimumCgpa() != null) {

            if (student.getCgpa() == null ||
                    student.getCgpa() < job.getMinimumCgpa()) {

                return new EligibilityResult(
                        false,
                        "Minimum CGPA required: "
                                + job.getMinimumCgpa()
                );
            }
        }

        if (job.getMaximumBacklogs() != null) {

            if (student.getBacklogs() == null ||
                    student.getBacklogs()
                            > job.getMaximumBacklogs()) {

                return new EligibilityResult(
                        false,
                        "Maximum allowed backlogs: "
                                + job.getMaximumBacklogs()
                );
            }
        }

        if (job.getMinimumTenthPercentage() != null) {

            if (student.getTenthPercentage() == null ||
                    student.getTenthPercentage()
                            < job.getMinimumTenthPercentage()) {

                return new EligibilityResult(
                        false,
                        "Minimum 10th percentage required: "
                                + job.getMinimumTenthPercentage()
                );
            }
        }

        if (job.getMinimumTwelfthPercentage() != null) {

            if (student.getTwelfthPercentage() == null ||
                    student.getTwelfthPercentage()
                            < job.getMinimumTwelfthPercentage()) {

                return new EligibilityResult(
                        false,
                        "Minimum 12th percentage required: "
                                + job.getMinimumTwelfthPercentage()
                );
            }
        }

        if (job.getEligibleBranches() != null &&
                !job.getEligibleBranches().isBlank()) {

            String studentBranch = student.getBranch();

            if (studentBranch == null ||
                    !job.getEligibleBranches()
                            .toLowerCase()
                            .contains(studentBranch.toLowerCase())) {

                return new EligibilityResult(
                        false,
                        "Your branch is not eligible for this opportunity."
                );
            }
        }

        return new EligibilityResult(
                true,
                "You are eligible for this opportunity."
        );
    }

    public record EligibilityResult(
            boolean eligible,
            String reason
    ) {
    }
}