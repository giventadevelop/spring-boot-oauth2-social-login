package com.javachinna.dto;

import com.javachinna.model.User;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
public class RoleDTO {
    private Long roleId;
    private String name;
    private Set<User> users;

}
