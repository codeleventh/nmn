package ru.eleventh.nmn.model;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    @Query("SELECT n FROM Note n "
        + "WHERE n.title LIKE %?1%"
        + "OR n.body LIKE %?1%")
    List<Note> search(String query);
}