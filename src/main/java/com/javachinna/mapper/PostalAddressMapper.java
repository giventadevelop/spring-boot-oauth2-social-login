package com.javachinna.mapper;

import com.javachinna.dto.PostalAddressDTO;
import com.javachinna.model.PostalAddress;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring" )
public interface PostalAddressMapper {

    PostalAddressDTO postalAddressToPostalAddressDTO(PostalAddress postal);
    PostalAddress postalAddressDTOToPostalAddress(PostalAddressDTO postalAddressDTO);
    Set<PostalAddressDTO> mapToDTOs(Set<PostalAddress> PostalAddresses);
    Set<PostalAddress> mapToEntities(Set<PostalAddressDTO> PostalAddresses);

//    default Postal userDTOToJpaUser(UserDTO userDTO, Postal Postal) {
//        return null;
//    }
}
