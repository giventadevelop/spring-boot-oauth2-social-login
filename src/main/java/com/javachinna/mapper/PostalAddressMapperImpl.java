package com.javachinna.mapper;

import com.javachinna.dto.PostalAddressDTO;
import com.javachinna.model.AddressType;
import com.javachinna.model.Country;
import com.javachinna.model.PostalAddress;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.Generated;
import java.util.HashSet;
import java.util.Set;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-04-02T22:21:44-0400",
    comments = "version: 1.4.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.7.1.jar, environment: Java 1.8.0_261 (Oracle Corporation)"
)
@Component
public class PostalAddressMapperImpl implements PostalAddressMapper {

    @Override
    public PostalAddressDTO postalAddressToPostalAddressDTO(PostalAddress postal) {
        if ( postal == null ) {
            return null;
        }

        PostalAddressDTO postalAddressDTO = new PostalAddressDTO();

        postalAddressDTO.setAddressId( postal.getAddressId() );
        postalAddressDTO.setAddressTypeId( postal.getAddressType().getAddressTypeId() );
        postalAddressDTO.setNamePrefix( postal.getNamePrefix() );
        postalAddressDTO.setFirstName( postal.getFirstName() );
        postalAddressDTO.setLastName( postal.getLastName() );
        postalAddressDTO.setNameSuffix( postal.getNameSuffix() );
        postalAddressDTO.setGender( postal.getGender()==null?"D": postal.getGender());
        postalAddressDTO.setCompanyName( postal.getCompanyName() );
        postalAddressDTO.setAddressLine1( postal.getAddressLine1() );
        postalAddressDTO.setAddressLine2( postal.getAddressLine2() );
        postalAddressDTO.setAddressLine3( postal.getAddressLine3() );
        postalAddressDTO.setCityOrTown( postal.getCityOrTown() );
        postalAddressDTO.setCountyOrMuncipalOrSublocality( postal.getCountyOrMuncipalOrSublocality() );
        postalAddressDTO.setStateOrProvince( postal.getStateOrProvince() );
        postalAddressDTO.setZipOrPostalCode( postal.getZipOrPostalCode() );
        postalAddressDTO.setCountryId( postal.getCountry().getCountryId());

        return postalAddressDTO;
    }

    @Override
    public PostalAddress postalAddressDTOToPostalAddress(PostalAddressDTO postalAddressDTO) {
        if ( postalAddressDTO == null ) {
            return null;
        }

        PostalAddress postalAddress = new PostalAddress();

        postalAddress.setAddressId( postalAddressDTO.getAddressId() );
        AddressType addressType =new AddressType();
        addressType.setAddressTypeId(postalAddressDTO.getAddressTypeId());
        postalAddress.setAddressType(addressType);
        postalAddress.setNamePrefix( postalAddressDTO.getNamePrefix() );
        postalAddress.setFirstName( postalAddressDTO.getFirstName() );
        postalAddress.setLastName( postalAddressDTO.getLastName() );
        postalAddress.setNameSuffix( postalAddressDTO.getNameSuffix() );
        if(StringUtils.isEmpty(postalAddressDTO.getGender())){
            postalAddress.setGender( null );
        }else{
            postalAddress.setGender( postalAddressDTO.getGender() );
        }

        postalAddress.setCompanyName( postalAddressDTO.getCompanyName() );
        postalAddress.setAddressLine1( postalAddressDTO.getAddressLine1() );
        postalAddress.setAddressLine2( postalAddressDTO.getAddressLine2() );
        postalAddress.setAddressLine3( postalAddressDTO.getAddressLine3() );
        postalAddress.setCityOrTown( postalAddressDTO.getCityOrTown() );
        postalAddress.setCountyOrMuncipalOrSublocality( postalAddressDTO.getCountyOrMuncipalOrSublocality() );
        postalAddress.setStateOrProvince( postalAddressDTO.getStateOrProvince() );
        postalAddress.setZipOrPostalCode( postalAddressDTO.getZipOrPostalCode() );

        Country country=new Country();
        country.setCountryId(postalAddressDTO.getCountryId());
        postalAddress.setCountry(country);

        return postalAddress;
    }

    @Override
    public Set<PostalAddressDTO> mapToDTOs(Set<PostalAddress> PostalAddresses) {
        if ( PostalAddresses == null ) {
            return null;
        }

        Set<PostalAddressDTO> set = new HashSet<PostalAddressDTO>( Math.max( (int) ( PostalAddresses.size() / .75f ) + 1, 16 ) );
        for ( PostalAddress postalAddress : PostalAddresses ) {
            set.add( postalAddressToPostalAddressDTO( postalAddress ) );
        }

        return set;
    }

    @Override
    public Set<PostalAddress> mapToEntities(Set<PostalAddressDTO> PostalAddresses) {
        if ( PostalAddresses == null ) {
            return null;
        }

        Set<PostalAddress> set = new HashSet<PostalAddress>( Math.max( (int) ( PostalAddresses.size() / .75f ) + 1, 16 ) );
        for ( PostalAddressDTO postalAddressDTO : PostalAddresses ) {
            set.add( postalAddressDTOToPostalAddress( postalAddressDTO ) );
        }

        return set;
    }
}
