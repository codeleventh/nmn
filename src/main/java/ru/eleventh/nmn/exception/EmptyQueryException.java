package ru.eleventh.nmn.exception;

public class EmptyQueryException extends RuntimeException {

    public EmptyQueryException() {
        super("Empty query? Why do you do that?");
    }

}
