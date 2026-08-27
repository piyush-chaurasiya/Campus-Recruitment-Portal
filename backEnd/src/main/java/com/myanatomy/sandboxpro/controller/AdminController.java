package com.myanatomy.sandboxpro.controller;

import com.myanatomy.sandboxpro.dto.AdminUserResponse;
import com.myanatomy.sandboxpro.dto.CreateUserRequest;
import com.myanatomy.sandboxpro.model.Role;
import com.myanatomy.sandboxpro.model.User;
import com.myanatomy.sandboxpro.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.myanatomy.sandboxpro.model.JobStatus;
import com.myanatomy.sandboxpro.repository.JobRepository;
import com.myanatomy.sandboxpro.repository.AcademicVerificationRequestRepository;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JobRepository jobRepository;
    private final AcademicVerificationRequestRepository academicVerificationRequestRepository;

    public AdminController(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JobRepository jobRepository,
        AcademicVerificationRequestRepository academicVerificationRequestRepository
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jobRepository = jobRepository;
        this.academicVerificationRequestRepository =
                academicVerificationRequestRepository;
    }

    // ==============================
    // ADMIN DASHBOARD
    // ==============================

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {

        List<User> users = userRepository.findAll();

        long totalUsers = users.size();

        long students = users.stream()
                .filter(user -> user.getRole() == Role.STUDENT)
                .count();

        long recruiters = users.stream()
                .filter(user -> user.getRole() == Role.RECRUITER)
                .count();

        long officers = users.stream()
                .filter(user ->
                        user.getRole() == Role.PLACEMENT_OFFICER)
                .count();

        long activeUsers = users.stream()
                .filter(User::isEnabled)
                .count();

        long pendingJobs = jobRepository
                .findByStatus(JobStatus.PENDING)
                .size();

        long approvedJobs = jobRepository
                .findByStatus(JobStatus.APPROVED)
                .size();

        long pendingAcademic =
                academicVerificationRequestRepository
                        .findByStatus(
                                com.myanatomy.sandboxpro.model.AcademicVerificationStatus.PENDING
                        )
                        .size();

        return ResponseEntity.ok(
                new DashboardResponse(
                        totalUsers,
                        students,
                        recruiters,
                        officers,
                        activeUsers,
                        pendingJobs,
                        approvedJobs,
                        pendingAcademic
                )
        );
    }

    // ==============================
    // GET ALL USERS
    // ==============================

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponse>> getUsers() {

        List<AdminUserResponse> users =
                userRepository.findAll()
                        .stream()
                        .map(AdminUserResponse::from)
                        .toList();

        return ResponseEntity.ok(users);
    }

    // ==============================
    // CREATE USER
    // ==============================

    @PostMapping("/users")
    public ResponseEntity<?> createUser(
            @RequestBody CreateUserRequest request
    ) {

        if (request.getName() == null ||
                request.getName().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Name is required.");
        }

        if (request.getEmail() == null ||
                request.getEmail().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Email is required.");
        }

        if (request.getPassword() == null ||
                request.getPassword().length() < 6) {

            return ResponseEntity.badRequest()
                    .body("Password must contain at least 6 characters.");
        }

        if (request.getRole() == null) {

            return ResponseEntity.badRequest()
                    .body("Role is required.");
        }

        if (request.getRole() == Role.ADMIN) {

            return ResponseEntity.badRequest()
                    .body("Admin accounts cannot be created from this panel.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {

            return ResponseEntity.status(409)
                    .body("A user with this email already exists.");
        }

        User user = new User();

        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole(request.getRole());
        user.setEnabled(true);

        User savedUser =
                userRepository.save(user);

        return ResponseEntity.ok(
                AdminUserResponse.from(savedUser)
        );
    }

    // ==============================
    // ENABLE / DISABLE USER
    // ==============================

    @PutMapping("/users/{id}/status")
    public ResponseEntity<?> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean enabled
    ) {

        User user = userRepository
                .findById(id)
                .orElse(null);

        if (user == null) {

            return ResponseEntity.notFound()
                    .build();
        }

        user.setEnabled(enabled);

        User savedUser =
                userRepository.save(user);

        return ResponseEntity.ok(
                AdminUserResponse.from(savedUser)
        );
    }

    // ==============================
    // DELETE USER
    // ==============================

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id
    ) {

        User user = userRepository
                .findById(id)
                .orElse(null);

        if (user == null) {

            return ResponseEntity.notFound()
                    .build();
        }

        if (user.getRole() == Role.ADMIN) {

            return ResponseEntity.badRequest()
                    .body("Admin account cannot be deleted here.");
        }

        userRepository.delete(user);

        return ResponseEntity.ok(
                "User deleted successfully."
        );
    }

    // ==============================
    // DASHBOARD RESPONSE
    // ==============================

    public static class DashboardResponse {

        private long totalUsers;
        private long students;
        private long recruiters;
        private long placementOfficers;
        private long activeUsers;
        private long pendingJobs;
        private long approvedJobs;
        private long pendingAcademic;

        public DashboardResponse(
                long totalUsers,
                long students,
                long recruiters,
                long placementOfficers,
                long activeUsers,
                long pendingJobs,
                long approvedJobs,
                long pendingAcademic
        ) {
            this.totalUsers = totalUsers;
            this.students = students;
            this.recruiters = recruiters;
            this.placementOfficers = placementOfficers;
            this.activeUsers = activeUsers;
            this.pendingJobs = pendingJobs;
            this.approvedJobs = approvedJobs;
            this.pendingAcademic = pendingAcademic;
        }

        public long getTotalUsers() {
            return totalUsers;
        }

        public long getStudents() {
            return students;
        }

        public long getRecruiters() {
            return recruiters;
        }

        public long getPlacementOfficers() {
            return placementOfficers;
        }

        public long getActiveUsers() {
            return activeUsers;
        }

        public long getPendingJobs() {
            return pendingJobs;
        }

        public long getApprovedJobs() {
            return approvedJobs;
        }

        public long getPendingAcademic() {
            return pendingAcademic;
        }
    }
}