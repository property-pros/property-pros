import { IEffectsAsDataCommands } from "effects-as-data";
import { NavigateFunction } from "react-router-native";
import { NotePurchaseAgreementClient } from "../functions/handlers";

interface IPropertyProsEffectCommands extends IEffectsAsDataCommands, NotePurchaseAgreementClient{
  call(fn: Function, ...args: any[]): Generator;
  reduxGetState(statePath?: string): Generator<unknown, EffectCommand, unknown>;
  state: {
    navigate(path: string): EffectCommand;
  };
  navigate(path: string): EffectCommand;
  initNavigation(config: IPropertyProsFunctionsInitConfig): void;
}

interface EffectCommand {
  type: "callFn";
  fn: Function;
  args: []; // the arguments passed to get
}

interface IPropertyProsFunctionsInitConfig {
  navigation: NavigateFunction;
}
