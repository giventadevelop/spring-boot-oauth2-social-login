package com.javachinna.service;

import java.util.*;

import com.javachinna.dto.UserDTO;
import com.javachinna.mapper.UserMapper;
import com.javachinna.model.*;
import com.javachinna.repo.PostalAddressRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
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

    private PostalAddressRepository postalAddressRepository;

    private UserRoleRepository userRoleRepository;

    private PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    @Override
    @Transactional(value = "transactionManager",propagation = Propagation.REQUIRES_NEW)
    public User registerNewUser(final UserDTO userDTO) throws UserAlreadyExistAuthenticationException {
        if (userDTO.getUserId() != null && userRepository.existsById(userDTO.getUserId())) {
            throw new UserAlreadyExistAuthenticationException("User with User id " + userDTO.getUserId() + " already exist");
        } else if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new UserAlreadyExistAuthenticationException("User with email id " + userDTO.getEmail() + " already exist");
        }
        final User user = buildUser(userDTO);
        Set<PostalAddress> postalAddressList = user.getPostalAddresses();

        Date now = Calendar.getInstance().getTime();
        user.setCreatedDate(now);
        user.setModifiedDate(now);
       // user.setPostalAddresses(null);
        Set<UserRole> userRoles=new HashSet<>();
        // roles.stream().forEach(role -> userRoles.add(new UserRole(retUser.getId(),role.getRoleId())) );
        UserRole userRole = new  UserRole();
       // userRole.setUserId(retUser.getId());
        userRole.setRoleId(1L);
        userRoles.add(userRole);

        user.setUserRoles(userRoles);
        /*save a user first and then save the dependent entities
        like user role ids in the join table and then the postalAddress and phone numbers.*/
       final User retUser = userRepository.save(user);


        // roles.stream().forEach(role -> userRoles.add(userRole) );
       // userRoleRepository.saveAll(userRoles);

       // postalAddressList.stream().forEach(postalAddress -> postalAddress.setUserId(retUser.getId()));
        //postalAddressRepository.saveAll(postalAddressList);

        //userRepository.flush();

        // Set<Role> roles=user.getRoles();

        return retUser;
    }

    @Override
    @Transactional(value = "transactionManager")
    public void saveuserRole(User retUser) {
        Set roles=new HashSet();

        Set<UserRole> userRoles=new HashSet<>();
        // roles.stream().forEach(role -> userRoles.add(new UserRole(retUser.getId(),role.getRoleId())) );
        UserRole userRole = new  UserRole();
        userRole.setUserId(retUser.getId());
        userRole.setRoleId(1L);
        userRoles.add(userRole);
       // roles.stream().forEach(role -> userRoles.add(userRole) );
        userRoleRepository.saveAll(userRoles);
        userRoleRepository.flush();
    }

    private User buildUser(final UserDTO userDTO) {
        User user = new User();
        user=userMapper.userDTOToUser(userDTO);
        /*user.setDisplayName(userDTO.getDisplayName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        final HashSet<Role> roles = new HashSet<Role>();
        roles.add(roleRepository.findByName(Role.ROLE_USER));
        user.setRoles(roles);
        user.setProvider(userDTO.getSocialProvider().getProviderType());
        user.setEnabled(true);
        user.setProviderUserId(userDTO.getProviderUserId());*/
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

        UserDTO userDetails = toUserRegistrationObject(registrationId, oAuth2UserInfo);
        User user = findUserByEmail(oAuth2UserInfo.getEmail());
        if (user != null) {
            if (!user.getProvider().equals(registrationId) && !user.getProvider().equals(SocialProvider.LOCAL.getProviderType())) {
                throw new OAuth2AuthenticationProcessingException(
                        "Looks like you're signed up with " + user.getProvider() + " account. Please use your " + user.getProvider() + " account to login.");
            }
            logger.debug(" Save updateExistingUser userDetails :"+ userDetails.toString());
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            logger.debug(" Save registerNewUser oAuth2UserInfo :"+ oAuth2UserInfo.toString());
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
        User user = userRepository.findById(existingUser.getUserId()).get();

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

    private UserDTO toUserRegistrationObject(String registrationId, OAuth2UserInfo oAuth2UserInfo) {
        return SignUpRequest.getBuilder().addProviderUserID(oAuth2UserInfo.getId()).addDisplayName(oAuth2UserInfo.getName()).addEmail(oAuth2UserInfo.getEmail())
                .addSocialProvider(GeneralUtils.toSocialProvider(registrationId)).addPassword("changeit").build();
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }
}
