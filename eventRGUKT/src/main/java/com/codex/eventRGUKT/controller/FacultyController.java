package com.codex.eventRGUKT.controller;

import com.codex.eventRGUKT.FacultyLoginResponse;
import com.codex.eventRGUKT.model.Faculty;
import com.codex.eventRGUKT.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/faculty")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @PostMapping("/create")
    public ResponseEntity<Faculty> createFaculty(@RequestBody Faculty faculty) {
        try {
            Faculty createdFaculty = facultyService.createFaculty(faculty);
            return new ResponseEntity<>(createdFaculty, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Email already exists
        }
    }

    @PostMapping("/login")
    public ResponseEntity<FacultyLoginResponse> login(@RequestBody Faculty loginRequest) {
        String result = facultyService.login(loginRequest.getEmail(), loginRequest.getPassword());
        switch (result) {
            case "faculty":
                return new ResponseEntity<>(new FacultyLoginResponse("Login successful", "faculty"), HttpStatus.OK);
            case "student":
                return new ResponseEntity<>(new FacultyLoginResponse("Login successful", "student"), HttpStatus.OK);
            case "eventmanager":
                return new ResponseEntity<>(new FacultyLoginResponse("Login successful", "eventmanager"), HttpStatus.OK);
            case "Email not registered":
                return new ResponseEntity<>(new FacultyLoginResponse(result, null), HttpStatus.NOT_FOUND);
            case "Password is incorrect":
                return new ResponseEntity<>(new FacultyLoginResponse(result, null), HttpStatus.UNAUTHORIZED);
            default:
                return new ResponseEntity<>(new FacultyLoginResponse("An unexpected error occurred", null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody Faculty updateRequest) {
        try {
            boolean isUpdated = facultyService.updatePassword(updateRequest.getEmail(), updateRequest.getPassword());
            if (isUpdated) {
                return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
