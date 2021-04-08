package com.javachinna.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ADDRESS_TYPE")
public class AddressType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ADDRESS_TYPE_ID")
    private Integer addressTypeId;

    @Column(name = "ADDRESS_TYPE")
    private String addressType;

    //bi-directional many-to-one association to PostalAddress
    @OneToMany(mappedBy="addressType")
    private Set<PostalAddress> postalAddresses;


}
