package com.javachinna.dto;

import com.javachinna.model.Role;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
@Builder
@Component
public class UserDTO {
    private Long userId;
    private Date createdDate;
    private String displayName;
    private String email;
    private Boolean enabled;
    private Date modifiedDate;
    private String password;
    private String provider;
    private String providerUserId;
    private Set<RoleDTO> roles;
    private Set<PostalAddressDTO> postalAddresses;
    private Set<PhoneNumberDTO> phoneNumbers;



}
