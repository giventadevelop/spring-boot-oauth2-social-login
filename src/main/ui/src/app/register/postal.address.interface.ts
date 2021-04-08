export interface PostalAddress {
  addressId: number;
  gender: string;
  addressTypeId:number;
  namePrefix: string;
  firstName: string;
  lastName: string;
  nameSuffix: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  companyName: string;
  cityOrTown: string;
  countyOrMuncipalOrSublocality: string;
  stateOrProvince: string;
  zipOrPostalCode: string;
  countryId:number;
}
