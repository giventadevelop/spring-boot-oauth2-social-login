package com.javachinna.dto;

import lombok.Value;

import java.time.Instant;

@Value
public class JwtAuthenticationResponse {
	private String accessToken;

	private String refreshToken;

	private Instant expiresAt;

	private UserInfo user;
}