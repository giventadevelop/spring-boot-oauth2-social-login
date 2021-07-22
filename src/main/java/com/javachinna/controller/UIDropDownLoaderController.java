package com.javachinna.controller;

import com.javachinna.dto.*;
import com.javachinna.exception.UserAlreadyExistAuthenticationException;
import com.javachinna.model.User;
import com.javachinna.security.jwt.TokenProvider;
import com.javachinna.service.LocalUserDetailService;
import com.javachinna.service.RefreshTokenService;
import com.javachinna.service.UIDropDownLoaderService;
import com.javachinna.service.UserService;
import com.javachinna.util.GeneralUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.time.Instant;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class UIDropDownLoaderController {

    private UIDropDownLoaderService uiDropDownLoaderService;

    /**
     * findAllCountries
     * @return ResponseEntity<List<CountryDTO>>
     */
    @CrossOrigin
    @GetMapping("/country")
    public ResponseEntity<List<CountryDTO>> findAllCountries() throws Exception {
        List<CountryDTO> countryDTOList;
        countryDTOList = uiDropDownLoaderService.findAllCountries();
        return ResponseEntity.ok().body(countryDTOList);
    }

    /**
     * findAllAddressTypes
     * @return ResponseEntity<List<AddressTypeDTO>>
     * @throws Exception
     */
    @CrossOrigin
    @GetMapping("/address_type")
    public ResponseEntity<List<AddressTypeDTO>> findAllAddressTypes() throws Exception {
        List<AddressTypeDTO> addressTypeDTOList;
        addressTypeDTOList = uiDropDownLoaderService.findAllAddressTypes();
        return ResponseEntity.ok().body(addressTypeDTOList);
    }

    /**
     * findAllPhoneContactTypes
     * @return ResponseEntity<List<PhoneContactTypeDTO>>
     * @throws Exception
     */
    @CrossOrigin
    @GetMapping("/phone_contact_type")
    public ResponseEntity<List<PhoneContactTypeDTO>> findAllPhoneContactTypes() throws Exception {
        List<PhoneContactTypeDTO> phoneContactTypeDTOList;
        phoneContactTypeDTOList = uiDropDownLoaderService.findAllPhoneContactTypes();
        return ResponseEntity.ok().body(phoneContactTypeDTOList);
    }

}

