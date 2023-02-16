import { Metadata } from "nice-grpc-common";
import { authClient, notePurchaseAgreementDocClient } from "./propertyProsSDK";

const testSignupValues = {
  signUpAddress: "40942 Belleray Ave Murrieta CA 92562",
  signUpEmail: "propertyprosdemo@gmail.com",
  signUpLegalCellPhone: "9512493842",
  signUpLegalFirstName: "John",
  signUpLegalLastName: "Doe",
  signUpLegalSocialSecurityNumber: "123456789",
  signUpPassword: "test",
  signUpSignature: true,
  signUpTaxFilingStatus: "Single",
};

describe("notePurchaseAgreements API integration test", function () {
  it("should saveNotePurchaseAgreement", async function() {
    await notePurchaseAgreementDocClient.saveNotePurchaseAgreement()
  });

  it("should getNotePurchaseAgreementDoc", async function () {
    const metadata = new Metadata({ ["is-test"]: "true" });

    let metadataResult: Metadata = new Metadata();

    const authResult = await authClient.authenticateUser(
      { payload: { emailAddress: "test@test.com", password: "test" } },
      {
        metadata,
        onHeader(header) {
          metadataResult = header;
        },
      }
    );

    expect(authResult).not.toBeNull();
    expect(authResult.authenticated).toBe(true);
    expect(authResult.errorMessage).toBe("");

    expect(metadataResult).not.toBeNull();

    let authtoken = metadataResult.get("authorization")!;

    expect(authtoken).toEqual("Basic Eg10ZXN0QHRlc3QuY29tGgR0ZXN0");

    metadata.set("authorization", authtoken);

    let agreementDocResult =
      await notePurchaseAgreementDocClient.getNotePurchaseAgreementDoc(
        {
          payload: {},
        },
        { metadata }
      );

    expect(agreementDocResult.fileContent).not.toBeNull();
    expect(agreementDocResult.fileContent.length).toBeGreaterThan(0);
  });
});
