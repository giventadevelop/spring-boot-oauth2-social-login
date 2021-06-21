package com.javachinna.mapper;

import com.javachinna.dto.UserDTO;
import com.javachinna.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring" , uses = {RoleMapper.class,PostalAddressMapper.class,PhoneNumberMapper.class})
public interface UserMapper  {

    UserDTO userToUserDTO(User user);
    User userDTOToUser(UserDTO userDTO);
    User userForUpdateProfile(UserDTO userDTO,User user);

    default User userDTOToJpaUser(UserDTO userDTO, User user) {
        return null;
    }
}
