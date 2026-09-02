package com.myanatomy.sandboxpro.controller;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.myanatomy.sandboxpro.model.StudentProfile;
import com.myanatomy.sandboxpro.model.User;
import com.myanatomy.sandboxpro.repository.StudentProfileRepository;
import com.myanatomy.sandboxpro.repository.UserRepository;

@RestController
@RequestMapping("/api/student/resume")
public class StudentResumeController {

    private final UserRepository userRepository;
    private final StudentProfileRepository profileRepository;

    public StudentResumeController(
            UserRepository userRepository,
            StudentProfileRepository profileRepository) {

        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @PostMapping
    public ResponseEntity<?> uploadResume(
            Authentication authentication,
            @RequestParam("file") MultipartFile file) {

        try {

            if (authentication == null ||
                    authentication.getName() == null) {

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(java.util.Map.of(
                                "message",
                                "User is not authenticated."
                        ));
            }

            if (file == null || file.isEmpty()) {

                return ResponseEntity.badRequest()
                        .body(java.util.Map.of(
                                "message",
                                "Please select a resume."
                        ));
            }

            if (file.getSize() > 5 * 1024 * 1024) {

                return ResponseEntity.badRequest()
                        .body(java.util.Map.of(
                                "message",
                                "Resume size must be 5 MB or less."
                        ));
            }

            String filename = file.getOriginalFilename();

            if (filename == null ||
                    filename.trim().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body(java.util.Map.of(
                                "message",
                                "Invalid file name."
                        ));
            }

            if (!filename.toLowerCase().endsWith(".pdf")) {

                return ResponseEntity.badRequest()
                        .body(java.util.Map.of(
                                "message",
                                "Only PDF resumes are allowed."
                        ));
            }

            String email = authentication.getName();

            System.out.println(
                    "RESUME UPLOAD USER = " + email
            );

            User user = userRepository
                    .findByEmail(email)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "User not found: " + email
                            )
                    );

            StudentProfile profile =
                    profileRepository
                            .findByUserId(user.getId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Student profile not found for user: "
                                                    + user.getId()
                                    )
                            );

            profile.setResumeData(file.getBytes());

            profile.setResumeName(filename);

            profile.setResumeContentType(
                    MediaType.APPLICATION_PDF_VALUE
            );

            profileRepository.save(profile);

            System.out.println(
                    "RESUME SAVED SUCCESSFULLY FOR = " + email
            );

            return ResponseEntity.ok(
                    java.util.Map.of(
                            "message",
                            "Resume uploaded successfully.",
                            "name",
                            filename
                    )
            );

        } catch (Exception e) {

            System.out.println(
                    "========== RESUME UPLOAD ERROR =========="
            );

            e.printStackTrace();

            System.out.println(
                    "========================================="
            );

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of(
                            "message",
                            "Unable to save resume: "
                                    + e.getMessage()
                    ));
        }
    }

    @GetMapping
    public ResponseEntity<byte[]> getResume(
            Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found."
                        ));

        StudentProfile profile =
                profileRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student profile not found."
                                ));

        if (profile.getResumeData() == null ||
                profile.getResumeData().length == 0) {

            return ResponseEntity.notFound().build();
        }

        String filename =
                profile.getResumeName() == null
                        ? "resume.pdf"
                        : profile.getResumeName();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_PDF
        );

        headers.setContentDisposition(
                ContentDisposition.inline()
                        .filename(filename)
                        .build()
        );

        return new ResponseEntity<>(
                profile.getResumeData(),
                headers,
                HttpStatus.OK
        );
    }

    @DeleteMapping
    public ResponseEntity<?> deleteResume(
            Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found."
                        ));

        StudentProfile profile =
                profileRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                        new RuntimeException(
                                "Student profile not found."
                        ));

        profile.setResumeData(null);
        profile.setResumeName(null);
        profile.setResumeContentType(null);

        profileRepository.save(profile);

        return ResponseEntity.ok(
                java.util.Map.of(
                        "message",
                        "Resume deleted successfully."
                )
        );
    }
}