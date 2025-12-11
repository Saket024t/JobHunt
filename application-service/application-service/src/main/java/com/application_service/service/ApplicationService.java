package com.application_service.service;

import com.application_service.entity.Application;
import com.application_service.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository repository;

    public Application apply(Application application) {
        // TODO: Validate if user already applied to this job?
        return repository.save(application);
    }

    public List<Application> getMyApplications(Long userId) {
        return repository.findByApplicantId(userId);
    }

    public List<Application> getApplicationsForJob(Long jobId) {
        return repository.findByJobId(jobId);
    }
    
    // Recruiter updates status (e.g., Shortlist)
    public Application updateStatus(Long applicationId, String status) {
        Application app = repository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        return repository.save(app);
    }
}