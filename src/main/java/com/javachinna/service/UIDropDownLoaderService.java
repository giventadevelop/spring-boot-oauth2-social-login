package com.javachinna.service;

import com.javachinna.dto.*;
import com.javachinna.exception.UserAlreadyExistAuthenticationException;
import com.javachinna.model.User;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * @author Chinna
 * @since 26/3/18
 */
public interface UIDropDownLoaderService {

    List<AddressTypeDTO> findAllAddressTypes();
    List<CountryDTO> findAllCountries();
    List<PhoneContactTypeDTO> findAllPhoneContactTypes();



}
