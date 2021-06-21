package com.javachinna.mapper;

import com.javachinna.dto.RoleDTO;
import com.javachinna.dto.SocialProvider;
import com.javachinna.dto.UserDTO;
import com.javachinna.model.Role;
import com.javachinna.model.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.Generated;
import java.util.HashSet;
import java.util.Set;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-12-13T13:57:16-0500",
    comments = "version: 1.4.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.7.1.jar, environment: Java 1.8.0_261 (Oracle Corporation)"
)
@Component
@AllArgsConstructor
public class UserMapperImpl implements UserMapper {

    @Autowired
    private PhoneNumberMapper phoneNumberMapper;
    @Autowired
    private PostalAddressMapper postalAddressMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO userToUserDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setCreatedDate( user.getCreatedDate() );
        userDTO.setModifiedDate( user.getModifiedDate() );
        userDTO.setUserId( user.getId() );
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
        userDTO.setPostalAddresses( postalAddressMapper.mapToDTOs( user.getPostalAddresses() ) );
        userDTO.setPhoneNumbers( phoneNumberMapper.mapToDTOs( user.getPhoneNumbers() ) );

        return userDTO;
    }

    @Override
    public User userDTOToUser(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();
        /**
         * a scenario where a new user sign up/register from web
         * where the social provider is LOCAL and user id ==0
         */

        if(userDTO.getUserId()== null || userDTO.getUserId().longValue()==0){
            user.setDisplayName(userDTO.getDisplayName());
            user.setEmail(userDTO.getEmail());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            final HashSet<Role> roles = new HashSet<Role>();
            roles.add(new Role(Role.ROLE_USER));
           // user.setRoles(roles);
            user.setProvider(SocialProvider.LOCAL.getProviderType());
            user.setEnabled(true);
            user.setProviderUserId(userDTO.getProviderUserId());
            user.setPostalAddresses( postalAddressMapper.mapToEntities( userDTO.getPostalAddresses() ) );
            user.setPhoneNumbers( phoneNumberMapper.mapToEntities( userDTO.getPhoneNumbers() ) );


        }else{
            user.setId( userDTO.getUserId() );
            user.setProviderUserId( userDTO.getProviderUserId() );
            user.setEmail( userDTO.getEmail() );
            user.setEnabled( userDTO.getEnabled());
            user.setDisplayName( userDTO.getDisplayName() );
            user.setCreatedDate( userDTO.getCreatedDate() );
            user.setModifiedDate( userDTO.getModifiedDate() );
            user.setPassword( userDTO.getPassword() );
            user.setProvider( userDTO.getProvider() );
            Set<RoleDTO> set = userDTO.getRoles();
            if ( set != null ) {
              //  user.setRoles( new HashSet<Role>( set ) );
            }

            user.setPostalAddresses( postalAddressMapper.mapToEntities( userDTO.getPostalAddresses() ) );
            user.setPhoneNumbers( phoneNumberMapper.mapToEntities( userDTO.getPhoneNumbers() ) );


        }
        
        return user;
    }

    @Override
    public User userForUpdateProfile(UserDTO userDTO, User user) {


        user.setEnabled( userDTO.getEnabled());
        user.setDisplayName( userDTO.getDisplayName() );

        Set<RoleDTO> set = userDTO.getRoles();
        if ( set != null ) {
            //  user.setRoles( new HashSet<Role>( set ) );
        }

        user.setPostalAddresses( postalAddressMapper.mapToEntities( userDTO.getPostalAddresses() ) );
        user.setPhoneNumbers( phoneNumberMapper.mapToEntities( userDTO.getPhoneNumbers() ) );

        return user;
    }

    @Override
    public User userDTOToJpaUser(UserDTO userDTO, User user) {

        if ( userDTO == null ) {
            return null;
        }

        user.setId( userDTO.getUserId() );
        user.setProviderUserId( userDTO.getProviderUserId() );
        user.setEmail( userDTO.getEmail() );
        user.setEnabled( userDTO.getEnabled() );
        // user.setDisplayName( UserDTO.getDisplayName() );
        // user.setCreatedDate( UserDTO.getCreatedDate() );
        user.setModifiedDate( userDTO.getModifiedDate() );
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())  );
        user.setPostalAddresses( postalAddressMapper.mapToEntities( userDTO.getPostalAddresses() ) );
        user.setPhoneNumbers( phoneNumberMapper.mapToEntities( userDTO.getPhoneNumbers() ) );

        // user.setProvider( UserDTO.getProvider() );
        /*Set<Role> set = UserDTO.getRoles();
        if ( set != null ) {
            user.setRoles( new HashSet<Role>( set ) );
        }*/

        return user;
    }
}
