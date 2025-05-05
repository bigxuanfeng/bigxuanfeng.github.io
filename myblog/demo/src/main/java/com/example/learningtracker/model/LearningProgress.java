package com.example.learningtracker.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_progress")
public class LearningProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private ProgrammingLanguage language;

    @Column(name = "progress_percentage")
    private int progressPercentage;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    // Getters and Setters
}