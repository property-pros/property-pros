import { GetNotePurchaseAgreementDocResponse } from "property-pros-sdk";
import cmds from "../cmds";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";

export default {
  *getNotePurchaseAgreementDoc(): Buffer{
    const response = (yield cmds.getNotePurchaseAgreementDoc({
      DateOfBirth: "12/21/1990",
      EmailAddress: "test@test.com",
      FirstName: "fugiat",
      FundsCommitted: "378109",
      HomeAddress: "est",
      LastName: "dolor Duis",
      PhoneNumber: "in",
      SocialSecurity: "laboris elit incididunt commodo pariatur",
    })) as GetNotePurchaseAgreementDocResponse;

    return Buffer.from(response.fileContent);

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
  },
} as Partial<IPropertyProsFunctions>;
