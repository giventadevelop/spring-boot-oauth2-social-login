<div class="card-header">Address</div>
  <div class="card-body" formArrayName="postalAddresses">

<div  *ngFor="let address of postalAddressGroupList.controls; let i = index;">

<input type="hidden"  [formControlName]="'addressId'" id="addressId" />
  </div>
  </div>
            <!-- <div class="row" >

<div class="col" >
<div class="form-group">
<label  class="form-check-inline">Choose Gender</label>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio"

name="gender"   [formControlName]="'gender'" id="male" value="male">
<label class="form-check-label" for="male">male</label>
  </div>
  <div class="form-check form-check-inline">
<input class="form-check-input" type="radio"
name="gender"  [formControlName]="'gender'" id="female" value="female">
<label class="form-check-label" for="female">female</label>
  </div>
  <div class="form-check form-check-inline">
<input class="form-check-input" type="radio"
name="gender"    [formControlName]="'gender'" id="other" value="other">
<label class="form-check-label" for="other">other</label>
  </div>

  <div class="form-check form-check-inline">
<input class="form-check-input" type="radio"
name="gender"   [formControlName]="'gender'" id="decline" value="decline">
<label class="form-check-label" for="decline">decline to verify</label>
</div>
&lt;!&ndash;<small *ngIf="regnForm.gender.errors?.required && regnForm.gender.touched" class="form-check-inline form-text custom-invalid-feedback">Pick one option.</small>&ndash;&gt;
</div>
</div>&lt;!&ndash;col&ndash;&gt;

</div> &lt;!&ndash;row&ndash;&gt;



<div class="row">
<div class="col" >
<div class="form-group">
  <label for="addressType"> Name Suffix </label>
<input type="text"
  [formControlName]="'addressTypeId'" id="addressTypeId" placeholder="Address Type">
  </div>
  </div> &lt;!&ndash;col&ndash;&gt;

  </div>  &lt;!&ndash;row&ndash;&gt;

  <div class="row">
<div class="col" >
<div class="form-group">
  <label for="namePrefix">Name Prefix</label>
<input type="text"
  [formControlName]="'namePrefix'" id="namePrefix" placeholder="Name Prefix">
  </div>
  </div> &lt;!&ndash;col&ndash;&gt;

  <div class="col" >
<div class="form-group">
  <label for="firstName">First Name </label>
<input type="text"
  [formControlName]="'firstName'" id="firstName" placeholder="First Name">
  </div>
  </div>&lt;!&ndash;col&ndash;&gt;

  <div class="col" >
<div class="form-group">
  <label for="lastName">Last Name </label>
<input type="text"
  [formControlName]="'lastName'" id="lastName" placeholder="Last Name">
  </div>
  </div>

  </div> &lt;!&ndash;row&ndash;&gt;

  <div class="row">
<div class="col" >
<div class="form-group">
  <label for="nameSuffix"> Name Suffix </label>
<input type="text"
  [formControlName]="'nameSuffix'" id="nameSuffix" placeholder="Name suffix">
  </div>
  </div> &lt;!&ndash;col&ndash;&gt;
  <div class="row">
  <div class="col" >
<div class="form-group">
  <label for="companyName"> Company name </label>
<input type="text"
  [formControlName]="'companyName'" id="companyName" placeholder="Company name">
  </div>
  </div>

  </div>

<div class="row">
<div class="col" >
<div class="form-group">
  <label for="addressLine1">Street Address</label>
<input type="text"
  [formControlName]="'addressLine1'" id="addressLine1" placeholder="Enter street address">
  </div>
  </div> &lt;!&ndash;col&ndash;&gt;

  <div class="col" >
<div class="form-group">
  <label for="addressLine2">Home / Apartment Number </label>
<input type="text"
  [formControlName]="'addressLine2'" id="addressLine2" placeholder="Address line two">
  </div>
  </div>&lt;!&ndash;col&ndash;&gt;

  </div> &lt;!&ndash;row&ndash;&gt;
   <!--row start
<div class="row">
<div class="col" >
<div class="form-group">
  <label for="addressLine3">Address Line 3</label>
<input type="text"
  [formControlName]="'addressLine3'" id="addressLine3" placeholder="Address Line 3">
  </div>
  </div> &lt;!&ndash;col&ndash;&gt;

  <div class="col" >
<div class="form-group">
  <label for="cityOrTown">City Or Town</label>
<input type="text"
  [formControlName]="'cityOrTown'" id="cityOrTown" placeholder="City Or Town">
  </div>
  </div>&lt;!&ndash;col&ndash;&gt;

  </div> &lt;!&ndash;row&ndash;&gt;

  <div class="row">
<div class="col" >
<div class="form-group">
  <label for="countyOrMuncipalOrSublocality">County Or Muncipal Or Sublocality</label>
<input type="text"
  [formControlName]="'countyOrMuncipalOrSublocality'" id="countyOrMuncipalOrSublocality" placeholder="County Or Muncipal Or Sublocality">
  </div>
  </div> &lt;!&ndash;col&ndash;&gt;

  <div class="col" >
<div class="form-group">
  <label for="stateOrProvince">Zip Or PostalCode</label>
<input type="text"
  [formControlName]="'stateOrProvince'" id="stateOrProvince" placeholder="State Or Province">
  </div>
  </div>&lt;!&ndash;col&ndash;&gt;

  </div> &lt;!&ndash;row&ndash;&gt;
  <div class="row">
<div class="col" >
<div class="form-group">
  <label for="zipOrPostalCode">County Or Muncipal Or Sublocality</label>
<input type="text"
  [formControlName]="'zipOrPostalCode'" id="zipOrPostalCode" placeholder="Zip Or Postal Code">
  </div>
  </div> &lt;!&ndash;col&ndash;&gt;

  <div class="col" >
<div class="form-group">
  <label for="country">Country</label>
  <input type="text"
  [formControlName]="'countryId'" id="country" placeholder="Country">
  </div>
  </div>&lt;!&ndash;col&ndash;&gt;

  </div> &lt;!&ndash;row&ndash;&gt;

  </div>
  </div> --> <!--card body address part end-->
