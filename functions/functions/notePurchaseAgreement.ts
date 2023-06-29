import { notePurchaseAgreement as sdk } from "property-pros-sdk";
import { IPropertyProsAuthenticatedUserState } from "../../interface/interfaces";
import { IPropertyProsFunctions } from "../../interface/IPropertyProsFunctions";
import cmds from "../cmds";
import { Alert } from 'react-native';
import { GetNotePurchaseAgreementsResponse } from "property-pros-sdk/api/note_purchase_agreement/v1/note_purchase_agreement";
import { notePurchaseAgreementDocClient } from "../handlers/propertyProsSDK";
import { Metadata } from "nice-grpc-common";


export default {
  *getNotePurchaseAgreements(){
    console.log("here in getNotePurchaseAgreements")
    const {
      isAuthenticated,
      authToken
    }: IPropertyProsAuthenticatedUserState = yield cmds.reduxGetState("authenticatedUser");
    if (!isAuthenticated) {
      Alert.alert("You are currently not signed in, please signin!")
      return
    }
    let metadata = new Metadata({});
    metadata.set("authorization", authToken!);

    let response:GetNotePurchaseAgreementsResponse;
    try {
      response = yield cmds.callFn(notePurchaseAgreementDocClient.getNotePurchaseAgreements, 
        {},
        { metadata })
      } catch(err) {
        Alert.alert("Failed to fetch data, Please try again!")
        return
      }

      return response
  },

  *getNotePurchaseAgreementDoc(notePurchaseAgreementId: any) {
    const {
      isAuthenticated,
      authToken
    }: IPropertyProsAuthenticatedUserState = yield cmds.reduxGetState("authenticatedUser");
    if (!isAuthenticated) {
      Alert.alert("You are currently not signed in, please signin!")
      return
    }

    let metadata = new Metadata({});
    
    metadata.set("authorization", authToken!);
    const response = <sdk.GetNotePurchaseAgreementDocResponse>(
      yield cmds.callFn(notePurchaseAgreementDocClient.getNotePurchaseAgreementDoc,{
        payload: {
          id: notePurchaseAgreementId,
        },
      },
      {metadata})
    );

    return <Buffer>(
      yield cmds.callFn(Buffer.from, response.fileContent)
    );
  },
} as Partial<IPropertyProsFunctions>;

// try {
//   await StorageAccessFramework.createFileAsync(
//     permissions.directoryUri,
//     fileName,
//     "application/pdf"
//   )
//     .then(async (uri) => {
//       await FileSystem.writeAsStringAsync(uri, base64Data, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// } catch (e) {
//   throw new Error(e);
// }

// return response;
