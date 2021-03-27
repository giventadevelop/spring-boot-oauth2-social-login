package com.javachinna.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String email;

    private Long userId;

    private String jwtToken;

    private String refreshToken;

    @NotBlank
    private String password;
}