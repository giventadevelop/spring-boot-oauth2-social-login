package com.javachinna.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javachinna.dto.UserDTO;
import com.javachinna.mapper.UserMapper;
import com.javachinna.model.User;
import com.javachinna.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.javachinna.config.CurrentUser;
import com.javachinna.dto.LocalUser;
import com.javachinna.util.GeneralUtils;

import java.util.Date;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	private UserService userService;

	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getCurrentUser(@CurrentUser LocalUser user) {

		logger.trace("This is a trace log example");
		logger.info("This is an info log example");
		logger.debug("This is a debug log example");
		logger.error("This is an error log example");
		logger.warn("This is a warn log example");
		return ResponseEntity.ok(GeneralUtils.buildUserInfo(user));
	}

	@PostMapping("/user")
	public ResponseEntity<?> updateUserProfile(@RequestBody UserDTO userDto) {
		ObjectMapper mapper = new ObjectMapper();
		//Converting the Object to JSONString
		String jsonString = null;
		try {
			jsonString = mapper.writeValueAsString(userDto);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		logger.trace("This is a trace log jsonString");
		logger.info("This is an info log jsonString");
		logger.debug("This is a debug log jsonString");
		logger.error("This is an error log jsonString");
		logger.warn("This is a warn log jsonString");
		logger.debug(jsonString);
		userDto.setModifiedDate(new Date());
		return ResponseEntity.ok(userService.updateUserProfile(userDto));
	}

	@GetMapping("/all")
	public ResponseEntity<?> getContent() {
		return ResponseEntity.ok("Public content goes here");
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getUserContent() {

		logger.trace("This is a trace log example");
		logger.info("This is an info log example");
		logger.debug("This is a debug log example");
		logger.error("This is an error log example");
		logger.warn("This is a warn log example");


		return ResponseEntity.ok("User content goes here");
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAdminContent() {
		return ResponseEntity.ok("Admin content goes here");
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public ResponseEntity<?> getModeratorContent() {
		return ResponseEntity.ok("Moderator content goes here");
	}
}