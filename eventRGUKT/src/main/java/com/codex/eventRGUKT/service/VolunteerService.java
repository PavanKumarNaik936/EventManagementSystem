package com.codex.eventRGUKT.service;

import com.codex.eventRGUKT.model.Student;
import com.codex.eventRGUKT.model.Volunteer;
import com.codex.eventRGUKT.repo.VolunteerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerRepo volunteerRepo;

    public Volunteer createVolunteer(Volunteer volunteer) {
//        // Check if email already exists
//        Optional<Volunteer> existingVolunteer = volunteerRepo.findByEmail(volunteer.getEmail());
//        if (existingVolunteer.isPresent()) {
//            throw new IllegalArgumentException("Email already exists");
//        }
        return volunteerRepo.save(volunteer);
    }

    public List<Volunteer> getvolunteers() {

       return volunteerRepo.findAll();
    }

    public boolean assignWork(Integer id) {
        Optional<Volunteer> volunteerOptional = volunteerRepo.findById(id);
        if (volunteerOptional.isPresent()) {
            Volunteer volunteer = volunteerOptional.get();
            volunteer.setWorkassigned(true);
            volunteerRepo.save(volunteer);
            return true;
        } else {
            return false;
        }
    }
    public boolean unassignWork(Integer id) {
        Optional<Volunteer> volunteerOptional = volunteerRepo.findById(id);
        if (volunteerOptional.isPresent()) {
            Volunteer volunteer = volunteerOptional.get();
            volunteer.setWorkassigned(false);
            volunteerRepo.save(volunteer);
            return true;
        } else {
            return false;
        }
    }
}
