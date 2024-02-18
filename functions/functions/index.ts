import { IPropertyProsFunctions } from "../../interface/IPropertyProsFunctions";
import cmds from "../cmds";
import auth from "./auth";
import finance from "./finance";
import documents from "./documents";
import navigation from "./navigation";
import notePurchaseAgreement from "./notePurchaseAgreement";
import state from "./state";

export default {
  ...state,
  ...navigation,
  ...notePurchaseAgreement,
  ...finance,
  ...documents,
  ...auth,
  *init(config: any) {
    yield cmds.initNavigation(config);
  },
} as IPropertyProsFunctions;
