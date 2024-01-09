import { notePurchaseAgreement as sdk } from "property-pros-sdk";
import { IPropertyProsAuthenticatedUserState } from "../../interface/interfaces";
import { IPropertyProsFunctions } from "../../interface/IPropertyProsFunctions";
import cmds from "../cmds";
import { Alert } from "react-native";
import { GetNotePurchaseAgreementsResponse } from "property-pros-sdk/api/note_purchase_agreement/v1/note_purchase_agreement";
import { notePurchaseAgreementClient } from "../handlers/propertyProsSDK";
import { Metadata } from "nice-grpc-common";
import { routes } from "../../constants";
import { UnauthenticatedError } from "../../errors";

export default {
  *getNotePurchaseAgreements() {
    console.log("here in getNotePurchaseAgreements");
    const { isAuthenticated, authToken }: IPropertyProsAuthenticatedUserState =
      yield cmds.reduxGetState("authenticatedUser");
    if (!isAuthenticated) {
      yield cmds.navigate(routes.DASHBOARD_ROUTE);
      throw new UnauthenticatedError();
    }

    let response: GetNotePurchaseAgreementsResponse;
    try {
      response = yield cmds.callFn(
        notePurchaseAgreementClient.getNotePurchaseAgreements,
        {},
      );
    } catch (err) {
      return;
    }

    return response;
  },

  *getNotePurchaseAgreementDoc(notePurchaseAgreementId: any) {
    const { isAuthenticated, authToken }: IPropertyProsAuthenticatedUserState =
      yield cmds.reduxGetState("authenticatedUser");
    if (!isAuthenticated) {
      Alert.alert("You are currently not signed in, please signin!");
      return;
    }

    console.log("fns: ", Object.keys(notePurchaseAgreementClient));
    console.log("notePurchaseAgreementClient.streamNotePurchaseAgreementDoc: ", notePurchaseAgreementClient.streamNotePurchaseAgreementDoc);

    const response = yield cmds.callFn(
      notePurchaseAgreementClient.streamNotePurchaseAgreementDoc,
      {
        payload: {
          id: notePurchaseAgreementId,
        }
      }
    );

    return yield cmds.callFn(Buffer.from, response.fileContent, "base64");
  },
} as Partial<IPropertyProsFunctions>;