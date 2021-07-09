package com.javachinna.exception.handler;

import com.javachinna.dto.ApiResponse;
import com.javachinna.exception.BadRequestException;
import com.javachinna.exception.ResourceNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
@ResponseStatus
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	public GlobalExceptionHandler() {
		super();
	}

	@ExceptionHandler({ AccessDeniedException.class })
	public ResponseEntity<Object> handleAccessDeniedException(
			Exception ex, WebRequest request) {
		return new ResponseEntity<Object>(
				"Access denied message here", new HttpHeaders(), HttpStatus.FORBIDDEN);
	}

	@ExceptionHandler({ ResourceNotFoundException.class })
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ResponseEntity<Object> handleResourceNotFoundException(
			ResourceNotFoundException ex, WebRequest request) {
		return new ResponseEntity<Object>(
				ex, new HttpHeaders(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler({ BadRequestException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ResponseEntity<Object> handleBadRequestException(
			BadRequestException ex, WebRequest request) {
		return new ResponseEntity<Object>(
				"Bad request or invalid input", new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}

	@Override
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	protected ResponseEntity<Object> handleMethodArgumentNotValid(final MethodArgumentNotValidException ex, final HttpHeaders headers, final HttpStatus status,
			final WebRequest request) {
		logger.error("400 Status Code", ex);
		final BindingResult result = ex.getBindingResult();

		String error = result.getAllErrors().stream().map(e -> {
			if (e instanceof FieldError) {
				return ((FieldError) e).getField() + " : " + e.getDefaultMessage();
			} else {
				return e.getObjectName() + " : " + e.getDefaultMessage();
			}
		}).collect(Collectors.joining(", "));
		return handleExceptionInternal(ex, new ApiResponse(false, error), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
	}
}
