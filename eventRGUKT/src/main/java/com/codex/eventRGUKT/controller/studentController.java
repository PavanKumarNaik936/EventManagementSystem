package com.codex.eventRGUKT.controller;

import com.codex.eventRGUKT.LoginResponseS;
import com.codex.eventRGUKT.model.Student;
import com.codex.eventRGUKT.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class studentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        String baseUrl = "http://localhost:8080"; // Adjust this as per your environment
        try {
            Student createdStudent = studentService.createStudent(student, baseUrl);
            return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseS> login(@RequestBody Student loginRequest) {
        String result = studentService.login(loginRequest.getEmail(), loginRequest.getPassword());

        switch (result) {
            case "Verify Your Email":
                return new ResponseEntity<>(new LoginResponseS("Go and Verify your gmail",null),HttpStatus.BAD_REQUEST);
            case "student":
                return new ResponseEntity<>(new LoginResponseS("Login successful", "student"), HttpStatus.OK);
            case "eventmanager":
                return new ResponseEntity<>(new LoginResponseS("Login successful", "eventmanager"), HttpStatus.OK);
            case "faculty":
                return new ResponseEntity<>(new LoginResponseS("Login successful", "faculty"), HttpStatus.OK);
            case "Email not registered":
                return new ResponseEntity<>(new LoginResponseS(result, null), HttpStatus.NOT_FOUND);
            case "Password is incorrect":
                return new ResponseEntity<>(new LoginResponseS(result, null), HttpStatus.UNAUTHORIZED);
            default:
                return new ResponseEntity<>(new LoginResponseS("An unexpected error occurred", null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // New endpoint to request a password update
    @PutMapping("/requestupdatepassword")
    public ResponseEntity<String> requestUpdatePassword(@RequestBody String email) {
        boolean isRequested = studentService.updatePasswordRequest(email);
        if (isRequested) {
            return new ResponseEntity<>("Verification email sent", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to handle password update after verification
    @PutMapping("/verifyresetpassword")
    public ResponseEntity<String> verifyResetPassword(@RequestParam("token") String token, @RequestBody String newPassword) {
        boolean isUpdated = studentService.verifyTokenAndUpdatePassword(token, newPassword);
        if (isUpdated) {
            return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid or expired token", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        String result = studentService.verifyToken(token);
        if ("Email verified successfully".equals(result)) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else if ("Token expired".equals(result)) {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
    }
}
