import {PostalAddress} from "./postal.address.interface";
import {PhoneNumber} from "./phone.number.interface";
import {Role} from "./role.interface";

export interface User
{
  userId?: number
  provider?: string;
  providerUserId?: string;
  displayName: string;
  email: string;
  enabled?: boolean;
  createdDate?: Date;
  modifiedDate?: Date;
  password: string;
  matchingPassword: string;
  postalAddresses : PostalAddress[];
  phoneNumbers : PhoneNumber[];
  roles : Role[];
}
