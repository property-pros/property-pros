import { cmds, IEffectsAsDataCommands } from "effects-as-data";
import { generateCmdsFromActions, redux } from "effects-as-data-redux";
import { IPropertyProsEffectCommands } from "../../interface/IPropertyProsEffectsCommands";
import { actions } from "../../state";
import { MapHandlerMethods, NotePurchaseAgreementClient } from "../handlers";

const reduxCmds = generateCmdsFromActions(actions);
// combine and export universal cmds and the redux cmds generated above

export default {
  ...cmds,
  ...redux,
  ...MapHandlerMethods((methodName) => (payload: any) => {
    
    return {
      type: methodName,
      payload: payload,
    };
  }),
  state: reduxCmds,
  initNavigation(config: any) {
    return { type: "initNavigation", ...config };
  },
  navigate(path: string) {
    return {
      type: "navigate",
      path,
    };
  },
} as IPropertyProsEffectCommands &  IEffectsAsDataCommands & NotePurchaseAgreementClient ;
