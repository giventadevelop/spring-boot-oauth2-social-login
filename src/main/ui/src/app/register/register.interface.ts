import {PostalAddress} from "./postal.address.interface";

export interface RegisterUser
{
  displayName: string;
  email: string;
  password: string;
  matchingPassword: string;
  postalAddress : PostalAddress;
}
