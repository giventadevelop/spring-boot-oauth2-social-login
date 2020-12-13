package com.javachinna.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.javachinna.model.User;
import com.javachinna.dto.UserDTO;

@Mapper(componentModel = "spring" , uses = {RoleMapper.class})
public interface UserMapper  {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO userToUserDTO(User user);
    User userDTOToUser(UserDTO UserDTO);
    User userDTOToJpaUser(UserDTO UserDTO, User user);
}