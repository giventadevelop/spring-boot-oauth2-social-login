package com.javachinna.mapper;

import com.javachinna.dto.PhoneNumberDTO;
import com.javachinna.model.PhoneContactType;
import com.javachinna.model.PhoneNumber;
import org.springframework.stereotype.Component;

import javax.annotation.Generated;
import java.util.HashSet;
import java.util.Set;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-04-08T21:33:45-0400",
    comments = "version: 1.4.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.7.1.jar, environment: Java 1.8.0_261 (Oracle Corporation)"
)
@Component
public class PhoneNumberMapperImpl implements PhoneNumberMapper {

    @Override
    public PhoneNumberDTO phoneNumberToPhoneNumberDTO(PhoneNumber phoneNumber) {
        if ( phoneNumber == null ) {
            return null;
        }

        PhoneNumberDTO phoneNumberDTO = new PhoneNumberDTO();

        phoneNumberDTO.setPhoneId( phoneNumber.getPhoneId() );
        phoneNumberDTO.setUserId( phoneNumber.getUserId() );
        phoneNumberDTO.setIsPrimaryPhoneNumber(phoneNumber.getIsPrimaryPhoneNumber());
        phoneNumberDTO.setPhoneContactTypeId( phoneNumber.getPhoneContactType().getPhoneContactTypeId());
        phoneNumberDTO.setCustomLabel( phoneNumber.getCustomLabel() );
        phoneNumberDTO.setCountryPrefix( phoneNumber.getCountryPrefix() );
        phoneNumberDTO.setCountyPrefix( phoneNumber.getCountyPrefix() );
        phoneNumberDTO.setLocalTelNumber( phoneNumber.getLocalTelNumber() );
        phoneNumberDTO.setLocalLeadingZeros(String.valueOf(phoneNumber.getLocalLeadingZeros()));

        return phoneNumberDTO;
    }

    @Override
    public PhoneNumber phoneNumberDTOToPhoneNumber(PhoneNumberDTO phoneNumberDTO) {
        if ( phoneNumberDTO == null ) {
            return null;
        }

        PhoneNumber phoneNumber = new PhoneNumber();

        phoneNumber.setPhoneId( phoneNumberDTO.getPhoneId() );
        phoneNumber.setPhoneContactType( new PhoneContactType(phoneNumberDTO.getPhoneContactTypeId()));
        /*if (StringUtils.isBlank(phoneNumberDTO.getIsPrimaryPhoneNumber())) {
        }*/
        if (phoneNumberDTO.getIsPrimaryPhoneNumber()== null) {
            phoneNumber.setIsPrimaryPhoneNumber(false);
        }else{
            phoneNumber.setIsPrimaryPhoneNumber(phoneNumberDTO.getIsPrimaryPhoneNumber());
        }

        phoneNumber.setCustomLabel( phoneNumberDTO.getCustomLabel() );
        phoneNumber.setUserId( phoneNumberDTO.getUserId() );
        phoneNumber.setCountryPrefix( phoneNumberDTO.getCountryPrefix() );
        phoneNumber.setCountyPrefix( phoneNumberDTO.getCountyPrefix() );
        phoneNumber.setLocalTelNumber( phoneNumberDTO.getLocalTelNumber() );
        //phoneNumber.setLocalLeadingZeros(Byte.valueOf(phoneNumberDTO.getLocalLeadingZeros()));
        phoneNumber.setLocalLeadingZeros(null);

        return phoneNumber;
    }

    @Override
    public Set<PhoneNumberDTO> mapToDTOs(Set<PhoneNumber> phoneNumbers) {
        if ( phoneNumbers == null ) {
            return null;
        }

        Set<PhoneNumberDTO> set = new HashSet<PhoneNumberDTO>( Math.max( (int) ( phoneNumbers.size() / .75f ) + 1, 16 ) );
        for ( PhoneNumber phoneNumber : phoneNumbers ) {
            set.add( phoneNumberToPhoneNumberDTO(phoneNumber) );
        }

        return set;
    }

    @Override
    public Set<PhoneNumber> mapToEntities(Set<PhoneNumberDTO> phoneNumbers) {
        if ( phoneNumbers == null ) {
            return null;
        }

        Set<PhoneNumber> set = new HashSet<PhoneNumber>( Math.max( (int) ( phoneNumbers.size() / .75f ) + 1, 16 ) );
        for ( PhoneNumberDTO phoneNumberDTO : phoneNumbers ) {
            set.add( phoneNumberDTOToPhoneNumber( phoneNumberDTO ) );
        }

        return set;
    }
}
