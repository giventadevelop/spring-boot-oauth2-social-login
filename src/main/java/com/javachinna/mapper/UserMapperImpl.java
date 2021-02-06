package com.javachinna.mapper;

import java.util.HashSet;
import java.util.Set;
import javax.annotation.Generated;

import com.javachinna.dto.UserDTO;
import com.javachinna.model.Role;
import com.javachinna.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-12-13T13:57:16-0500",
    comments = "version: 1.4.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.7.1.jar, environment: Java 1.8.0_261 (Oracle Corporation)"
)
@Component
@AllArgsConstructor
public class UserMapperImpl implements UserMapper {

private PasswordEncoder passwordEncoder;
    @Override
    public UserDTO userToUserDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setCreatedDate( user.getCreatedDate() );
        userDTO.setModifiedDate( user.getModifiedDate() );
        userDTO.setId( user.getId() );
        userDTO.setProviderUserId( user.getProviderUserId() );
        userDTO.setEmail( user.getEmail() );
        userDTO.setEnabled( user.getEnabled() );
        userDTO.setDisplayName( user.getDisplayName() );
        userDTO.setPassword( user.getPassword() );
        userDTO.setProvider( user.getProvider() );
        /*Set<Role> set = user.getRoles();
        if ( set != null ) {
            userDTO.setRoles( new HashSet<Role>( set ) );
        }*/

        return userDTO;
    }

    @Override
    public User userDTOToUser(UserDTO UserDTO) {
        if ( UserDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( UserDTO.getId() );
        user.setProviderUserId( UserDTO.getProviderUserId() );
        user.setEmail( UserDTO.getEmail() );
        user.setEnabled( UserDTO.getEnabled());
        user.setDisplayName( UserDTO.getDisplayName() );
        user.setCreatedDate( UserDTO.getCreatedDate() );
        user.setModifiedDate( UserDTO.getModifiedDate() );
        user.setPassword( UserDTO.getPassword() );
        user.setProvider( UserDTO.getProvider() );
        Set<Role> set = UserDTO.getRoles();
        if ( set != null ) {
            user.setRoles( new HashSet<Role>( set ) );
        }

        return user;
    }

    @Override
    public User userDTOToJpaUser(UserDTO UserDTO, User user) {
        if ( UserDTO == null ) {
            return null;
        }

        user.setId( UserDTO.getId() );
        user.setProviderUserId( UserDTO.getProviderUserId() );
        user.setEmail( UserDTO.getEmail() );
        user.setEnabled( UserDTO.getEnabled() );
        // user.setDisplayName( UserDTO.getDisplayName() );
        // user.setCreatedDate( UserDTO.getCreatedDate() );
        user.setModifiedDate( UserDTO.getModifiedDate() );
        user.setPassword(passwordEncoder.encode(UserDTO.getPassword())  );
        // user.setProvider( UserDTO.getProvider() );
        /*Set<Role> set = UserDTO.getRoles();
        if ( set != null ) {
            user.setRoles( new HashSet<Role>( set ) );
        }*/

        return user;
    }
}
