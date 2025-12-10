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