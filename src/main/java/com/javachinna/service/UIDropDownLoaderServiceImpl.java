package com.javachinna.service;

import com.javachinna.dto.*;
import com.javachinna.exception.OAuth2AuthenticationProcessingException;
import com.javachinna.exception.UserAlreadyExistAuthenticationException;
import com.javachinna.mapper.AddressTypeMapper;
import com.javachinna.mapper.CountryMapper;
import com.javachinna.mapper.PhoneContactTypeMapper;
import com.javachinna.mapper.UserMapper;
import com.javachinna.model.*;
import com.javachinna.repo.*;
import com.javachinna.security.oauth2.user.OAuth2UserInfo;
import com.javachinna.security.oauth2.user.OAuth2UserInfoFactory;
import com.javachinna.util.GeneralUtils;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.*;


/**
 * @author GainJo
 * @since 26/3/18
 */
@Service
@AllArgsConstructor
public class UIDropDownLoaderServiceImpl implements UIDropDownLoaderService {

    private static final Logger logger = LoggerFactory.getLogger(UIDropDownLoaderServiceImpl.class);

    private AddressTypeRepository addressTypeRepository;
    private CountryRepository countryRepository;
    private PhoneContactTypeRepository phoneContactTypeRepository;

    private final AddressTypeMapper addressTypeMapper;
    private final CountryMapper countryMapper;
    private final PhoneContactTypeMapper phoneContactTypeMapper;



    @Override
    @Transactional(readOnly = true)
    public  List<AddressTypeDTO> findAllAddressTypes() {
        logger.debug("  return findAllAddressTypes ");
        List<AddressType> addressTypeList=addressTypeRepository.findAll();
        return addressTypeMapper.mapToDTOs(addressTypeList);
    }

    @Override
    @Transactional(readOnly = true)
    public  List<CountryDTO> findAllCountries() {
        logger.debug("  return findAllCountries ");
        List<Country> countryList=countryRepository.findAll();
        return countryMapper.mapToDTOs(countryList);
    }


    @Override
    @Transactional(readOnly = true)
    public List<PhoneContactTypeDTO> findAllPhoneContactTypes() {
        logger.debug("  return findAllPhoneContactTypes ");
        List<PhoneContactType> phoneContactTypeList=phoneContactTypeRepository.findAll();
        return phoneContactTypeMapper.mapToDTOs(phoneContactTypeList);
    }

}
