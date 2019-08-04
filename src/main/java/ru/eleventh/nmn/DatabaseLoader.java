package ru.eleventh.nmn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import ru.eleventh.nmn.model.Note;
import ru.eleventh.nmn.model.NoteRepository;

@Component
@Profile("!test")
public class DatabaseLoader implements CommandLineRunner {

    @Autowired
    private NoteRepository repository;

    @Override
    public void run(String[] args) {
//        this.repository.save(new Note("high", "dry"));
//        this.repository.save(new Note("tall", "thin"));
//        this.repository.save(new Note("hot", "dog"));
//        this.repository.save(new Note("touch", "go"));
//        this.repository.save(new Note("husband", "wife"));
//        this.repository.save(new Note("trial", "error"));
//        this.repository.save(new Note("in", "out"));
//        this.repository.save(new Note("Jack", "White"));
//        this.repository.save(new Note("knife", "fork"));
//        this.repository.save(new Note("wait", "see"));
//        this.repository.save(new Note("ladies", "gentlemen"));
//        this.repository.save(new Note("war", "peace"));
//        this.repository.save(new Note("law", "order"));
//        this.repository.save(new Note("wine", "cheese"));
//        this.repository.save(new Note("бока", "жока"));
//        this.repository.save(new Note("пит", "буль"));
//        this.repository.save(new Note("список покупок", "огурцы, помидоры, мука"));
    }
}