package com.codex.eventRGUKT.controller;

import com.codex.eventRGUKT.model.Event1;
import com.codex.eventRGUKT.service.EventService1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/form")
public class FormController {

    @Autowired
    EventService1 eventService1;

    @PostMapping("/register")
    public ResponseEntity<Event1> registerEvent(@RequestBody Event1 event1) {
        Event1 savedEvent = eventService1.saveEvent(event1);
        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
    }

    @GetMapping("/events")
    public ResponseEntity<List<Event1>> getAllEvents() {
        List<Event1> events = eventService1.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("/futureevent")
    public ResponseEntity<List<Event1>> getfutureevents(){
        List<Event1> events = eventService1.getAllFutureEvents();
        return new ResponseEntity<>(events,HttpStatus.OK);
    }

    @GetMapping("/pastevent")
    public ResponseEntity<List<Event1>> getpastevents(){
        List<Event1> events = eventService1.getAllPastEvents();
        return new ResponseEntity<>(events,HttpStatus.OK);
    }
}
