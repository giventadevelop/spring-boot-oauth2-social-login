package com.javachinna.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "POSTAL_ADDRESS")
public class PostalAddress {
    @Id
    @Column(name = "ADDRESS_ID")
    private Long addressId;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "PHONE_ID")
    private Long phoneId;

    @Column(name = "ADDRESS_TYPE_ID")
    private Integer addressTypeId;

    @Column(name = "NAME_PREFIX")
    private String namePrefix;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "NAME_SUFFIX")
    private String nameSuffix;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "COMPANY_NAME")
    private String companyName;

    @Column(name = "ADDRESS_LINE_1")
    private String addressLine1;

    @Column(name = "ADDRESS_LINE_2")
    private String addressLine2;

    @Column(name = "ADDRESS_LINE_3")
    private String addressLine3;

    @Column(name = "CITY_OR_TOWN")
    private String cityOrTown;

    @Column(name = "COUNTY_OR_MUNCIPAL_OR_SUBLOCALITY")
    private String countyOrMuncipalOrSublocality;

    @Column(name = "STATE_OR_PROVICE")
    private String stateOrProvice;

    @Column(name = "COUNTRY_ID")
    private Integer countryId;

    @Column(name = "ZIP_OR_POSTAL_CODE")
    private String zipOrPostalCode;


}
