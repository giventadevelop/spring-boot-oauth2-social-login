package com.javachinna.mapper;

import com.javachinna.dto.CountryDTO;
import com.javachinna.model.Country;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring" )
public interface CountryMapper {

    CountryDTO countryToCountryDTO(Country country);
    Country countryDTOToCountry(CountryDTO countryDTO);
    List<CountryDTO> mapToDTOs(List<Country> countries);
    List<Country> mapToEntities(List<CountryDTO> countries);

//    default Postal userDTOToJpaUser(UserDTO userDTO, Postal Postal) {
//        return null;
//    }
}
