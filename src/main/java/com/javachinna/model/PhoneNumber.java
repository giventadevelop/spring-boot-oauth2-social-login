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
@Table(name = "PHONE_NUMBER")
public class PhoneNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "PHONE_ID")
    private Long phoneId;

    @Column(name = "IS_PRIMARY_PHONE_NUMBER", columnDefinition = "BOOLEAN")
    private Boolean isPrimaryPhoneNumber;

    @Column(name = "CUSTOM_LABEL")
    private String customLabel;

    @Column(name = "USER_ID", insertable = false, updatable = false)
    private Long userId;

    @Column(name = "COUNTRY_PREFIX")
    private Short countryPrefix;

    @Column(name = "COUNTY_PREFIX")
    private Short countyPrefix;

    @Column(name = "LOCAL_TEL_NUMBER")
    private String localTelNumber;

    @Column(name = "LOCAL_LEADING_ZEROS")
    private Byte localLeadingZeros;

    /*uni-directional many-to-one association to PHONE_CONTACT_TYPE table
    in this mapping you don't need to give the member field above and the
    getters and setters just the below column mapping will suffice.
    */
    @ManyToOne
    @JoinColumn(name="PHONE_CONTACT_TYPE_ID")
    private PhoneContactType phoneContactType;


}
