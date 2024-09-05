package com.codex.eventRGUKT;

public class FacultyLoginResponse {
    private String message;
    private String role;

    public FacultyLoginResponse(String message, String role) {
        this.message = message;
        this.role = role;
    }

    // Getters and setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
