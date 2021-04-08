package com.javachinna.mapper;

import com.javachinna.dto.UserDTO;
import com.javachinna.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring" , uses = {RoleMapper.class,PostalAddressMapper.class})
public interface UserMapper  {

    //UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO userToUserDTO(User user);
    User userDTOToUser(UserDTO userDTO);

    default User userDTOToJpaUser(UserDTO userDTO, User user) {
        return null;
    }
}
