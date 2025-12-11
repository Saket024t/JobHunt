package com.job_service.controller;

import com.job_service.dto.JobDTO;
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
    public Job postJob(@RequestBody JobDTO jobDTO) {
        // Manual Mapping: DTO -> Entity
        Job job = new Job();
        job.setTitle(jobDTO.getTitle());
        job.setCompany(jobDTO.getCompany());
        job.setLocation(jobDTO.getLocation());
        job.setSalary(jobDTO.getSalary());
        job.setDescription(jobDTO.getDescription());
        job.setJobType(jobDTO.getJobType());
        job.setSkillsRequired(jobDTO.getSkillsRequired());
        job.setPostedBy(jobDTO.getPostedBy());

        return service.postJob(job);
    }


    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job) {
        // In a real app, you would check if the logged-in user ID matches 'job.postedBy'
        return service.updateJob(id, job);
    }

    @PutMapping("/{id}/status")
    public Job toggleStatus(@PathVariable Long id) {
        return service.toggleJobStatus(id);
    }

    @PutMapping("/{id}/close")
    public Job closeJob(@PathVariable Long id) {
        // Ideally, you'd verify recruiter ownership here!
        return service.closeJob(id);
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