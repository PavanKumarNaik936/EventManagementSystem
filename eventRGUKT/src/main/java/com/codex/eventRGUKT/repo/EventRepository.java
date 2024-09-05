package com.codex.eventRGUKT.repo;

import com.codex.eventRGUKT.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event,String> {

    Optional<Event> findByEmail(String email);
}
