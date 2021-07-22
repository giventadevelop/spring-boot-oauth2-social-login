import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {User} from "../common/user.interface";
import {PhoneContactType} from "../common/phone.contact.type.interface";
import {AddressType} from "../common/address.type.interface";
import {Country} from "../common/country.interface";
import {UiDropDownLoaderService} from "../_services/ui.dropdown.loader.service";
import {UserService} from "../_services/user.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {PostalAddress} from "../common/postal.address.interface";
import {PhoneNumber} from "../common/phone.number.interface";
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {ConfirmDialogResult} from "../common/confirm.dialog.result.interface";
import {ConfirmDialogModel} from '../common/confirm.dialog.model.class';
import {Router} from '@angular/router';
import {SuccessDialogComponent} from '../success-dialog/success-dialog.component';
import {count} from 'rxjs/operators';

function phoneNumberTenDigitsValidator(c: FormControl) {
  // let PHONE_NUMBER_TEN_DIGITS_REGEXP = '^([^0-9]*[0-9]){10}.*$';
  let PHONE_NUMBER_TEN_DIGITS_REGEXP = '(\d){10}';
  let count;
  if (c.value) {
    count = (c.value.match(/\d/g) || []).length;
  }

  return count==10 ? null : {
    phoneNumberTenDigitsValidator: {
      valid: false
    }
  };
}

function phoneNumberDigitsSpaceValidator(c: FormControl) {
  // let PHONE_NUMBER_TEN_DIGITS_REGEXP = '^([^0-9]*[0-9]){10}.*$';
  // const PHONE_NUMBER_DIGITS_AND_SPACE_ONLY_VALIDATOR = ^(?.*\d)[\d ]+$;
  // let digitAndSpaceOnlyRegExp  = new RegExp('^(?=.*\\d)[\\d ]+$');
  let  digitAndSpaceOnly:boolean =true;
  let digitAndSpaceOnlyRegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (c.value) {
    // digitAndSpaceOnly = c.value.match(digitAndSpaceOnlyRegExp);
    digitAndSpaceOnly = digitAndSpaceOnlyRegExp.test(c.value);
    console.log('digitAndSpaceOnly ', digitAndSpaceOnly);
  }
  return  !digitAndSpaceOnly ? null : {
    phoneNumberDigitsSpaceValidator: {
      valid: false
    }
  };
}

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
  isUpDateUserProfile: boolean=false;
  isPrimaryPhoneNumberTrue: boolean=true;
  isPrimaryPhoneNumberFalse: boolean=false;

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
  postalAddressList: FormArray | undefined;
  phoneNumberList: FormArray | undefined;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  //postalAddress form controls

  addressId: FormControl | undefined;
  gender: FormControl | undefined;
  addressTypeId: FormControl | undefined;
  namePrefix: FormControl | undefined;
  firstName: FormControl | undefined;
  lastName: FormControl | undefined;
  nameSuffix: FormControl | undefined;
  addressLine1: FormControl | undefined;
  addressLine2: FormControl | undefined;
  addressLine3: FormControl | undefined;
  companyName: FormControl | undefined;
  cityOrTown: FormControl | undefined;
  countyOrMuncipalOrSublocality: FormControl | undefined;
  stateOrProvince: FormControl | undefined;
  zipOrPostalCode: FormControl | undefined;
  countryId: FormControl | undefined;

  // phone number controls
    phoneId               : FormControl | undefined;
    phoneContactTypeId    : FormControl | undefined;
    isPrimaryPhoneNumber  : FormControl | undefined;
    countryPrefix         : FormControl | undefined;
    countyPrefix          : FormControl | undefined;
    localLeadingZeros     : FormControl | undefined;
    localTelNumber        : FormControl | undefined;
    customLabel           : FormControl | undefined;
    primaryPhoneIndex: any=null;
    closeModal: string;
    confirmDialogResult= {} as ConfirmDialogResult;

   constructor(private formBuilder: FormBuilder,private userService: UserService, private authService: AuthService,
              private uiDropDownLoaderService: UiDropDownLoaderService,
              private token: TokenStorageService,
              private matDialog: MatDialog, private router: Router) {
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

  private loadUserDetails(currentLoggedInUser: any) {
    let userId=this.currentLoggedInUser.id;
    console.log('loadUserDetails() userId', userId);
    if(userId){
      this.isUpDateUserProfile=true;
      console.log('isUpDateUserProfile ',this.isUpDateUserProfile);
    }
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
      firstName: new FormControl(postalAddress.firstName, [Validators.required,Validators.minLength(2)]),
      lastName: new FormControl(postalAddress.lastName, [Validators.required,Validators.minLength(2)]),
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
     //   localLeadingZeros: new FormControl(phoneNumber.localLeadingZeros, [Validators.pattern(/^[0]\d*$/), Validators.maxLength(4)]),
     //  localLeadingZeros: new FormControl(phoneNumber.localLeadingZeros, [Validators.required, Validators.maxLength(4)]),
     /* localTelNumber: new FormControl(phoneNumber.localTelNumber, [Validators.required, Validators.minLength(10),
                                                  Validators.maxLength(14),Validators.pattern(/^[0-9 ]+$/)]),
   */
    /*  localTelNumber: new FormControl(phoneNumber.localTelNumber, [Validators.required, Validators.minLength(10),
        Validators.maxLength(14),Validators.pattern(/^[0-9 ]+$/),phoneNumberTenDigitsValidator]),*/
      // (?:\d+ ?){7,12}

      /*localTelNumber: new FormControl(phoneNumber.localTelNumber, [Validators.required, Validators.minLength(10),
        Validators.pattern('^(?=.*\d)[\d ]+$'),phoneNumberTenDigitsValidator]),*/
      localTelNumber: new FormControl(phoneNumber.localTelNumber, [Validators.required, Validators.minLength(10),
        phoneNumberDigitsSpaceValidator,phoneNumberTenDigitsValidator]),

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

  removePostalAddress(index: number) {
    this.postalAddressGroupList.removeAt(index);
   //  this.phoneNumberGroupList.removeAt(index);

  }

  /**
   * called from Ui to remove a phone
   * @param index
   */
  removePhoneNumber(index: number) {
    this.removePhoneConfirmDialog(index);
  }

  /**
   * called from delete dialog and calls user service
   * to delete from DB
   * @param index
   */
  deletePhoneNumber(phoneNumber: PhoneNumber,index: number) {
    this.userService.deleteUserPhone(phoneNumber.phoneId).subscribe(
      data => {
        console.log('phone data json getUserById', JSON.stringify(data));
        this.phoneNumberGroupList.removeAt(index);
      },
      err => {
        this.errorMessage = 'An unexpected error occurred loading user in loadUserDetails';
      }
    );
  }

  getPostalAddressFormGroup(index: number): FormGroup {
      return this.postalAddressList.controls[index] as FormGroup;
  }

  getPhoneNumberFormGroup(index: number): FormGroup {
    const formGroup = this.phoneNumberList.controls[index] as FormGroup;
    return formGroup;
  }

  get regnForm() {
    return this.registerForm.controls;
  }

  onSubmit(): void {

    this.user=Object.assign(this.user, this.registerForm.value);
    console.log('registerForm', this.registerForm.value);

   this.isPrimaryFix();
    if(this.user.phoneNumbers.length>0){
      if(!this.primaryPhoneIndex){
        //alert("Please choose your primary phone");
        this.triggerModal("modalData");
        return;
      }
    }

    console.log('this.user', this.user);

    console.log('user json', JSON.stringify(this.user));
    this.authService.register(this.user).subscribe(
      data => {
        console.log('reg/update return user data :', data);
        this.user=data;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // this.createForm();
        this.regnSuccessConfirmDialog();
      },
      err => {
        if (err.status === 500) {
          this.errorMessage = 'An unexpected error has occurred. Please try again';
        } else {
          if (err.error) {
            this.errorMessage = err.error.message;
        }else{
            this.errorMessage=err.message;
            console.log('Register/update user profile error ', this.errorMessage);
            this.errorMessage="An unexpected error occurred. Please try again or contact admin."
            this.isSuccessful = false;
            this.isSignUpFailed = false;
          }
        }
        this.isSignUpFailed = true;
      }
    );
  }

  /**
   * method to check if primary phone selected even when the
   * user hasn't  edited or added one
   */
   isPrimaryFix() {
     var self = this;
    let iterPhoneNumbers = this.user.phoneNumbers;

    let trueCount=0;
    iterPhoneNumbers.forEach(function (phoneNumber) {
      if (phoneNumber.isPrimaryPhoneNumber
      ) {
        trueCount=trueCount+1;
      }
 });

    if(trueCount===0){
      this.primaryPhoneIndex=null;

    }else{
      this.primaryPhoneIndex=trueCount;
    }

   // this.user.phoneNumbers=fixedPhoneNumbers;
   // return true;
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
    this.localLeadingZeros= new FormControl(this.phoneNumber.localLeadingZeros,[Validators.minLength(6)]);
    this.localTelNumber= new FormControl(this.phoneNumber.localTelNumber, [Validators.required, Validators.minLength(10),Validators.maxLength(10),phoneNumberTenDigitsValidator]);
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
    this.primaryPhoneIndex=null;
    this.isPrimaryPhoneNumberRadio=false;
    let isPrimaryPhoneId =$event.target.getAttribute('id');
    this.primaryPhoneIndex=isPrimaryPhoneId.slice(isPrimaryPhoneId.length - 1);
    console.log('isPrimaryPhoneId', isPrimaryPhoneId );
    const phoneNumbers= this.phoneNumberGroupList;

    ((this.registerForm.get('phoneNumbers') as FormArray).at(this.primaryPhoneIndex) as FormGroup).get('isPrimaryPhoneNumber').patchValue(true);
    for (let i in this.phoneNumberGroupList.controls){
      let phoneNumberCntrlId = 'isPrimaryPhoneNumber'+i ;
      if(phoneNumberCntrlId !==isPrimaryPhoneId){
        // @ts-ignore
        ((this.registerForm.get('phoneNumbers') as FormArray).at(Number(i)) as FormGroup).get('isPrimaryPhoneNumber').patchValue(false);
      }/*else{
        ((this.registerForm.get('phoneNumbers') as FormArray).at(Number(i)) as FormGroup).get('isPrimaryPhoneNumber').patchValue(true);
      }*/
    }
  }

  triggerModal(content) {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AlertDialogComponent, dialogConfig);
   }

  /**
   * remove phone dialog
   * @param index
   */
  removePhoneConfirmDialog(index:number): void {
    const message = `Do you want to delete this phone number?`;
    const dialogLoadingMessage = 'Please wait deleting' ;
    let phoneNumberToDelete = ((this.registerForm.get('phoneNumbers') as FormArray).at(Number(index)) as FormGroup).getRawValue();
    let phoneId=phoneNumberToDelete.phoneId;
    const dialogData = new ConfirmDialogModel('PhoneConfirm',"Confirm Action", message,dialogLoadingMessage,phoneId);

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      maxHeight: "300px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmDialogResult = dialogResult;
      console.log('Not deleting phone number this time ');
      if(this.confirmDialogResult){
      if(this.confirmDialogResult.confirmStatus){
        this.phoneNumberGroupList.removeAt(index);
      }
      } else{
        console.log('Not deleting phone number this time ');
      }

    });
  }

  /**
   * Registration Success Confirm Dialog
   * @param index
   */
  regnSuccessConfirmDialog(): void {
    const message = `You have successfully registered !`;
    const dialogData = new ConfirmDialogModel('registration',"Success", message," ",0);

    const dialogRef = this.matDialog.open(SuccessDialogComponent, {
      maxWidth: "600px",
      maxHeight: "500px",
      data: dialogData
    });

    setTimeout(() => {
      dialogRef.close();
    }, 5000) ;
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmDialogResult = dialogResult;
      console.log('Not deleting phone number this time ');
      this.router.navigateByUrl('/web-home');
    });
  }

  callValidateAllFormFields(event: any) {
    console.log('callValidateAllFormFields called ');
        this.validateAllFormFields(this.registerForm);
      }


  /**
   * https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/#trigger-validation-of-all-fields-on-submit
   * @param formGroup
   */
  validateAllFormFields(formGroup: FormGroup) {
    let dropdownFields = ['phoneContactTypeId', 'addressTypeId', 'countryId'];
    formGroup.markAllAsTouched();//{1}
    // formGroup.markAllAsD();
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {
        console.log('key' , control);//{4}
        // check for drop down fields and mark them invalid
        if(dropdownFields.includes(field)){
          control.markAsDirty();
          console.log('marked dirty' , field );//{4}
        }
        control.markAsTouched();
        // control.reset();
        // control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      } else if (control instanceof FormArray) {
        Object.keys(control.controls).forEach(field => {
          const formArrayFormGroup = control.get(field);
          if (formArrayFormGroup instanceof FormGroup){
            this.validateAllFormFields(formArrayFormGroup);
        }
        });
               //{6}
    }
    });
  }

  getFormValidationErrors() {

    console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

    let totalErrors = 0;

    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
      if (controlErrors != null) {
        totalErrors++;
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });

    console.log('Number of errors: ' ,totalErrors);
  }

  calculateClasses() {
    return {
      'form-control': true,
      shortenedSelect: true,
      'ng-invalid': false,
      'is-invalid': false,
      'ng-pristine': true,
      'ng-touched': false

    };
  }

  ngAfterViewInit(): void{
    // this.registerForm.reset();
    /*const control = this.registerForm.controls['addressTypeId'];
    control.markAsPristine();
    control.markAsUntouched();*/
    /*this.postalAddressGroupList.at(0).markAsPristine();
    console.log('control type valid' ,  this.postalAddressGroupList.at(0).valid);
    // this.postalAddressGroupList.at(0).reset();
    // this.postalAddressGroupList.at(0).get('addressTypeId').setErrors(null);
    this.postalAddressGroupList.at(0).get('addressTypeId').markAsPristine();
    this.postalAddressGroupList.at(0).get('addressTypeId').markAsUntouched();
    this.postalAddressGroupList.at(0).get('addressTypeId').clearValidators();
    this.postalAddressGroupList.at(0).get('addressTypeId').clearAsyncValidators();
    this.postalAddressGroupList.at(0).get('addressTypeId').updateValueAndValidity()
    // this.postalAddressGroupList.at(0).get('addressTypeId').setErrors(null);
    var element = document.getElementById('addressTypeId0');*/
   /* element. classList. add('class-1');
    element. classList. add('class-2', 'class-3');*/
    // this.postalAddressGroupList.at(0).get('addressTypeId').classList.remove('ng-invalid');
   /* element.classList.remove('ng-invalid');
    element.classList.remove('is-invalid');*/
    // document.querySelector('$0').classList.remove('ng-invalid');
    // $0.classList.remove('is-invalid');
    // console.log('control type valid' ,  this.postalAddressGroupList.at(0)reset());
    // this.validateAllFormFields(this.registerForm);
    // this.addressTypeId.reset();
    // document.getElementById('addressTypeId').;
    /*
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.controls[this.registerForm.postalAddresses.addressTypeId];
      // control.setErrors(null);
      console.log('key' , key);
    });*/

  }

}
