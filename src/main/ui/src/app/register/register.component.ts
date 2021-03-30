import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl , FormControl}  from '@angular/forms';
import {RegisterUser} from "./register.interface";




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser = {} as RegisterUser;
  registerForm : FormGroup;

 // reactiveForm: FormGroup;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';



  constructor(private formBuilder: FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      displayName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      matchingPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    /*this.reactiveForm = this.formBuilder.group({
      /!*firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, Validators.required]*!/
     /!* address: this.formBuilder.group({
        addressType: [null, Validators.required],
        expiryDate: [null, this.expiryDateValidator],
        streetAddress: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, [Validators.required, Validators.pattern('^[0-9]{5}$')]]
      })*!/
      displayName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required,Validators.minLength(6)]],
      matchingPassword: [null, [Validators.required,Validators.minLength(6)]
      ]
    });*/
  }

  get regnForm(){
    return this.registerForm.controls;
  }
  onSubmit(): void {

   // this.registerUser=this.registerForm.value;

    this.registerUser = Object.assign(this.registerUser, this.registerForm.value);

    console.log('registerForm', this.registerForm.value );
    console.log('this.registerUser', this.registerUser );
    this.authService.register(this.registerUser).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        if(err.status===500){
          this.errorMessage= 'An unexpected error has occurred. Please try again';
        }else{
          this.errorMessage = err.error.message;
        }

        this.isSignUpFailed = true;
      }
    );
  }

}
