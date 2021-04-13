package com.javachinna.mapper;

import com.javachinna.dto.CountryDTO;
import com.javachinna.model.Country;
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
public class CountryMapperImpl implements CountryMapper {

    @Override
    public CountryDTO countryToCountryDTO(Country country) {
        if ( country == null ) {
            return null;
        }

        CountryDTO countryDTO = new CountryDTO();

        countryDTO.setCountryId( country.getCountryId() );
        countryDTO.setIso( country.getIso() );
        countryDTO.setName( country.getName() );
        countryDTO.setNiceName( country.getNiceName() );
        countryDTO.setIso3( country.getIso3() );
        countryDTO.setNumCode( country.getNumCode() );
        countryDTO.setPhoneCode( country.getPhoneCode() );

        return countryDTO;
    }

    @Override
    public Country countryDTOToCountry(CountryDTO countryDTO) {
        if ( countryDTO == null ) {
            return null;
        }

        Country country = new Country();

        country.setCountryId( countryDTO.getCountryId() );
        country.setIso( countryDTO.getIso() );
        country.setName( countryDTO.getName() );
        country.setNiceName( countryDTO.getNiceName() );
        country.setIso3( countryDTO.getIso3() );
        country.setNumCode( countryDTO.getNumCode() );
        country.setPhoneCode( countryDTO.getPhoneCode() );

        return country;
    }

    @Override
    public List<CountryDTO> mapToDTOs(List<Country> countries) {
        if ( countries == null ) {
            return null;
        }

        List<CountryDTO> set = new ArrayList<CountryDTO>( Math.max( (int) ( countries.size() / .75f ) + 1, 16 ) );
        for ( Country country : countries ) {
            set.add( countryToCountryDTO( country ) );
        }

        return set;
    }

    @Override
    public List<Country> mapToEntities(List<CountryDTO> countries) {
        if ( countries == null ) {
            return null;
        }

        List<Country> set = new ArrayList<Country>( Math.max( (int) ( countries.size() / .75f ) + 1, 16 ) );
        for ( CountryDTO countryDTO : countries ) {
            set.add( countryDTOToCountry( countryDTO ) );
        }

        return set;
    }
}
