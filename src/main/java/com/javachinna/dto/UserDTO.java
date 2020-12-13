package com.javachinna.dto;

import com.javachinna.model.Role;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Set;

/**
 * The persistent class for the user database table.
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@EqualsAndHashCode
@Component
public class UserDTO {

    private Date createdDate;
    private Date modifiedDate;
    private Long id;
    private String providerUserId;
    private String email;
    private boolean enabled;
    private String displayName;
    private String password;
    private String provider;
    private Set<Role> roles;
}