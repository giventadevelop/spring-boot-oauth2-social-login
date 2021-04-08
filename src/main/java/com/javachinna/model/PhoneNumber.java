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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PHONE_ID")
    private Long phoneId;

    @Column(name = "PHONE_CONTACT_TYPE_ID")
    private Integer phoneContactTypeId;

    @Column(name = "CUSTOM_LABEL")
    private String customLabel;

    @Column(name = "USER_ID", insertable = false, updatable = false)
    private Long userId;

    @Column(name = "COUNTRY_PREFIX")
    private Short countryPrefix;

    @Column(name = "COUNTY_PREFIX")
    private Short countyPrefix;

    @Column(name = "LOCAL_TEL_NUMBER")
    private Integer localTelNumber;

    @Column(name = "LOCAL_LEADING_ZEROS")
    private Byte localLeadingZeros;

    @ManyToOne
    @JoinColumn(name="USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name="COUNTRY_ID")
    private Country country;

    @ManyToOne
    @JoinColumn(name="PHONE_CONTACT_TYPE_ID")
    private PhoneContactType phoneContactType;


}
