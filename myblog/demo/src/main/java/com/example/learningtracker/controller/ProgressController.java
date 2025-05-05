package com.example.learningtracker.controller;

import com.example.learningtracker.model.LearningProgress;
import com.example.learningtracker.service.ProgressService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProgressController {
    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/dashboard")
    public String showDashboard(Authentication authentication, Model model) {
        String username = authentication.getName();
        model.addAttribute("userProgress", progressService.getUserProgress(username));
        model.addAttribute("allProgress", progressService.getAllProgress());
        return "dashboard";
    }

    @PostMapping("/update-progress")
    public String updateProgress(
            Authentication authentication,
            @RequestParam Long languageId,
            @RequestParam int progress) {
        String username = authentication.getName();
        progressService.updateProgress(username, languageId, progress);
        return "redirect:/dashboard";
    }
}