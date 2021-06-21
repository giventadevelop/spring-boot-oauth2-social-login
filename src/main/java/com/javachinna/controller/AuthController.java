package com.javachinna.controller;

import com.javachinna.dto.*;
import com.javachinna.exception.UserAlreadyExistAuthenticationException;
import com.javachinna.model.User;
import com.javachinna.security.jwt.TokenProvider;
import com.javachinna.service.LocalUserDetailService;
import com.javachinna.service.RefreshTokenService;
import com.javachinna.service.UserService;
import com.javachinna.util.GeneralUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;
import java.time.Instant;

import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    @Qualifier("localUserDetailService")
    LocalUserDetailService localUserDetailService;

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    RefreshTokenService refreshTokenService;

    /**
     * login user
     *
     * @param loginRequest
     * @return ResponseEntity<?> JwtAuthenticationResponse
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, Principal principal) throws Exception {
        return createTokenResponse(loginRequest, false, principal);
    }

    /**
     * Register user signup
    * @param userDTO
     * @return ResponseEntity<?> JwtAuthenticationResponse
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        log.debug("post /signup");
        try {
           User retUser= userService.registerNewUser(userDTO);
        //   userService.saveuserRole(retUser);
        } catch (UserAlreadyExistAuthenticationException e) {
            log.error("Exception Ocurred", e);
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
    }


    @PostMapping("/refresh/token")
    public ResponseEntity<?> refreshTokens(@Valid @RequestBody LoginRequest loginRequest, Principal principal) throws Exception {
        return createTokenResponse(loginRequest, true, principal);
    }

    /**
     * Create authentication and token response for login and refresh token request
     * @param loginRequest
     * @param isRefreshToken
     * @return ResponseEntity<?> JwtAuthenticationResponse
     */
    private ResponseEntity<?> createTokenResponse(LoginRequest loginRequest, boolean isRefreshToken, Principal principal) throws Exception {
        LocalUser localUser = null;
        String refreshToken = null;
        String jwt = null;
        Authentication authentication = null;
        if (!isRefreshToken) {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            jwt = tokenProvider.createToken(authentication,null );
            // cretae new refreshToken if not refreshing token
            refreshToken = refreshTokenService.generateRefreshToken().getToken();
            localUser = (LocalUser) authentication.getPrincipal();
        } else {
            refreshToken = loginRequest.getRefreshToken();
            refreshTokenService.validateRefreshToken(refreshToken);
            authentication = SecurityContextHolder.getContext().getAuthentication();
            jwt = tokenProvider.createToken(authentication,loginRequest.getUserId() );
            // jwt = tokenProvider.createToken(localUser);
        }
        Instant tokenExpiryTime = tokenProvider.getTokenExpiryTime();

        if (localUser != null) {
            if (localUser.getUser().getDisplayName() == null) {
                localUser.getUser().setDisplayName(localUser.getUser().getEmail());
            }
        } else {
            if(loginRequest.getUserId()!=null) {
                localUser = localUserDetailService.loadUserById(loginRequest.getUserId());
            }
          //  localUser = (LocalUser) authentication.getPrincipal();
        }

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, refreshToken, tokenExpiryTime, GeneralUtils.buildUserInfo(localUser)));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody LoginRequest loginRequest) {
        refreshTokenService.deleteRefreshToken(loginRequest.getRefreshToken());
        return ResponseEntity.status(OK).body("Refresh Token Deleted Successfully!!");
    }
}

