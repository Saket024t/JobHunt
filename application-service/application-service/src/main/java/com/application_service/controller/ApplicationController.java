package com.application_service.controller;

import com.application_service.entity.Application;
import com.application_service.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    // 1. Apply for a Job
    @PostMapping
    public Application apply(@RequestBody Application application) {
        return service.apply(application);
    }

    // 2. Get My Applications (Employee)
    @GetMapping("/my/{userId}")
    public List<Application> getMyApplications(@PathVariable Long userId) {
        return service.getMyApplications(userId);
    }

    // 3. Get Applicants for a Job (Recruiter)
    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsForJob(@PathVariable Long jobId) {
        return service.getApplicationsForJob(jobId);
    }
}