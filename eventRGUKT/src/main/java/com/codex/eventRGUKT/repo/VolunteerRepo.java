package com.codex.eventRGUKT.repo;

import com.codex.eventRGUKT.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VolunteerRepo extends JpaRepository<Volunteer,Integer> {

    Optional<Volunteer> findByEmail(String email);
}
