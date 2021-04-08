package com.javachinna.repo;

import com.javachinna.model.PostalAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostalAddressRepository extends JpaRepository<PostalAddress, Long> {
}
