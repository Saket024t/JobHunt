package com.job_service.repository;

import com.job_service.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    // Custom method to fetch jobs posted by a specific Recruiter ID
    List<Job> findByPostedBy(Long postedBy);
}