package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.dto.CreateJobRequest;
import com.myanatomy.sandboxpro.dto.JobResponse;
import com.myanatomy.sandboxpro.service.JobService;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/placement/jobs")
public class PlacementJobController {

    private final JobService jobService;

    public PlacementJobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public JobResponse createJob(
            @RequestBody CreateJobRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        return jobService.createJob(
                request,
                userDetails
        );
    }
}