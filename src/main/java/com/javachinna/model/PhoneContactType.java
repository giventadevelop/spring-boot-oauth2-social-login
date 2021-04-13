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
@Table(name = "PHONE_CONTACT_TYPE")
public class PhoneContactType {
    @Id
    @Column(name = "PHONE_CONTACT_TYPE_ID")
    private Integer phoneContactTypeId;

    @Column(name = "PHONE_CONTACT_TYPE")
    private String phoneContactType;

    public PhoneContactType(Integer phoneContactTypeId) {
        this.phoneContactTypeId = phoneContactTypeId;
    }
}
