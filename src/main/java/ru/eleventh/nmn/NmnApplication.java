package ru.eleventh.nmn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.eleventh.nmn.service.NoteService;

@SpringBootApplication
public class NmnApplication {

    private NoteService noteService;

    public static void main(String[] args) {
        SpringApplication.run(NmnApplication.class, args);
    }

}
