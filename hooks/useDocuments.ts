import functions from "../functions";
import { IPropertyProsDocumentFunctions } from "../interface/IPropertyProsFunctions";


export default (): Partial<IPropertyProsDocumentFunctions> => {

  return {
    getUserDocumentsList: functions.getUserDocumentsList,
    getStatementDoc: functions.getStatementDoc
  };
};