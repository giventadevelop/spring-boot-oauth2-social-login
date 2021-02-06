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
@Table(name = "address_type")
public class AddressType {
    @Id
    @Column(name = "ADDRESS_TYPE_ID")
    private Integer addressTypeId;

    @Column(name = "ADDRESS_TYPE")
    private String addressType;


}
