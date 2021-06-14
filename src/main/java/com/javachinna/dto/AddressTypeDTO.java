package com.javachinna.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
@Component
public class AddressTypeDTO {
    private Integer addressTypeId;
    private String addressType;
}
