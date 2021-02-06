package com.javachinna.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
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

	// bi-directional many-to-many association to Role
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.ALL})
	@JoinTable(name = "user_role", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
	private Set<Role> roles;
}