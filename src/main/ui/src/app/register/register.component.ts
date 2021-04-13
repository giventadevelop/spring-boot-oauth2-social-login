import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../common/user.interface";
import {PhoneContactType} from "../common/phone.contact.type.interface";
import {AddressType} from "../common/address.type.interface";
import {Country} from "../common/country.interface";
import {UiDropDownLoaderService} from "../_services/ui.dropdown.loader.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser = {} as User;
  addressTypes: AddressType[];
  countries: Country[];
  phoneContactTypes: PhoneContactType [];

  registerForm: FormGroup;
  postalAddressList: FormArray;
  phoneNumberList: FormArray;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private uiDropDownLoaderService: UiDropDownLoaderService) {
  }

  ngOnInit(): void {


    this.loadDropDownLists();

    this.registerForm = this.formBuilder.group({
      displayName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      matchingPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      postalAddresses: this.formBuilder.array([this.createPostalAddress()]),
      phoneNumbers: this.formBuilder.array([this.createPhoneNumber()])

    });

    this.phoneNumberList = this.registerForm.get('phoneNumbers') as FormArray;
    this.postalAddressList = this.registerForm.get('postalAddresses') as FormArray;

  }

  private loadDropDownLists() {
    // load addressTypes
    this.uiDropDownLoaderService.getAddressTypes().subscribe(
      data => {
        this.addressTypes = data;
      },
      err => {
        this.errorMessage = 'An unexpected error occurred loading addressTypes list';
      }
    );

    // load countries list
    this.uiDropDownLoaderService.getCountries().subscribe(
      data => {
        this.countries = data;
      },
      err => {
        this.errorMessage = 'An unexpected error occurred loading addressTypes list';
      }
    );

    // load phoneContactTypes list
    this.uiDropDownLoaderService.getPhoneContactTypes().subscribe(
      data => {
        this.phoneContactTypes = data;
      },
      err => {
        this.errorMessage = 'An unexpected error occurred loading addressTypes list';
      }
    );

  }

  createPostalAddress(): FormGroup {

    return this.formBuilder.group({
      addressId: new FormControl(''),
      gender: new FormControl(''),
      addressTypeId: new FormControl(''),
      namePrefix: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      nameSuffix: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      addressLine3: new FormControl(''),
      companyName: new FormControl(''),
      cityOrTown: new FormControl(''),
      countyOrMuncipalOrSublocality: new FormControl(''),
      stateOrProvince: new FormControl(''),
      zipOrPostalCode: new FormControl(''),
      countryId: new FormControl('')
    });
  }

  createPhoneNumber(): FormGroup {

    return this.formBuilder.group({
      phoneId: new FormControl(''),
      phoneContactTypeId: new FormControl('', [Validators.required]),
      isPrimaryPhoneNumber: new FormControl(''),
      countryPrefix: new FormControl(''),
      countyPrefix: new FormControl(''),
      localLeadingZeros: new FormControl(''),
      localTelNumber: new FormControl('', [Validators.required, Validators.minLength(6)]),
      customLabel: new FormControl(''),
      userId: new FormControl('')
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
    this.postalAddressList.push(this.createPostalAddress());
  }

  addPhoneNumber() {
    this.phoneNumberList.push(this.createPhoneNumber());
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

    this.registerUser = Object.assign(this.registerUser, this.registerForm.value);

    console.log('registerForm', this.registerForm.value);
    console.log('this.registerUser', this.registerUser);
    console.log('registerUser json', JSON.stringify(this.registerUser));
    this.authService.register(this.registerUser).subscribe(
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
}
