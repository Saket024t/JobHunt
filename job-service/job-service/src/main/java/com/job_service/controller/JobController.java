package com.job_service.controller;

import com.job_service.entity.Job;
import com.job_service.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    private JobService service;

    // 1. Post a new Job
    @PostMapping
    public Job postJob(@RequestBody Job job) {
        return service.postJob(job);
    }

    // 2. Get All Jobs (For Feed)
    @GetMapping
    public List<Job> getAllJobs() {
        return service.getAllJobs();
    }

    // 3. Get Single Job Detail
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return service.getJobById(id);
    }

    // 4. Get Jobs by Recruiter ID (For "My Posted Jobs")
    @GetMapping("/myjobs/{recruiterId}")
    public List<Job> getJobsByRecruiter(@PathVariable Long recruiterId) {
        return service.getJobsByRecruiter(recruiterId);
    }
}