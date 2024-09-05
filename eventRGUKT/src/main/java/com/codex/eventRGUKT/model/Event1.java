package com.codex.eventRGUKT.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Event1 {

    public enum EventType {
        CONFERENCE,
        WORKSHOP,
        SEMINAR,
        WEBINAR,
        MEETING,
        OTHER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String eventName;
    private LocalDate eventDate;  // Changed from String to LocalDate
    private String eventTime;
    private String eventVenue;
    private String eventDescription;
    @Enumerated(EnumType.STRING)
    private EventType eventType;
    private String organiserName;
    private String organiserContact;
}
