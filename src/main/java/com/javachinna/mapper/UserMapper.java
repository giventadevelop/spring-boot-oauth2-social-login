package com.javachinna.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import com.javachinna.model.User;
import com.javachinna.dto.UserDTO;

@Mapper(componentModel = "spring" , uses = {RoleMapper.class})
public interface UserMapper  {

    //UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO userToUserDTO(User user);
    User userDTOToUser(UserDTO UserDTO);

    default User userDTOToJpaUser(UserDTO userDTO, User user) {
        return null;
    }
}