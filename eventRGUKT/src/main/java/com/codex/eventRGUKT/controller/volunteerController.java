package com.codex.eventRGUKT.controller;

import com.codex.eventRGUKT.model.Event1;
import com.codex.eventRGUKT.model.Student;
import com.codex.eventRGUKT.model.Volunteer;
import com.codex.eventRGUKT.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/volunteer")
public class volunteerController {

    @Autowired
    private VolunteerService volunteerService;

    @PostMapping("/create")
    public ResponseEntity<Volunteer> createStudent(@RequestBody Volunteer volunteer) {
        try {
            Volunteer createdVolunteer = volunteerService.createVolunteer(volunteer);
            return new ResponseEntity<>(createdVolunteer, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Email already exists
        }
    }

    @GetMapping("/getvolunteer")
    public ResponseEntity<List<Volunteer>> getVolunteer(){
        List<Volunteer> volunteer=volunteerService.getvolunteers();
        return new ResponseEntity<>(volunteer,HttpStatus.OK);
    }

    @PutMapping("/assign/{id}")
    public ResponseEntity<Void> assignWork(@PathVariable Integer id) {
        boolean isAssigned = volunteerService.assignWork(id);
        if (isAssigned) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/unassign/{id}")
    public ResponseEntity<Void> unassignWork(@PathVariable Integer id) {
        boolean isAssigned = volunteerService.unassignWork(id);
        if (isAssigned) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
