package com.codex.eventRGUKT.repo;

import com.codex.eventRGUKT.model.Event1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FormRepo extends JpaRepository<Event1,Integer> {
    @Query("SELECT e FROM Event1 e WHERE e.eventDate > :currentDate")
    List<Event1> findAllFutureEvents(LocalDate currentDate);

    @Query("SELECT e FROM Event1 e WHERE e.eventDate < :currentDate")
    List<Event1> findAllPastEvents(LocalDate currentDate);
}
