package com.myanatomy.sandboxpro.dto;

import com.myanatomy.sandboxpro.model.User;

public class AdminUserResponse {

    private Long id;
    private String name;
    private String email;
    private String role;
    private boolean enabled;

    public AdminUserResponse() {
    }

    public AdminUserResponse(
            Long id,
            String name,
            String email,
            String role,
            boolean enabled
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.enabled = enabled;
    }

    public static AdminUserResponse from(User user) {
        return new AdminUserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.isEnabled()
        );
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public boolean isEnabled() {
        return enabled;
    }
}