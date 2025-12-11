package com.job_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobDTO {
    private String title;
    private String company;
    private String location;
    private String salary;
    private String description;
    private String jobType;
    private String skillsRequired;
    private Long postedBy; // The Recruiter's ID
}