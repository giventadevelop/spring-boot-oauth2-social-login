package com.javachinna.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

	@Column(name = "PROVIDER_USER_ID")
	private String providerUserId;

	private String email;

    @Column(name = "display_name")
    private String displayName;

	@Column(name = "created_date", nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	protected Date createdDate;

    @Column(name = "enabled")
    private Boolean enabled;

    @Column(name = "modified_date")
    private Date modifiedDate;

    @Column(name = "password")
    private String password;

    @Column(name = "provider")
    private String provider;

    @Column(name = "ADDRESS_ID")
    private Long addressId;

    @Column(name = "PHONE_ID")
    private Long phoneId;

    //bi-directional many-to-one association to PostalAddress
    //@OneToMany(mappedBy="user",fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
   // @OneToMany(mappedBy="user",fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    //@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID")
    @OneToMany(targetEntity=PostalAddress.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", nullable = false)
    private Set<PostalAddress> postalAddresses=new HashSet<>();


    //bi-directional many-to-one association to PhoneNumber
   /* @OneToMany(mappedBy="user")
    private Set<PhoneNumber> phoneNumbers;*/

    @OneToMany(targetEntity=PhoneNumber.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", nullable = false)
    private Set<PhoneNumber> phoneNumbers=new HashSet<>();

	// bi-directional many-to-many association to Role
	/*@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_role", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
	private Set<Role> roles;*/

   /* @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)*/
   // @JoinTable(name = "user_role", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
   // @JoinTable(name = "user_role", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
    //private Set<Role> roles;

   /* @JsonIgnore
    @OneToMany
    @JoinTable(name = "user_role")
    private Set<Role> roles;*/

    @OneToMany(targetEntity=UserRole.class,cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", nullable = false)
    private Set<UserRole> userRoles=new HashSet<>();


    public PostalAddress addPostalAddress(PostalAddress postalAddress) {
        if(getPostalAddresses()!=null) {
            getPostalAddresses().add(postalAddress);
       //     postalAddress.setUser(this);
        }else{
            Set<PostalAddress> postalAddresses =new HashSet<>();
            postalAddresses.add(postalAddress);
            this.setPostalAddresses(postalAddresses);
        }

        return postalAddress;
    }

    public PostalAddress removePostalAddress(PostalAddress postalAddress) {
        getPostalAddresses().remove(postalAddress);
        //postalAddress.setUser(null);

        return postalAddress;
    }

    public PhoneNumber addPhoneNumber(PhoneNumber phoneNumber) {
        getPhoneNumbers().add(phoneNumber);
       // phoneNumber.setUser(this);

        return phoneNumber;
    }

    public PhoneNumber removePhoneNumber(PhoneNumber phoneNumber) {
        getPhoneNumbers().remove(phoneNumber);
       // phoneNumber.setUser(null);

        return phoneNumber;
    }


}
