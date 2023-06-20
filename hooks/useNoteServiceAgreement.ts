import functions from "../functions";
import { IPropertyProsNotePurchaseAgreementFunctions } from "../interface/IPropertyProsFunctions";


export default (): IPropertyProsNotePurchaseAgreementFunctions => {

  return {
    getNotePurchaseAgreementDoc: functions.getNotePurchaseAgreementDoc,
    getNotePurchaseAgreements: functions.getNotePurchaseAgreements,
  };
};
