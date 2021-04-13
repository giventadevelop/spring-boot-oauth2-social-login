package com.javachinna.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
public class PhoneNumberDTO {

    private Long phoneId;
    private Long userId;
    private Integer phoneContactTypeId;
    private Boolean isPrimaryPhoneNumber;
    private String customLabel;
    private Short countryPrefix;
    private Short countyPrefix;
    private Integer localTelNumber;
    private Byte localLeadingZeros;

}
