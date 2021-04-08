package com.javachinna.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "POSTAL_ADDRESS")
public class PostalAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ADDRESS_ID")
    private Long addressId;

    @Column(name = "USER_ID", insertable = false, updatable = false)
    private Long userId;

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

    @Column(name = "STATE_OR_PROVINCE")
    private String stateOrProvince;

    @Column(name = "ZIP_OR_POSTAL_CODE")
    private String zipOrPostalCode;

    //bi-directional many-to-one association to User
    /*@ManyToOne
    @JoinColumn(name="USER_ID", insertable=false, updatable=false, referencedColumnName="USER_ID")
    private User user;*/

    //uni-directional many-to-one association to Country
    @ManyToOne
    @JoinColumn(name="COUNTRY_ID")
    private Country country;

    //bi-directional many-to-one association to AddressType
    @ManyToOne
    @JoinColumn(name="ADDRESS_TYPE_ID")
    private AddressType addressType;

}
