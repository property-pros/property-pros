import { actions } from "../../state";
import { generateCmdsFromActions, redux } from "effects-as-data-redux";
import { cmds } from "effects-as-data";
import { IPropertyProsEffectCommands } from "../../interface/interfaces";
import { CommandDefinitions, MapHandlerMethods } from "../handlers";

const reduxCmds = generateCmdsFromActions(actions);
// combine and export universal cmds and the redux cmds generated above

export default {
  ...cmds,
  ...redux,
  ...MapHandlerMethods((methodName) => (payload: any) => {
    console.log("methodName: ", methodName);
    console.log("payload: ", payload);
    return {
      type: methodName,
      payload: { payload },
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
} as IPropertyProsEffectCommands;
