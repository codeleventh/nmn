package ru.eleventh.nmn;

import org.hibernate.service.spi.ServiceException;
import org.springframework.core.NestedRuntimeException;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.eleventh.nmn.exception.NoteNotFoundException;

@ControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({NoteNotFoundException.class})
    protected ResponseEntity<Object> handleNotFound(RuntimeException e, WebRequest request) {
        return handleExceptionInternal(e, e.getMessage(),
                                       null,
                                       HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler({ServiceException.class, DataAccessException.class,
        NestedRuntimeException.class})
    protected ResponseEntity<Object> handleInternalError(RuntimeException e, WebRequest request) {
        return handleExceptionInternal(e, e.getMessage(),
                                       null,
                                       HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}
