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
@Table(name = "COUNTRY")
public class Country {
    @Id
    @Column(name = "COUNTRY_ID")
    private Integer countryId;

    @Column(name = "ISO")
    private String iso;

    @Column(name = "NAME")
    private String name;

    @Column(name = "NICE_NAME")
    private String niceName;

    @Column(name = "ISO3")
    private String iso3;

    @Column(name = "NUM_CODE")
    private Integer numCode;

    @Column(name = "PHONE_CODE")
    private Integer phoneCode;

   }
