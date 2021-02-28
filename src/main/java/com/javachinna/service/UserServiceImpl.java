package com.javachinna.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;

import com.javachinna.controller.UserController;
import com.javachinna.dto.UserDTO;
import com.javachinna.mapper.UserMapper;
import com.javachinna.model.Role;
import com.javachinna.model.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.javachinna.dto.LocalUser;
import com.javachinna.dto.SignUpRequest;
import com.javachinna.dto.SocialProvider;
import com.javachinna.exception.OAuth2AuthenticationProcessingException;
import com.javachinna.exception.UserAlreadyExistAuthenticationException;
import com.javachinna.repo.RoleRepository;
import com.javachinna.repo.UserRepository;
import com.javachinna.security.oauth2.user.OAuth2UserInfo;
import com.javachinna.security.oauth2.user.OAuth2UserInfoFactory;
import com.javachinna.util.GeneralUtils;


/**
 * @author Chinna
 * @since 26/3/18
 */
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private UserMapper userMapper;

    @Override
    @Transactional(value = "transactionManager")
    public User registerNewUser(final SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException {
        if (signUpRequest.getUserID() != null && userRepository.existsById(signUpRequest.getUserID())) {
            throw new UserAlreadyExistAuthenticationException("User with User id " + signUpRequest.getUserID() + " already exist");
        } else if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new UserAlreadyExistAuthenticationException("User with email id " + signUpRequest.getEmail() + " already exist");
        }
        User user = buildUser(signUpRequest);
        Date now = Calendar.getInstance().getTime();
        user.setCreatedDate(now);
        user.setModifiedDate(now);
        user = userRepository.save(user);
        userRepository.flush();
        return user;
    }

    private User buildUser(final SignUpRequest formDTO) {
        User user = new User();
        user.setDisplayName(formDTO.getDisplayName());
        user.setEmail(formDTO.getEmail());
        user.setPassword(passwordEncoder.encode(formDTO.getPassword()));
        final HashSet<Role> roles = new HashSet<Role>();
        roles.add(roleRepository.findByName(Role.ROLE_USER));
        user.setRoles(roles);
        user.setProvider(formDTO.getSocialProvider().getProviderType());
        user.setEnabled(true);
        user.setProviderUserId(formDTO.getProviderUserId());
        return user;
    }

    @Override
    public User findUserByEmail(final String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, attributes);

        logger.info("received processUserRegistration oAuth2UserInfo "+ oAuth2UserInfo.getName());
        logger.debug("received processUserRegistration oAuth2UserInfo "+ oAuth2UserInfo.getName());

        if (StringUtils.isEmpty(oAuth2UserInfo.getName())) {
            if (!registrationId.equalsIgnoreCase("github")) {
                throw new OAuth2AuthenticationProcessingException("Name not found from OAuth2 provider");
            }
        } else if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            if (!registrationId.equalsIgnoreCase("github")) {
                throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
            }
        }

        logger.info("  get userDetails processUserRegistration oAuth2UserInfo ");
        logger.debug("  get userDetails processUserRegistration oAuth2UserInfo ");

        SignUpRequest userDetails = toUserRegistrationObject(registrationId, oAuth2UserInfo);
        User user = findUserByEmail(oAuth2UserInfo.getEmail());
        if (user != null) {
            if (!user.getProvider().equals(registrationId) && !user.getProvider().equals(SocialProvider.LOCAL.getProviderType())) {
                throw new OAuth2AuthenticationProcessingException(
                        "Looks like you're signed up with " + user.getProvider() + " account. Please use your " + user.getProvider() + " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(userDetails);
        }
        if (user.getEmail() == null) {
            if (attributes.get("login") != null) {
                user.setEmail((String) attributes.get("login"));
            } else {
                user.setEmail((String) attributes.get("id"));
            }
        }
        logger.info("  return processUserRegistration oAuth2UserInfo ");
        logger.debug("  return processUserRegistration oAuth2UserInfo ");


        return LocalUser.create(user, attributes, idToken, userInfo);
    }

    @Override
    public UserDTO updateUserProfile(UserDTO existingUser) {

       /* ObjectMapper mapper = new ObjectMapper();
        //Converting the Object to JSONString
        String jsonString = null;
        try {
            jsonString = mapper.writeValueAsString(existingUser);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(jsonString);*/
        // System.out.println("existingUser.getId()" + existingUser.getId());
        User user = userRepository.findById(existingUser.getId()).get();

       /* try {
            jsonString = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println("user " +jsonString);*/

        existingUser.setCreatedDate(user.getCreatedDate());
        user = userMapper.userDTOToJpaUser(existingUser, user);
        logger.trace("updateUserProfile updating User Profile");
        logger.debug("updateUserProfile updating User Profile before save line 153 :-");
        user=userRepository.save(user);
        existingUser=userMapper.userToUserDTO(user);
        return existingUser;
        //return userMapper.userToUserDTO(userRepository.save(user));
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setDisplayName(oAuth2UserInfo.getName());
        return userRepository.save(existingUser);
    }

    private SignUpRequest toUserRegistrationObject(String registrationId, OAuth2UserInfo oAuth2UserInfo) {
        return SignUpRequest.getBuilder().addProviderUserID(oAuth2UserInfo.getId()).addDisplayName(oAuth2UserInfo.getName()).addEmail(oAuth2UserInfo.getEmail())
                .addSocialProvider(GeneralUtils.toSocialProvider(registrationId)).addPassword("changeit").build();
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }
}
