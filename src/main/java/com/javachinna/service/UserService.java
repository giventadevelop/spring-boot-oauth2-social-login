package com.javachinna.service;

import java.util.Map;
import java.util.Optional;

import com.javachinna.dto.UserDTO;
import com.javachinna.model.User;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;

import com.javachinna.dto.LocalUser;
import com.javachinna.exception.UserAlreadyExistAuthenticationException;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Chinna
 * @since 26/3/18
 */
public interface UserService {

    public User registerNewUser(UserDTO signUpRequest) throws UserAlreadyExistAuthenticationException;

    @Transactional(value = "transactionManager")
    void saveuserRole(User retUser);

    User findUserByEmail(String email);

    Optional<User> findUserById(Long id);

    LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo);

    public UserDTO updateUserProfile(UserDTO existingUser);
}
