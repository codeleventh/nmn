package ru.eleventh.nmn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.eleventh.nmn.model.Note;
import ru.eleventh.nmn.service.NoteService;

@RestController
@RequestMapping("api")
public class ApiController {

    @Autowired
    private NoteService noteService;

    @GetMapping("note")
    public ResponseEntity<?> getNotes() {
        return new ResponseEntity<>(noteService.getNotes(), HttpStatus.OK);
    }

    @PostMapping("note")
    public ResponseEntity<?> createNote(String title, String body) {
        Note note = noteService.createNote(title, body);
        return new ResponseEntity<>(note, HttpStatus.CREATED);
    }

    @GetMapping("note/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable Long id) {
        return new ResponseEntity<>(noteService.getNote(id), HttpStatus.OK);
    }

    @PostMapping("note/{id}")
    public ResponseEntity<?> updateNote(@PathVariable Long id, String title, String body) {
        noteService.updateNote(id, title, body);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("note/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("search")
    public ResponseEntity<?> searchNote(@RequestParam String query) {
        return new ResponseEntity<>(noteService.findNote(query), HttpStatus.OK);
    }
}
