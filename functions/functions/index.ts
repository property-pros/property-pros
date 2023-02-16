import cmds from "../cmds";
import navigation from "./navigation";
import state from "./state";
import notePurchaseAgreement from "./notePurchaseAgreement";
import auth from "./auth";
import { IPropertyProsFunctions } from "../../interface/IPropertyProsFunctions";

export default {
  ...state,
  ...navigation,
  ...notePurchaseAgreement,
  ...auth,
  *init(config: any) {
    yield cmds.initNavigation(config);
  },

} as IPropertyProsFunctions;
