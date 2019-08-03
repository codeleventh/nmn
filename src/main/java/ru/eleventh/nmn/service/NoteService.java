package ru.eleventh.nmn.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.eleventh.nmn.exception.EmptyQueryException;
import ru.eleventh.nmn.exception.NoteNotFoundException;
import ru.eleventh.nmn.model.Note;
import ru.eleventh.nmn.model.NoteRepository;

@Service
public class NoteService {

    @Autowired
    private NoteRepository repository;

    public Note createNote(String title, String body) {
        Note note = new Note(title, body);
        return repository.save(note);
    }

    public List<Note> getNotes() {
        return repository.findAll();
    }

    public Note getNote(long id) {
        Optional<Note> noteOptional = repository.findById(id);
        return noteOptional.orElseThrow(() -> new NoteNotFoundException(id));
    }

    @Transactional
    public void updateNote(Long id, String title, String body) {
        Note note = getNote(id);
        note.setTitle(title);
        note.setBody(body);
    }

    public void deleteNote(Long id) {
        repository.deleteById(id);
    }

    public List<Note> searchNote(String query) {
        if (query != "") {
            return repository.search(query);
        } else {
            throw new EmptyQueryException();
        }
    }
}
