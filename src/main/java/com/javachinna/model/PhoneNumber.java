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
@Table(name = "PHONE_NUMBER")
public class PhoneNumber {
    @Id
    @Column(name = "PHONE_ID")
    private Long phoneId;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "COUNTRY_PREFIX")
    private Short countryPrefix;

    @Column(name = "COUNTY_PREFIX")
    private Short countyPrefix;

    @Column(name = "LOCAL_TEL_NUMBER")
    private Integer localTelNumber;

    @Column(name = "LOCAL_LEADING_ZEROS")
    private Byte localLeadingZeros;

}
