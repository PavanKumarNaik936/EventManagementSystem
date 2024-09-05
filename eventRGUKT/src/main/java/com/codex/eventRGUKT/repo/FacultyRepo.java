package com.codex.eventRGUKT.repo;

import com.codex.eventRGUKT.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyRepo extends JpaRepository<Faculty,String> {
    Optional<Faculty> findByEmail(String email);
}
