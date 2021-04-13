package com.javachinna.mapper;

import com.javachinna.dto.AddressTypeDTO;
import com.javachinna.model.AddressType;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring" )
public interface AddressTypeMapper {

    AddressTypeDTO addressTypeToAddressTypeDTO(AddressType addressType);
    AddressType addressTypeDTOToAddressType(AddressTypeDTO addressTypeDTO);
    List<AddressTypeDTO> mapToDTOs(List<AddressType> addressTypes);
    List<AddressType> mapToEntities(List<AddressTypeDTO> addressTypes);

//    default Postal userDTOToJpaUser(UserDTO userDTO, Postal Postal) {
//        return null;
//    }
}
