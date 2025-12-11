package com.application_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long jobId;        // Link to Job Service
    private Long applicantId;  // Link to Identity Service (The User)
    
    // For now, we will store a simple string. Later we can add file upload.
    private String resumeUrl; 

    private String status; // APPLIED, SHORTLISTED, REJECTED

    private LocalDateTime appliedTime;

    @PrePersist
    public void onCreate() {
        this.appliedTime = LocalDateTime.now();
        if (this.status == null) {
            this.status = "APPLIED";
        }
    }
}