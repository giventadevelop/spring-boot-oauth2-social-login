package com.javachinna.mapper;

import com.javachinna.dto.PostalAddressDTO;
import com.javachinna.model.PostalAddress;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring" )
public interface PostalAddressMapper {

   // PostalAddressMapper INSTANCE = Mappers.getMapper(PostalAddressMapper.class);

    PostalAddressDTO postalAddressToPostalAddressDTO(PostalAddress postal);
    PostalAddress postalAddressDTOToPostalAddress(PostalAddressDTO postalAddressDTO);

//    default Postal userDTOToJpaUser(UserDTO userDTO, Postal Postal) {
//        return null;
//    }
}
