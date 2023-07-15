import { IPropertyProsFunctions } from "../../interface/IPropertyProsFunctions";
import cmds from "../cmds";
import auth from "./auth";
import navigation from "./navigation";
import notePurchaseAgreement from "./notePurchaseAgreement";
import state from "./state";
import statement from "./statement";

export default {
  ...state,
  ...navigation,
  ...notePurchaseAgreement,
  ...statement,
  ...auth,
  *init(config: any) {
    yield cmds.initNavigation(config);
  },

} as IPropertyProsFunctions;
