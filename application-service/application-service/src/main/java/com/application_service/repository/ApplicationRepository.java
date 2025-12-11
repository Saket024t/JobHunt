package com.application_service.repository;

import com.application_service.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    // 1. Find all applications for a specific User (My Applications)
    List<Application> findByApplicantId(Long applicantId);

    // 2. Find all applications for a specific Job (For Recruiter)
    List<Application> findByJobId(Long jobId);
}