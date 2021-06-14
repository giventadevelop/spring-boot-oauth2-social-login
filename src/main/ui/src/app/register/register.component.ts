import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../common/user.interface";
import {PhoneContactType} from "../common/phone.contact.type.interface";
import {AddressType} from "../common/address.type.interface";
import {Country} from "../common/country.interface";
import {UiDropDownLoaderService} from "../_services/ui.dropdown.loader.service";
import {UserService} from "../_services/user.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {PostalAddress} from "../common/postal.address.interface";
import {PhoneNumber} from "../common/phone.number.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isPrimaryPhoneNumberRadio: any = false;
  isAddressTypesLoaded: boolean;
  isPhoneContactTypesLoaded: boolean;
  isCountriesLoaded: boolean;
  isUserDetailsLoaded: boolean;
  isFormLoaded: boolean;

  //user general form controls
  userId: FormControl
  provider: FormControl;
  providerUserId: FormControl;
  displayName: FormControl;
  email: FormControl;
  enabled: boolean;
  createdDate: Date;
  modifiedDate: Date;
  password: FormControl;
  matchingPassword: FormControl;
  user = {} as User;
  postalAddress = {} as PostalAddress;
  phoneNumber = {} as PhoneNumber;
  currentLoggedInUser: any;
  addressTypes: AddressType[];
  countries: Country[];
  phoneContactTypes: PhoneContactType [];
  registerForm: FormGroup;
  postalAddressList: FormArray;
  phoneNumberList: FormArray;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  //postalAddress form controls

  addressId:  FormControl;
  gender:  FormControl;
  addressTypeId:  FormControl;
  namePrefix:  FormControl;
  firstName:  FormControl;
  lastName:  FormControl;
  nameSuffix:  FormControl;
  addressLine1:  FormControl;
  addressLine2:  FormControl;
  addressLine3:  FormControl;
  companyName:  FormControl;
  cityOrTown:  FormControl;
  countyOrMuncipalOrSublocality:  FormControl;
  stateOrProvince:  FormControl;
  zipOrPostalCode:  FormControl;
  countryId:  FormControl;

  // phone number controls
    phoneId               :FormControl;
    phoneContactTypeId    :FormControl;
    isPrimaryPhoneNumber  :FormControl;
    countryPrefix         :FormControl;
    countyPrefix          :FormControl;
    localLeadingZeros     :FormControl;
    localTelNumber        :FormControl;
    customLabel           :FormControl;
   primaryPhoneIndex: any=null;


  constructor(private formBuilder: FormBuilder,private userService: UserService, private authService: AuthService,
              private uiDropDownLoaderService: UiDropDownLoaderService,
              private token: TokenStorageService) {
  }

  ngOnInit(): void {

    this.isAddressTypesLoaded=false;
    this.isPhoneContactTypesLoaded=false;
    this.isCountriesLoaded=false;
    this.isUserDetailsLoaded=false;
    this.isFormLoaded=false;
    this.currentLoggedInUser = this.token.getUser();
    //on update profile  load currentLoggedInUser Details
    if(this.currentLoggedInUser){
     this.loadDropDownLists();
     this.loadUserDetails(this.currentLoggedInUser);
    }else{
      this.isUserDetailsLoaded=true;
      this.loadDropDownLists();
      this.createForm();
    }
  }

  private createForm() {
    //init form controls
    this.userId = new FormControl(this.user.userId);
    /*provider: FormControl;
    providerUserId: FormControl;*/
    this.displayName = new FormControl(this.user.displayName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    this.email = new FormControl(this.user.email, [Validators.required, Validators.email]);
    /* enabled: boolean;
     createdDate: Date;
     modifiedDate: Date;*/
    this.password = new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]);
    this.matchingPassword = new FormControl(this.user.matchingPassword, [Validators.required, Validators.minLength(6)]);

   // this.createPostalAddressControls();
    this.registerForm = this.formBuilder.group({
      displayName: this.displayName,
      email: this.email,
      password: this.password,
      matchingPassword: this.matchingPassword,
      postalAddresses: this.formBuilder.array([this.createPostalAddress(this.postalAddress)]),
      phoneNumbers: this.formBuilder.array([this.createPhoneNumber(this.phoneNumber)])
    });

    // this.registerForm = this.formBuilder.group(this.user);
    this.phoneNumberList = this.registerForm.get('phoneNumbers') as FormArray;
    this.postalAddressList = this.registerForm.get('postalAddresses') as FormArray;
    // setting the array controls to pre populate with values..
    if(this.currentLoggedInUser) {
     this.setPostalAddressInit();
     this.setPhoneNumberInit();
      this.registerForm.setControl('postalAddresses', this.setPostalAddresses(this.user.postalAddresses));
      this.registerForm.setControl('phoneNumbers', this.setPhoneNumbers(this.user.phoneNumbers));
     }

  }

  private createPostalAddressControls() {

   this.addressId = new FormControl(this.postalAddress.addressId);
   this.gender = new FormControl(this.postalAddress.gender);
   this.addressTypeId = new FormControl(this.postalAddress.addressTypeId, [Validators.required]);
   this.namePrefix = new FormControl(this.postalAddress.namePrefix);
   this.firstName = new FormControl(this.postalAddress.firstName);
   this.lastName = new FormControl(this.postalAddress.lastName);
   this.nameSuffix = new FormControl(this.postalAddress.nameSuffix);
   this.addressLine1 = new FormControl(this.postalAddress.addressLine1);
   this.addressLine2 = new FormControl(this.postalAddress.addressLine2);
   this.addressLine3 = new FormControl(this.postalAddress.addressLine3);
   this.companyName = new FormControl(this.postalAddress.companyName);
   this.cityOrTown = new FormControl(this.postalAddress.cityOrTown);
   this.countyOrMuncipalOrSublocality = new FormControl(this.postalAddress.countyOrMuncipalOrSublocality);
   this.stateOrProvince = new FormControl(this.postalAddress.stateOrProvince);
   this.zipOrPostalCode = new FormControl(this.postalAddress.zipOrPostalCode);
   this.countryId = new FormControl(this.postalAddress.countryId);

  }
  private loadUserDetails(currentLoggedInUser: any) {
    let userId=this.currentLoggedInUser.id;
    this.userService.getUserById(userId).subscribe(
      data => {
        this.user = data;
        console.log('user data json getUserById', JSON.stringify(data));
        console.log('user json getUserById', JSON.stringify(this.user));
        this.isUserDetailsLoaded = true;
        if (this.isAddressTypesLoaded===true && this.isPhoneContactTypesLoaded===true  && this.isCountriesLoaded===true  && this.isUserDetailsLoaded===true ) {
          this.createForm();
          this.isFormLoaded = true;
        }
      },
      err => {
        this.errorMessage = 'An unexpected error occurred loading user in loadUserDetails';
      }
    );
  }
  private loadDropDownLists() {
    // load addressTypes
    this.uiDropDownLoaderService.getAddressTypes().subscribe(
      data => {
        this.addressTypes = data;
        this.isAddressTypesLoaded=true;
        if (this.isAddressTypesLoaded===true && this.isPhoneContactTypesLoaded===true  && this.isCountriesLoaded===true  && this.isUserDetailsLoaded===true ) {
          this.createForm();
          this.isFormLoaded = true;
        }
      },
      err => {
        this.errorMessage = 'An unexpected error occurred loading addressTypes list';
      }
    );
    // load countries list
    this.uiDropDownLoaderService.getCountries().subscribe(
      data => {
        this.countries = data;
        this.isCountriesLoaded = true;
        if (this.isAddressTypesLoaded===true && this.isPhoneContactTypesLoaded===true  && this.isCountriesLoaded===true  && this.isUserDetailsLoaded===true ) {
          this.createForm();
          this.isFormLoaded = true;
        }
      },
      err => {
        this.errorMessage = 'An unexpected error occurred loading addressTypes list';
      }
    );

    // load phoneContactTypes list
    this.uiDropDownLoaderService.getPhoneContactTypes().subscribe(
      data => {
        this.phoneContactTypes = data;
        this.isPhoneContactTypesLoaded=true;
        if (this.isAddressTypesLoaded===true && this.isPhoneContactTypesLoaded===true  && this.isCountriesLoaded===true  && this.isUserDetailsLoaded===true ) {
          this.createForm();
          this.isFormLoaded = true;
        }
      },
      err => {
        this.errorMessage = 'An unexpected error occurred loading addressTypes list';
      }
    );
  }

  createPostalAddress(postalAddress: PostalAddress): FormGroup {

    return this.formBuilder.group({
      addressId: postalAddress.addressId,
      gender: postalAddress.gender,
      addressTypeId: new FormControl(postalAddress.addressTypeId, [Validators.required]),
      namePrefix: postalAddress.namePrefix,
      firstName: new FormControl(postalAddress.firstName, [Validators.required]),
      lastName: new FormControl(postalAddress.lastName, [Validators.required]),
      nameSuffix: postalAddress.nameSuffix,
      addressLine1: new FormControl(postalAddress.addressLine1, [Validators.required]),
      addressLine2: postalAddress.addressLine2,
      addressLine3: postalAddress.addressLine3,
      companyName: postalAddress.companyName,
      cityOrTown: new FormControl(postalAddress.cityOrTown, [Validators.required]),
      countyOrMuncipalOrSublocality: postalAddress.countyOrMuncipalOrSublocality,
      stateOrProvince: new FormControl(postalAddress.stateOrProvince, [Validators.required]),
      zipOrPostalCode: postalAddress.zipOrPostalCode,
      countryId: new FormControl(postalAddress.countryId, [Validators.required])
    });
  }

  setPostalAddresses(postalAddresses: PostalAddress[]): FormArray {
    const formArray = new FormArray([]);
    postalAddresses.forEach(postalAddress => {
      formArray.push(this.createPostalAddress(postalAddress));
    });
    return formArray;
  }

  setPhoneNumbers(phoneNumbers: PhoneNumber[]): FormArray {
    const formArray = new FormArray([]);
    phoneNumbers.forEach(phoneNumber => {
      formArray.push(this.createPhoneNumber(phoneNumber));
    });
    return formArray;
  }

  createPhoneNumber(phoneNumber: PhoneNumber): FormGroup {

    return this.formBuilder.group({
      phoneId: phoneNumber.phoneId,
      phoneContactTypeId:  new FormControl(phoneNumber.phoneContactTypeId, [Validators.required]),
     // isPrimaryPhoneNumber: new FormControl(phoneNumber.isPrimaryPhoneNumber, [Validators.required]),
      isPrimaryPhoneNumber: phoneNumber.isPrimaryPhoneNumber,
      countryPrefix: phoneNumber.countryPrefix,
      countyPrefix: phoneNumber.countyPrefix,
      localLeadingZeros: phoneNumber.localLeadingZeros,
      localTelNumber: new FormControl(phoneNumber.localTelNumber, [Validators.required, Validators.minLength(6)]),
      customLabel: phoneNumber.customLabel,
      userId: phoneNumber.userId
    });
  }

  get postalAddressGroupList() {
    // return this.phoneNumberList;
    return this.registerForm.get('postalAddresses') as FormArray;
  }
  // returns all form groups under phoneNumbers
  get phoneNumberGroupList() {
    // return this.phoneNumberList;
    return this.registerForm.get('phoneNumbers') as FormArray;
  }
  addPostalAddress() {
    this.postalAddressGroupList.push(this.createPostalAddress(this.postalAddress));
  }
  addPhoneNumber() {
    this.phoneNumberGroupList.push(this.createPhoneNumber(this.phoneNumber));
   // this.phoneNumberList.push(this.createPhoneNumber(this.phoneNumber));
  }

  removePostalAddress(index) {
    this.postalAddressList.removeAt(index);
  }

  removePhoneNumber(index) {
    this.phoneNumberList.removeAt(index);
  }

  getPostalAddressFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    return this.postalAddressList.controls[index] as FormGroup;
  }

  getPhoneNumberFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.phoneNumberList.controls[index] as FormGroup;
    return formGroup;
  }

  get regnForm() {
    return this.registerForm.controls;
  }

  onSubmit(): void {

    this.user=Object.assign(this.user, this.registerForm.value);
    console.log('registerForm', this.registerForm.value);
    if(!this.primaryPhoneIndex){
      alert("Please choose your primary phone");
      return;
    }
    if(!this.isPrimaryFix()){
      return;
    }
    console.log('this.user', this.user);

    console.log('user json', JSON.stringify(this.user));
    this.authService.register(this.user).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        if (err.status === 500) {
          this.errorMessage = 'An unexpected error has occurred. Please try again';
        } else {
          this.errorMessage = err.error.message;
        }
        this.isSignUpFailed = true;
      }
    );
  }

   isPrimaryFix():boolean {
     var self = this;
    let iterPhoneNumbers = this.user.phoneNumbers;
    const fixedPhoneNumbers : PhoneNumber[]=[];
    //let fixedPhoneNumbers = array<PhoneNumber>[];
    let trueCount=0;
    iterPhoneNumbers.forEach(function (phoneNumber) {
      //if (typeof phoneNumber.isPrimaryPhoneNumber==="undefined" || phoneNumber.isPrimaryPhoneNumber) {
      if (trueCount===     self.primaryPhoneIndex
      ) {
       // this.primaryPhoneIndex
        // someglobal is now safe to use
        phoneNumber.isPrimaryPhoneNumber=true;
      }else{
        phoneNumber.isPrimaryPhoneNumber=false;
      }

      fixedPhoneNumbers.push(phoneNumber);
      trueCount=trueCount+1;
      console.log(phoneNumber);
    });

  /*  fixedPhoneNumbers.forEach(function (phoneNumber) {
      if(phoneNumber.isPrimaryPhoneNumber){
        trueCount=trueCount+1;
      }
    });

    if(trueCount===0){
      alert("Please choose your primary phone");
      return false;
    }*/

    this.user.phoneNumbers=fixedPhoneNumbers;
    return true;
  }

  private setPostalAddressInit() {

    this.addressId= new FormControl(this.postalAddress.addressId);
    this.gender= new FormControl(this.postalAddress.gender);
    this.addressTypeId= new FormControl(this.postalAddress.addressTypeId);
    this.namePrefix= new FormControl(this.postalAddress.namePrefix);
    this.firstName= new FormControl(this.postalAddress.firstName);
    this.lastName= new FormControl(this.postalAddress.lastName);
    this.nameSuffix= new FormControl(this.postalAddress.nameSuffix);
    this.addressLine1= new FormControl(this.postalAddress.addressLine1);
    this.addressLine2= new FormControl(this.postalAddress.addressLine2);
    this.addressLine3= new FormControl(this.postalAddress.addressLine3);
    this.companyName= new FormControl(this.postalAddress.companyName);
    this.cityOrTown= new FormControl(this.postalAddress.cityOrTown);
    this.countyOrMuncipalOrSublocality= new FormControl(this.postalAddress.countyOrMuncipalOrSublocality);
    this.stateOrProvince= new FormControl(this.postalAddress.stateOrProvince);
    this.zipOrPostalCode= new FormControl(this.postalAddress.zipOrPostalCode);
    this.countryId= new FormControl(this.postalAddress.countryId);
  }

  private setPhoneNumberInit() {
    this.addressId = new FormControl(this.postalAddress.addressId);
    this.gender = new FormControl(this.postalAddress.gender);
    this.phoneId= new FormControl(this.phoneNumber.phoneId);
    this.phoneContactTypeId= new FormControl(this.phoneContactTypeId, [Validators.required]);
    this.isPrimaryPhoneNumber= new FormControl(this.phoneNumber.isPrimaryPhoneNumber);
    this.countryPrefix= new FormControl(this.phoneNumber.countryPrefix);
    this.countyPrefix= new FormControl(this.phoneNumber.countyPrefix);
    this.localLeadingZeros= new FormControl(this.phoneNumber.localLeadingZeros);
    this.localTelNumber= new FormControl(this.phoneNumber.localTelNumber, [Validators.required, Validators.minLength(6)]);
    this.customLabel= new FormControl(this.phoneNumber.customLabel);
    this.userId= new FormControl(this.phoneNumber.userId);
  }

  /**
   * method to handle the primary phone radio button scenario
   * where  other phones radio buttons reset
   * TODO to chamge to actual angular code for form control change with below .checked errors.
   * @param $event
   */
  onPrimaryPhoneChange($event: any) {
    this.isPrimaryPhoneNumberRadio=false;
    let isPrimaryPhoneId =$event.target.getAttribute('id');
    this.primaryPhoneIndex=isPrimaryPhoneId.slice(isPrimaryPhoneId.length - 1);
     console.log('isPrimaryPhoneId', isPrimaryPhoneId );
    const phoneNumbers= this.phoneNumberGroupList;
    for (let i in this.phoneNumberGroupList.controls){
      let phoneNumberCntrlId = 'isPrimaryPhoneNumber'+i ;
      if(phoneNumberCntrlId !==isPrimaryPhoneId){
        ((this.registerForm.get('phoneNumbers') as FormArray).at(Number(i)) as FormGroup).get('isPrimaryPhoneNumber').patchValue(false);
      }
    }
  }
}
