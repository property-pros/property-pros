import { Metadata } from "nice-grpc-common";
import { Alert } from "react-native";
import { IPropertyProsAuthenticatedUserState } from "../../interface/interfaces";
import cmds from "../cmds";

export function* getUserDocumentsList() {
  const { isAuthenticated, authToken }: IPropertyProsAuthenticatedUserState =
    yield cmds.reduxGetState("authenticatedUser");
  if (!isAuthenticated) {
    Alert.alert("You are currently not signed in, please signin!");
    return;
  }

  const metadata = new Metadata();

  metadata.set("authorization", authToken);

  const response = yield cmds.getStatements(
    {
      payload: {},
    },
    {
      metadata,
    }
  );

  console.log("response: ", response);

  return response;
}
