package com.javachinna.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

	private static final Logger logger = LoggerFactory.getLogger(RestAuthenticationEntryPoint.class);

	@Override
	public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
		logger.error("Responding with unauthorized error. Message - {}", e.getMessage());
		logger.debug("httpServletRequest.getRequestURI() - {}", httpServletRequest.getRequestURI());
		logger.debug("httpServletRequest.getPathInfo() - {}", httpServletRequest.getPathInfo());
		logger.debug("httpServletResponse.getStatus() - {}", httpServletResponse.getStatus());
		logger.debug("httpServletResponse.toString() - {}", httpServletResponse.toString());
		logger.debug("httpServletResponse.getStatus() - {}", e.getStackTrace());
		httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getLocalizedMessage());
	}
}