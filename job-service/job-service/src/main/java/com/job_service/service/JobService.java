package com.job_service.service;

import com.job_service.entity.Job;
import com.job_service.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository repository;

    public Job postJob(Job job) {
        return repository.save(job);
    }

    // Inside JobService class...

    // Method to handle OPEN <-> PAUSED switching
    public Job toggleJobStatus(Long id) {
        Job job = repository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));

        // Only toggle between OPEN and PAUSED. If CLOSED, it stays CLOSED.
        if ("PAUSED".equals(job.getStatus())) {
            job.setStatus("OPEN");
        } else if ("OPEN".equals(job.getStatus())) {
            job.setStatus("PAUSED");
        }
        // If status is "CLOSED", do nothing on this toggle.

        return repository.save(job);
    }

    // Method to set status to CLOSED
    public Job closeJob(Long id) {
        Job job = repository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        job.setStatus("CLOSED");
        return repository.save(job);
    }

    public Job updateJob(Long id, Job updatedJob) {
        Job job = repository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));

        // Update fields
        job.setTitle(updatedJob.getTitle());
        job.setCompany(updatedJob.getCompany());
        job.setLocation(updatedJob.getLocation());
        job.setSalary(updatedJob.getSalary());
        job.setDescription(updatedJob.getDescription());
        job.setJobType(updatedJob.getJobType());
        job.setSkillsRequired(updatedJob.getSkillsRequired());

        return repository.save(job);
    }

    public List<Job> getAllJobs() {
        return repository.findAll();
    }

    public List<Job> getJobsByRecruiter(Long recruiterId) {
        return repository.findByPostedBy(recruiterId);
    }

    public Job getJobById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }
}