package com.javachinna.mapper;

import com.javachinna.dto.RoleDTO;
import com.javachinna.model.Role;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * The persistent class for the role database table.
 * 
 */

@Mapper(componentModel = "spring", uses = {UserMapper.class})
//@Mapper(componentModel = "spring")
public interface RoleMapper   {

    //public RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

    RoleDTO roleToRoleDTO(Role role);
    Role roleDtoToRole(RoleDTO roleDTO);
}
