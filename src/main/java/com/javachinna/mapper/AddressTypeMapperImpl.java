package com.javachinna.mapper;

import com.javachinna.dto.AddressTypeDTO;
import com.javachinna.model.AddressType;
import org.springframework.stereotype.Component;

import javax.annotation.Generated;
import java.util.ArrayList;
import java.util.List;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-04-12T15:02:29-0400",
    comments = "version: 1.4.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-6.7.1.jar, environment: Java 1.8.0_261 (Oracle Corporation)"
)
@Component
public class AddressTypeMapperImpl implements AddressTypeMapper {

    @Override
    public AddressTypeDTO addressTypeToAddressTypeDTO(AddressType addressType) {
        if ( addressType == null ) {
            return null;
        }

        AddressTypeDTO addressTypeDTO = new AddressTypeDTO();

        addressTypeDTO.setAddressTypeId( addressType.getAddressTypeId() );
        addressTypeDTO.setAddressType( addressType.getAddressType() );

        return addressTypeDTO;
    }

    @Override
    public AddressType addressTypeDTOToAddressType(AddressTypeDTO addressTypeDTO) {
        if ( addressTypeDTO == null ) {
            return null;
        }

        AddressType addressType = new AddressType();

        addressType.setAddressTypeId( addressTypeDTO.getAddressTypeId() );
        addressType.setAddressType( addressTypeDTO.getAddressType() );

        return addressType;
    }

    @Override
    public List<AddressTypeDTO> mapToDTOs(List<AddressType> addressTypes) {
        if ( addressTypes == null ) {
            return null;
        }

        List<AddressTypeDTO> set = new ArrayList<AddressTypeDTO>( Math.max( (int) ( addressTypes.size() / .75f ) + 1, 16 ) );
        for ( AddressType addressType : addressTypes ) {
            set.add( addressTypeToAddressTypeDTO( addressType ) );
        }

        return set;
    }

    @Override
    public List<AddressType> mapToEntities(List<AddressTypeDTO> addressTypes) {
        if ( addressTypes == null ) {
            return null;
        }

        List<AddressType> set = new ArrayList<AddressType>( Math.max( (int) ( addressTypes.size() / .75f ) + 1, 16 ) );
        for ( AddressTypeDTO addressTypeDTO : addressTypes ) {
            set.add( addressTypeDTOToAddressType( addressTypeDTO ) );
        }

        return set;
    }
}
