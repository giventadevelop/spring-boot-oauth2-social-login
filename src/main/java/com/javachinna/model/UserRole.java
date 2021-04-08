package com.javachinna.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER_ROLE")
public class UserRole implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_ROLE_ID")
    private Long userRole;

    @Column(name = "USER_ID", insertable = false, updatable = false)
    private Long userId;

    @Column(name = "role_id")
    private Long roleId;

   /* public UserRole(Long userId, Long roleId) {
        this.userId = userId;
        this.roleId = roleId;
    }*/
}
