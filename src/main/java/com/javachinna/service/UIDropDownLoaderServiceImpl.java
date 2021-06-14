package com.javachinna.service;

import com.javachinna.dto.AddressTypeDTO;
import com.javachinna.dto.CountryDTO;
import com.javachinna.dto.PhoneContactTypeDTO;
import com.javachinna.mapper.AddressTypeMapper;
import com.javachinna.mapper.CountryMapper;
import com.javachinna.mapper.PhoneContactTypeMapper;
import com.javachinna.model.AddressType;
import com.javachinna.model.Country;
import com.javachinna.model.PhoneContactType;
import com.javachinna.repo.AddressTypeRepository;
import com.javachinna.repo.CountryRepository;
import com.javachinna.repo.PhoneContactTypeRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


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
    @Cacheable("addressTypes")
    public  List<AddressTypeDTO> findAllAddressTypes() {
        logger.debug("  return findAllAddressTypes ");
        List<AddressType> addressTypeList=addressTypeRepository.findAll();
        return addressTypeMapper.mapToDTOs(addressTypeList);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable("countries")
    public  List<CountryDTO> findAllCountries() {
        logger.debug("  return findAllCountries ");
        List<Country> countryList=countryRepository.findAll();
        return countryMapper.mapToDTOs(countryList);
    }


    @Override
    @Transactional(readOnly = true)
    @Cacheable("phoneContactTypes")
    public List<PhoneContactTypeDTO> findAllPhoneContactTypes() {
        logger.debug("  return findAllPhoneContactTypes ");
        List<PhoneContactType> phoneContactTypeList=phoneContactTypeRepository.findAll();
        return phoneContactTypeMapper.mapToDTOs(phoneContactTypeList);
    }

}
