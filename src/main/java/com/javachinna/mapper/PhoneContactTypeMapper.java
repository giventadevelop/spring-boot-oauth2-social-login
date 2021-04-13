package com.javachinna.mapper;

import com.javachinna.dto.PhoneContactTypeDTO;
import com.javachinna.model.PhoneContactType;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring" )
public interface PhoneContactTypeMapper {

   PhoneContactTypeDTO phoneContactTypeToPhoneContactTypeDTO(PhoneContactType phoneContactType);
   PhoneContactType phoneContactTypeDTOToPhoneContactType(PhoneContactTypeDTO phoneContactTypeDTO);
    List<PhoneContactTypeDTO> mapToDTOs(List<PhoneContactType> phoneContactTypes);
    List<PhoneContactType> mapToEntities(List<PhoneContactTypeDTO> phoneContactTypes);

//    default Postal userDTOToJpaUser(UserDTO userDTO, Postal Postal) {
//        return null;
//    }
}
