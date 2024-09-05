package com.codex.eventRGUKT.service;

import com.codex.eventRGUKT.model.Event;
import com.codex.eventRGUKT.repo.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Event createEvent(Event event) {
        // Check if email already exists
        Optional<Event> existingEvent = eventRepository.findByEmail(event.getEmail());
        if (existingEvent.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Encrypt password before saving
        event.setPassword(passwordEncoder.encode(event.getPassword()));
        return eventRepository.save(event);
    }

    public String login(String email, String password) {
        // Retrieve event by email
        Optional<Event> eventOptional = eventRepository.findByEmail(email);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();

            // Check if password matches
            if (passwordEncoder.matches(password, event.getPassword())) {
                // Return role based on event type
                return event.getRole();
            } else {
                return "Password is incorrect";
            }
        } else {
            return "Email not registered";
        }
    }

    public boolean updatePassword(String email, String newPassword) {
        // Retrieve event by email
        Optional<Event> eventOptional = eventRepository.findByEmail(email);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();

            // Encrypt new password and update
            event.setPassword(passwordEncoder.encode(newPassword));
            eventRepository.save(event);
            return true;
        } else {
            return false;
        }
    }
}
