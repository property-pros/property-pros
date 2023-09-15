import { Metadata } from "nice-grpc-common";
import { Alert } from "react-native";
import { IPropertyProsAuthenticatedUserState } from "../../interface/interfaces";
import cmds from "../cmds";

export default {
  *getUserDocumentsList() {
    const { isAuthenticated, authToken }: IPropertyProsAuthenticatedUserState =
      yield cmds.reduxGetState("authenticatedUser");
    if (!isAuthenticated) {
      Alert.alert("You are currently not signed in, please signin!");
      return;
    }

    const response = yield cmds.getStatements();

    console.log("statements response: ", response);

    return response;
  },
  *getStatementDoc(statementId: any) {
    const { isAuthenticated, authToken }: IPropertyProsAuthenticatedUserState =
      yield cmds.reduxGetState("authenticatedUser");
    if (!isAuthenticated) {
      Alert.alert("You are currently not signed in, please signin!");
      return;
    }

    const response = yield cmds.getStatementDoc({
      id: statementId,
    });

    return yield cmds.callFn(Buffer.from, response.document, "base64");
  },
};
