package com.codex.eventRGUKT.service;

import com.codex.eventRGUKT.model.Event1;
import com.codex.eventRGUKT.repo.FormRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventService1 {

    @Autowired
    FormRepo formRepo;

    public Event1 saveEvent(Event1 event1) {
        return formRepo.save(event1);
    }

    public List<Event1> getAllEvents() {
        return formRepo.findAll();
    }

    public List<Event1> getAllFutureEvents() {
        LocalDate currentDate = LocalDate.now();  // Get the current date
        return formRepo.findAllFutureEvents(currentDate);
    }

    public List<Event1> getAllPastEvents() {
        LocalDate currentDate = LocalDate.now();  // Get the current date
        return formRepo.findAllPastEvents(currentDate);
    }
}
