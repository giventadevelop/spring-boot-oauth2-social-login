package com.javachinna.mapper;

import com.javachinna.dto.PhoneContactTypeDTO;
import com.javachinna.model.PhoneContactType;
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
public class PhoneContactTypeMapperImpl implements PhoneContactTypeMapper {

    @Override
    public PhoneContactTypeDTO phoneContactTypeToPhoneContactTypeDTO(PhoneContactType phoneContactType) {
        if ( phoneContactType == null ) {
            return null;
        }

        PhoneContactTypeDTO phoneContactTypeDTO = new PhoneContactTypeDTO();

        phoneContactTypeDTO.setPhoneContactTypeId( phoneContactType.getPhoneContactTypeId() );
        phoneContactTypeDTO.setPhoneContactType( phoneContactType.getPhoneContactType() );

        return phoneContactTypeDTO;
    }

    @Override
    public PhoneContactType phoneContactTypeDTOToPhoneContactType(PhoneContactTypeDTO phoneContactTypeDTO) {
        if ( phoneContactTypeDTO == null ) {
            return null;
        }

        PhoneContactType phoneContactType = new PhoneContactType();

        phoneContactType.setPhoneContactTypeId( phoneContactTypeDTO.getPhoneContactTypeId() );
        phoneContactType.setPhoneContactType( phoneContactTypeDTO.getPhoneContactType() );

        return phoneContactType;
    }

    @Override
    public List<PhoneContactTypeDTO> mapToDTOs(List<PhoneContactType> phoneContactTypes) {
        if ( phoneContactTypes == null ) {
            return null;
        }

        List<PhoneContactTypeDTO> set = new ArrayList<PhoneContactTypeDTO>( Math.max( (int) ( phoneContactTypes.size() / .75f ) + 1, 16 ) );
        for ( PhoneContactType phoneContactType : phoneContactTypes ) {
            set.add( phoneContactTypeToPhoneContactTypeDTO( phoneContactType ) );
        }

        return set;
    }

    @Override
    public List<PhoneContactType> mapToEntities(List<PhoneContactTypeDTO> phoneContactTypes) {
        if ( phoneContactTypes == null ) {
            return null;
        }

        List<PhoneContactType> set = new ArrayList<PhoneContactType>( Math.max( (int) ( phoneContactTypes.size() / .75f ) + 1, 16 ) );
        for ( PhoneContactTypeDTO phoneContactTypeDTO : phoneContactTypes ) {
            set.add( phoneContactTypeDTOToPhoneContactType( phoneContactTypeDTO ) );
        }

        return set;
    }
}
