package com.myanatomy.sandboxpro.service;

import com.myanatomy.sandboxpro.model.Role;
import com.myanatomy.sandboxpro.model.User;
import com.myanatomy.sandboxpro.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            createUser(userRepository, passwordEncoder,
                    "Student User",
                    "student@campus.com",
                    "Student@123",
                    Role.STUDENT);

            createUser(userRepository, passwordEncoder,
                    "Recruiter User",
                    "recruiter@campus.com",
                    "Recruiter@123",
                    Role.RECRUITER);

            createUser(userRepository, passwordEncoder,
                    "Placement Officer",
                    "officer@campus.com",
                    "Officer@123",
                    Role.PLACEMENT_OFFICER);

            createUser(userRepository, passwordEncoder,
                    "Admin User",
                    "admin@campus.com",
                    "Admin@123",
                    Role.ADMIN);
        };
    }

    private void createUser(
            UserRepository repository,
            PasswordEncoder encoder,
            String name,
            String email,
            String password,
            Role role) {

        if (!repository.existsByEmail(email)) {
            User user = new User(
                    name,
                    email,
                    encoder.encode(password),
                    role
            );

            repository.save(user);
        }
    }
}