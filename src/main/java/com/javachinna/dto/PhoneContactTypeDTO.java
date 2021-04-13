package com.javachinna.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode
public class PhoneContactTypeDTO {
    private Integer phoneContactTypeId;
    private String phoneContactType;

    public Integer getPhoneContactTypeId() {
        return this.phoneContactTypeId;
    }

    public void setPhoneContactTypeId(Integer phoneContactTypeId) {
        this.phoneContactTypeId = phoneContactTypeId;
    }

    public String getPhoneContactType() {
        return this.phoneContactType;
    }

    public void setPhoneContactType(String phoneContactType) {
        this.phoneContactType = phoneContactType;
    }
}
