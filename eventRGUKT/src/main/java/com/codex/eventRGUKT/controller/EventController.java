package com.codex.eventRGUKT.controller;

import com.codex.eventRGUKT.EventLoginResponse;
import com.codex.eventRGUKT.model.Event;
import com.codex.eventRGUKT.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event")
public class EventController {  // Corrected class name to follow Java naming conventions

    @Autowired
    private EventService eventService;

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        try {
            Event createdEvent = eventService.createEvent(event);
            return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Event already exists or invalid data
        }
    }

    @PostMapping("/login")
    public ResponseEntity<EventLoginResponse> login(@RequestBody Event loginRequest) {
        String result = eventService.login(loginRequest.getEmail(), loginRequest.getPassword());
        switch (result) {
            case "eventmanager":
                return new ResponseEntity<>(new EventLoginResponse("Login successful", "eventmanager"), HttpStatus.OK);
            case "student":
                return new ResponseEntity<>(new EventLoginResponse("Login successful", "student"), HttpStatus.OK);
            case "faculty":
                return new ResponseEntity<>(new EventLoginResponse("Login successful", "faculty"), HttpStatus.OK);
            case "Email not registered":
                return new ResponseEntity<>(new EventLoginResponse(result, null), HttpStatus.NOT_FOUND);
            case "Password is incorrect":
                return new ResponseEntity<>(new EventLoginResponse(result, null), HttpStatus.UNAUTHORIZED);
            default:
                return new ResponseEntity<>(new EventLoginResponse("An unexpected error occurred", null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody Event updateRequest) {
        try {
            boolean isUpdated = eventService.updatePassword(updateRequest.getEmail(), updateRequest.getPassword());
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
