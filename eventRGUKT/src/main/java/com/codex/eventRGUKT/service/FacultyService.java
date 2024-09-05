package com.codex.eventRGUKT.service;

import com.codex.eventRGUKT.model.Faculty;
import com.codex.eventRGUKT.repo.FacultyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepo facultyRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Faculty createFaculty(Faculty faculty) {
        // Check if email already exists
        Optional<Faculty> existingFaculty = facultyRepository.findByEmail(faculty.getEmail());
        if (existingFaculty.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Encrypt password before saving
        faculty.setPassword(passwordEncoder.encode(faculty.getPassword()));
        return facultyRepository.save(faculty);
    }

    public String login(String email, String password) {
        // Retrieve faculty by email
        Optional<Faculty> facultyOptional = facultyRepository.findByEmail(email);
        if (facultyOptional.isPresent()) {
            Faculty faculty = facultyOptional.get();

            // Check if password matches
            if (passwordEncoder.matches(password, faculty.getPassword())) {
                // Return role based on faculty type
                return faculty.getRole();
            } else {
                return "Password is incorrect";
            }
        } else {
            return "Email not registered";
        }
    }

    public boolean updatePassword(String email, String newPassword) {
        // Retrieve faculty by email
        Optional<Faculty> facultyOptional = facultyRepository.findByEmail(email);
        if (facultyOptional.isPresent()) {
            Faculty faculty = facultyOptional.get();

            // Encrypt new password and update
            faculty.setPassword(passwordEncoder.encode(newPassword));
            facultyRepository.save(faculty);
            return true;
        } else {
            return false;
        }
    }
}
