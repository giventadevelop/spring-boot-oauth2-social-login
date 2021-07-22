/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public dialogCaller: string,public title: string, public message: string, public loadingMessage: string,public inPutData: any ) {
  }
}
