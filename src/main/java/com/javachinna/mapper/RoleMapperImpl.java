package com.javachinna.mapper;


import java.util.HashSet;
import java.util.Set;
import javax.annotation.Generated;

import com.javachinna.dto.RoleDTO;
import com.javachinna.model.Role;
import com.javachinna.model.User;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-12-10T23:09:50-0500",
    comments = "version: 1.4.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.2.jar, environment: Java 1.8.0_261 (Oracle Corporation)"
)
@Component
public class RoleMapperImpl implements RoleMapper {

    @Override
    public RoleDTO roleToRoleDTO(Role role) {
        if ( role == null ) {
            return null;
        }

        RoleDTO roleDTO = new RoleDTO();

        roleDTO.setRoleId( role.getRoleId() );
        roleDTO.setName( role.getName() );
        Set<User> set = role.getUsers();
        if ( set != null ) {
            roleDTO.setUsers( new HashSet<User>( set ) );
        }

        return roleDTO;
    }

    @Override
    public Role roleDtoToRole(RoleDTO roleDTO) {
        if ( roleDTO == null ) {
            return null;
        }

        Role role = new Role();

        role.setRoleId( roleDTO.getRoleId() );
        role.setName( roleDTO.getName() );
        Set<User> set = roleDTO.getUsers();
        if ( set != null ) {
            role.setUsers( new HashSet<User>( set ) );
        }

        return role;
    }
}
