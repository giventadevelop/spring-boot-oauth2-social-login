package com.javachinna.mapper;

import com.javachinna.dto.UserDTO;
import com.javachinna.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring" , uses = {RoleMapper.class,PostalAddressMapper.class,PhoneNumberMapper.class})
public interface UserMapper  {

    UserDTO userToUserDTO(User user);
    User userDTOToUser(UserDTO userDTO);

    default User userDTOToJpaUser(UserDTO userDTO, User user) {
        return null;
    }
}
