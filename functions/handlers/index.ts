import { Store } from "@reduxjs/toolkit";
import { interpreters } from "effects-as-data";
import { buildReduxHandlers } from "effects-as-data-redux";
import {
  MapClientMethods,
  authClient,
  notePurchaseAgreementClient,
  statementClient
} from "./propertyProsSDK";

// export a function that takes a Redux store and builds all the handers
let navigate: any = null;

// export const CommandDefinitions = typeDefinitions;
export const MapHandlerMethods = MapClientMethods;

export * from "./propertyProsSDK";

export default (store: Store) => {
  return {
    ...buildReduxHandlers(store),
    ...interpreters,
    ...authClient,
    ...notePurchaseAgreementClient,
    ...statementClient,
    initNavigation({ navigation }: any) {
      navigate = navigation;
    },
    navigate({ path = "" }) {
      navigate(path);
    },
    goBack(){
      navigate(-1);
    }
  };
};
