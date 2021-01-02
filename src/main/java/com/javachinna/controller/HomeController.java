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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@Controller
public class HomeController {

	@RequestMapping("/")
	public String homePage() {

		return "index";
	}

	@RequestMapping("/login")
	public String loginToHomePage() {

		return "index";
	}


}