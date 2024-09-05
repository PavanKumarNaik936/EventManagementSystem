package com.codex.eventRGUKT.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Event {

    private String firstname;
    private String lastname;
    @Id
    @Column(unique = true)
    private String email;
    private String password;
    private String role;
    private String eventcode;
}

