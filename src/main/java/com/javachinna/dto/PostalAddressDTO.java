package com.javachinna.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
public class PostalAddressDTO {
    private Long addressId;
    private Long userId;
    private Integer addressTypeId;
    private String namePrefix;
    private String firstName;
    private String lastName;
    private String nameSuffix;
    private String gender;
    private String companyName;
    private String addressLine1;
    private String addressLine2;
    private String addressLine3;
    private String cityOrTown;
    private String countyOrMuncipalOrSublocality;
    private String stateOrProvince;
    private Integer countryId;
    private String zipOrPostalCode;
}
