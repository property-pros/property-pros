import { args, testFn } from "effects-as-data/test";
import cmds from "../cmds";
import fns from "./notePurchaseAgreement";

const testGetNotePurchaseAgreementDoc = testFn(fns.getNotePurchaseAgreementDoc);

test(
  "getNotePurchaseAgreementDoc() should return a list of random users",
  testGetNotePurchaseAgreementDoc(() => {

    const response = {
      fileContent: "test"
    };

    return args()
      .cmd(cmds.getNotePurchaseAgreementDoc({
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
      })) // yield cmd
      .result(response) // const result = yield ...
      .cmd(cmds.callFn(Buffer.from, response.fileContent))
      .returns(null);
  })
);