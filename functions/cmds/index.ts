import { cmds, IEffectsAsDataCommands } from "effects-as-data";
import { generateCmdsFromActions, redux } from "effects-as-data-redux";
import { IPropertyProsEffectCommands } from "../../interface/IPropertyProsEffectsCommands";
import { actions } from "../../state";
import { authClient, MapHandlerMethods, notePurchaseAgreementClient,  } from "../handlers";

const reduxCmds = generateCmdsFromActions(actions);
// combine and export universal cmds and the redux cmds generated above

const handlerMethods = MapHandlerMethods((methodName) => (payload: any, options: any) => {
    
  return {
    type: methodName,
    payload,
    options,
  };
});

export default {
  ...cmds,
  ...redux,
  ...handlerMethods,
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
} as IPropertyProsEffectCommands &  IEffectsAsDataCommands & NotePurchaseAgreementService & AuthService ;
