package com.job_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "jobs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company; // e.g. "Google", "Amazon"
    private String location; // e.g. "Remote", "Bangalore"
    private String salary;   // e.g. "12LPA"
    
    @Column(length = 5000) // Allow long descriptions
    private String description;
    
    private String jobType; // "Full-Time", "Part-Time"
    private String skillsRequired; // Store as comma-separated string for simplicity: "Java,React,AWS"

    private Long postedBy; // The ID of the Recruiter who posted this
    private LocalDate postedDate;

    @PrePersist
    public void onCreate() {
        this.postedDate = LocalDate.now();
    }
}