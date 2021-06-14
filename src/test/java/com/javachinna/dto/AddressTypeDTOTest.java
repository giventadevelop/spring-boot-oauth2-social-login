package com.javachinna.dto;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AddressTypeDTOTest {


    private AddressTypeDTO addressTypeDTO;
    private AddressTypeDTO addressTypeDTOInit;

    @BeforeAll
    void setUp() {
        addressTypeDTO=new AddressTypeDTO();
        addressTypeDTO.setAddressTypeId(1);
        addressTypeDTO.setAddressType("Business");
        addressTypeDTOInit=new AddressTypeDTO(1,"Business");
    }

    @Test
    void getAddressTypeId() {
        assertEquals(1, addressTypeDTO.getAddressTypeId());
    }

    @Test
    void getAddressType() {
        assertEquals(1, addressTypeDTO.getAddressTypeId());
    }

    @Test
    void testEquals() {
        assertEquals(addressTypeDTO, addressTypeDTO);
    }

    @Test
    void canEqual() {
    }

    @Test
    void testHashCode() {
        assertNotNull(Integer.valueOf(addressTypeDTO.hashCode()));
    }

    @Test
    void testToString() {
       assertNotNull(addressTypeDTO.toString());
    }

    @Test
    void setAddressTypeId() {
        assertEquals(1, addressTypeDTO.getAddressTypeId());
    }

    @Test
    void setAddressType() {
        addressTypeDTO.setAddressType("Business");
        assertEquals("Business", addressTypeDTO.getAddressType());
    }
}
