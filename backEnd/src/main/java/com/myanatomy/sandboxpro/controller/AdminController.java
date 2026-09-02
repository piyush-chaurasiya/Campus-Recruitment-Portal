package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.model.JobStatus;
import com.myanatomy.sandboxpro.model.Role;
import com.myanatomy.sandboxpro.model.User;
import com.myanatomy.sandboxpro.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.myanatomy.sandboxpro.repository.JobRepository;
import com.myanatomy.sandboxpro.repository.JobApplicationRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public AdminController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JobRepository jobRepository,
            JobApplicationRepository jobApplicationRepository) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    // ================= DASHBOARD =================

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {

        List<User> users = userRepository.findAll();

        long total = users.size();

        long students = users.stream()
                .filter(u -> u.getRole() == Role.STUDENT)
                .count();

        long recruiters = users.stream()
                .filter(u -> u.getRole() == Role.RECRUITER)
                .count();

        long officers = users.stream()
                .filter(u -> u.getRole() == Role.PLACEMENT_OFFICER)
                .count();

        long admins = users.stream()
                .filter(u -> u.getRole() == Role.ADMIN)
                .count();

        long activeUsers = users.stream()
                .filter(User::isEnabled)
                .count();

        long disabledUsers = users.stream()
                .filter(u -> !u.isEnabled())
                .count();

        long totalJobs = jobRepository.count();

        long pendingJobs =
                jobRepository.countByStatus(JobStatus.PENDING);

        long approvedJobs =
                jobRepository.countByStatus(JobStatus.APPROVED);

        long totalApplications =
                jobApplicationRepository.count();

        return ResponseEntity.ok(Map.ofEntries(
                Map.entry("totalUsers", total),
                Map.entry("students", students),
                Map.entry("recruiters", recruiters),
                Map.entry("placementOfficers", officers),
                Map.entry("admins", admins),

                Map.entry("activeUsers", activeUsers),
                Map.entry("disabledUsers", disabledUsers),

                Map.entry("totalJobs", totalJobs),
                Map.entry("pendingJobs", pendingJobs),
                Map.entry("approvedJobs", approvedJobs),

                Map.entry("totalApplications", totalApplications)
        ));
    }

    // ================= ALL USERS =================

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getUsers() {

        List<UserResponse> users = userRepository.findAll()
                .stream()
                .map(UserResponse::from)
                .toList();

        return ResponseEntity.ok(users);
    }

    // ================= CREATE USER =================

    @PostMapping("/users")
    public ResponseEntity<?> createUser(
            @RequestBody CreateUserRequest request) {

        if (request.name == null ||
                request.name.isBlank()) {

            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Name is required."));
        }

        if (request.email == null ||
                request.email.isBlank()) {

            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required."));
        }

        if (request.password == null ||
                request.password.length() < 6) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Password must contain at least 6 characters."
                    ));
        }

        if (request.role == null ||
                request.role.isBlank()) {

            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Role is required."));
        }

        String email = request.email
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(email)) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Email already exists."
                    ));
        }

        Role role;

        try {

            role = Role.valueOf(
                    request.role
                            .trim()
                            .toUpperCase()
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Invalid role."
                    ));
        }

        // ADMIN IS NOW ALLOWED

        User user = new User();

        user.setName(request.name.trim());
        user.setEmail(email);

        user.setPassword(
                passwordEncoder.encode(
                        request.password
                )
        );

        user.setRole(role);
        user.setEnabled(true);

        User saved = userRepository.save(user);

        return ResponseEntity.ok(
                UserResponse.from(saved)
        );
    }

    // ================= ENABLE / DISABLE =================

    @PutMapping("/users/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam boolean enabled,
            Authentication authentication) {

        User target = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found.")
                );

        // Admin cannot modify another admin
        if (target.getRole() == Role.ADMIN) {

            return ResponseEntity.status(403)
                    .body(Map.of(
                            "message",
                            "Admin accounts cannot be modified."
                    ));
        }

        target.setEnabled(enabled);

        User saved = userRepository.save(target);

        return ResponseEntity.ok(
                UserResponse.from(saved)
        );
    }

    // ================= PASSWORD UPDATE =================

    @PutMapping("/users/{id}/password")
    public ResponseEntity<?> updatePassword(
            @PathVariable Long id,
            @RequestBody PasswordRequest request) {

        User target = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found.")
                );

        // Admin cannot change admin password
        if (target.getRole() == Role.ADMIN) {

            return ResponseEntity.status(403)
                    .body(Map.of(
                            "message",
                            "Admin passwords cannot be changed by another admin."
                    ));
        }

        if (request.password == null ||
                request.password.length() < 6) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Password must contain at least 6 characters."
                    ));
        }

        target.setPassword(
                passwordEncoder.encode(
                        request.password
                )
        );

        userRepository.save(target);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Password updated successfully."
                )
        );
    }

    // ================= DELETE USER =================

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id) {

        User target = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found.")
                );

        // Admin accounts are protected
        if (target.getRole() == Role.ADMIN) {

            return ResponseEntity.status(403)
                    .body(Map.of(
                            "message",
                            "Admin accounts cannot be deleted."
                    ));
        }

        userRepository.delete(target);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "User deleted successfully."
                )
        );
    }

    // ================= REQUEST DTOs =================

    public static class CreateUserRequest {

        public String name;
        public String email;
        public String password;
        public String role;
    }

    public static class PasswordRequest {

        public String password;
    }

    // ================= RESPONSE DTO =================

    public static class UserResponse {

        public Long id;
        public String name;
        public String email;
        public String role;
        public boolean enabled;

        public static UserResponse from(User user) {

            UserResponse response = new UserResponse();

            response.id = user.getId();
            response.name = user.getName();
            response.email = user.getEmail();
            response.role = user.getRole().name();
            response.enabled = user.isEnabled();

            return response;
        }
    }
}