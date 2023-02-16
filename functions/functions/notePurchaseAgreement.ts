import { notePurchaseAgreement as sdk } from "property-pros-sdk";
import { IPropertyProsFunctions } from "../../interface/IPropertyProsFunctions";
import cmds from "../cmds";

export default {
  *getNotePurchaseAgreementDoc(notePurchaseAgreementPayload: any): Generator<
    Generator<never, sdk.GetNotePurchaseAgreementDocResponse | Buffer, unknown>,
    Buffer,
    Buffer | sdk.GetNotePurchaseAgreementDocResponse
  > {
    const response = <sdk.GetNotePurchaseAgreementDocResponse>(
      yield cmds.getNotePurchaseAgreementDoc({
        payload: {
          DateOfBirth: "12/21/1990",
          EmailAddress: "test@test.com",
          FirstName: "fugiat",
          FundsCommitted: 378109,
          HomeAddress: "est",
          LastName: "dolor Duis",
          PhoneNumber: "in",
          SocialSecurity: "laboris elit incididunt commodo pariatur",
        },
      })
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
