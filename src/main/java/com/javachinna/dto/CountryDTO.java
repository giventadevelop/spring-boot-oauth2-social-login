package com.javachinna.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
public class CountryDTO {

    private Integer countryId;
    private String iso;
    private String name;
    private String niceName;
    private String iso3;
    private Integer numCode;
    private Integer phoneCode;


}
