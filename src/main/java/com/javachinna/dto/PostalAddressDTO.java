package com.javachinna.dto;

public class PostalAddressDTO {
    private Long addressId;
    private Long userId;
    private Long phoneId;
    private Integer addressTypeId;
    private String namePrefix;
    private String firstName;
    private String lastName;
    private String nameSuffix;
    private String gender;
    private String companyName;
    private String addressLine1;
    private String addressLine2;
    private String addressLine3;
    private String cityOrTown;
    private String countyOrMuncipalOrSublocality;
    private String stateOrProvice;
    private Integer countryId;
    private String zipOrPostalCode;

    public Long getAddressId() {
        return this.addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPhoneId() {
        return this.phoneId;
    }

    public void setPhoneId(Long phoneId) {
        this.phoneId = phoneId;
    }

    public Integer getAddressTypeId() {
        return this.addressTypeId;
    }

    public void setAddressTypeId(Integer addressTypeId) {
        this.addressTypeId = addressTypeId;
    }

    public String getNamePrefix() {
        return this.namePrefix;
    }

    public void setNamePrefix(String namePrefix) {
        this.namePrefix = namePrefix;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNameSuffix() {
        return this.nameSuffix;
    }

    public void setNameSuffix(String nameSuffix) {
        this.nameSuffix = nameSuffix;
    }

    public String getGender() {
        return this.gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCompanyName() {
        return this.companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAddressLine1() {
        return this.addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return this.addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getAddressLine3() {
        return this.addressLine3;
    }

    public void setAddressLine3(String addressLine3) {
        this.addressLine3 = addressLine3;
    }

    public String getCityOrTown() {
        return this.cityOrTown;
    }

    public void setCityOrTown(String cityOrTown) {
        this.cityOrTown = cityOrTown;
    }

    public String getCountyOrMuncipalOrSublocality() {
        return this.countyOrMuncipalOrSublocality;
    }

    public void setCountyOrMuncipalOrSublocality(String countyOrMuncipalOrSublocality) {
        this.countyOrMuncipalOrSublocality = countyOrMuncipalOrSublocality;
    }

    public String getStateOrProvice() {
        return this.stateOrProvice;
    }

    public void setStateOrProvice(String stateOrProvice) {
        this.stateOrProvice = stateOrProvice;
    }

    public Integer getCountryId() {
        return this.countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    public String getZipOrPostalCode() {
        return this.zipOrPostalCode;
    }

    public void setZipOrPostalCode(String zipOrPostalCode) {
        this.zipOrPostalCode = zipOrPostalCode;
    }
}
