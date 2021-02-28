package com.javachinna.controller;

import com.javachinna.dto.*;
import com.javachinna.exception.UserAlreadyExistAuthenticationException;
import com.javachinna.security.jwt.TokenProvider;
import com.javachinna.service.UserService;
import com.javachinna.util.GeneralUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	@RequestMapping("/")
	public String homePage() {

		return "index";
	}

	@RequestMapping("/login")
	public String loginToHomePage() {

		return "index";
	}

	//@GetMapping("/login/oauth2/code/{social-media-app}")
	public ResponseEntity<?> authenticateUser(@PathVariable("social-media-app") String socialMediaApp) {
		/*Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.createToken(authentication);
		LocalUser localUser = (LocalUser) authentication.getPrincipal();
		if(localUser.getUser() .getDisplayName()==null){
			localUser.getUser().setDisplayName(localUser.getUser().getEmail());
		}*/

		logger.info("received /login/oauth2/code/  for from social-media-app redirect uri of "+ socialMediaApp);
		logger.debug("received /login/oauth2/code/  for from social-media-app redirect uri"+ socialMediaApp);
		return ResponseEntity.ok(HttpStatus.OK);
	}


}