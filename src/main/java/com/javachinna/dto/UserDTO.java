package com.javachinna.dto;

import com.javachinna.model.Role;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
public class UserDTO {
    private Long id;
    private Date createdDate;
    private String displayName;
    private String email;
    private Boolean enabled;
    private Date modifiedDate;
    private String password;
    private String provider;
    private String providerUserId;
    private Long addressId;
    private Set<Role> roles;


}
