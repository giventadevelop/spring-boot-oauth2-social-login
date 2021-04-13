package com.javachinna.mapper;

import com.javachinna.dto.PhoneNumberDTO;
import com.javachinna.model.PhoneNumber;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring" )
public interface PhoneNumberMapper {

    PhoneNumberDTO phoneNumberToPhoneNumberDTO(PhoneNumber phoneNumber);
    PhoneNumber phoneNumberDTOToPhoneNumber(PhoneNumberDTO phoneNumberDTO);
    Set<PhoneNumberDTO> mapToDTOs(Set<PhoneNumber> phoneNumbers);
    Set<PhoneNumber> mapToEntities(Set<PhoneNumberDTO> phoneNumbers);

//    default Postal userDTOToJpaUser(UserDTO userDTO, Postal Postal) {
//        return null;
//    }
}
