package ru.eleventh.nmn;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ru.eleventh.nmn.exception.EmptyQueryException;
import ru.eleventh.nmn.exception.NoteNotFoundException;
import ru.eleventh.nmn.model.Note;
import ru.eleventh.nmn.service.NoteService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NoteServiceTest {

    @Autowired
    NoteService noteService;

    @Test
    public void testNoteService_createNote() {
        Note n = noteService.createNote("bla-bla", "bla");
        Assert.assertNotNull(n);
    }

    @Test(expected = NoteNotFoundException.class)
    public void testNoteService_notFoundCausesException() {
        noteService.getNote(100);
    }

    @Test
    public void testNoteService_updateNote() {
        Note original = noteService.createNote("bla-bla", "bla");
        String newTitle = "new title";
        String newBody = "new body";
        noteService.updateNote(original.getId(), newTitle, newBody);
        Note modified = noteService.getNote(original.getId());
        Assert.assertEquals(modified.getTitle(), newTitle);
        Assert.assertEquals(modified.getBody(), newBody);
    }

    @Test(expected = NoteNotFoundException.class)
    public void testNoteService_updateUnexistingNote() {
        noteService.updateNote(100l, "bla-bla", "bla");
    }

    @Test(expected = NoteNotFoundException.class)
    public void testNoteService_deleteNote() {
        Note n = noteService.createNote("bla-bla", "bla");
        Assert.assertNotNull(n);
        noteService.deleteNote(n.getId());
        noteService.getNote(n.getId());
    }

    @Test
    public void testNoteService_search() {
        List<Long> ids = new ArrayList<>();
        noteService.createNote("high", "dry");
        noteService.createNote("tall", "thin");
        ids.add(noteService.createNote("query", "dog").getId());
        ids.add(noteService.createNote("touch", "query").getId());
        noteService.createNote("in", "out");
        ids.add(noteService.createNote("trqueryial", "error").getId());
        ids.add(noteService.createNote("husband", "wiqueryfe").getId());
        noteService.createNote("Jack", "White");

        List<Long> resultIds = noteService.searchNote("query")
            .stream().map(n -> n.getId()).sorted().collect(Collectors.toList());

        Assert.assertArrayEquals(ids.toArray(), resultIds.toArray());
    }

    @Test(expected = EmptyQueryException.class)
    public void testNoteService_emptySearchQuery() {
        noteService.searchNote("");
    }
}
