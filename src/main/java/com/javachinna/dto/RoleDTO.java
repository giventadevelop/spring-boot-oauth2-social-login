package com.javachinna.dto;

import com.javachinna.model.User;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * The persistent class for the role database table.
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
@Component
public class RoleDTO implements Serializable {

    private Long roleId;
    private String name;
    private Set<User> users;

}