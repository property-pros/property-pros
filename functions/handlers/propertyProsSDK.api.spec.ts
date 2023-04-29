import { Metadata } from "nice-grpc-common";
import {
  authClient,
  financeClient,
  notePurchaseAgreementDocClient
} from "./propertyProsSDK";

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

const metadata = new Metadata({ ["is-test"]: "true" });

async function shouldAuthenticate() {
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

  let userId = metadataResult.get("userId")!;

  expect(userId).not.toBeNull();

  metadata.set("userIs", userId);
}

describe("notePurchaseAgreements API integration test", function () {
  it("should saveNotePurchaseAgreement", async function () {
    await notePurchaseAgreementDocClient.saveNotePurchaseAgreement();
  });

  it("should getNotePurchaseAgreementDoc", async function () {
    const metadata = shouldAuthenticate();

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

// Test client for ../property-pros-sdk/api/finance/v1/finance.proto
describe("financial API integration test", function () {
  it("should save financial item", async function () {});

  it("should get financial items", async function () {
    const metadata = shouldAuthenticate();

    let financialItemResult = await financeClient.getFinancialItems(
      {
        payload: {},
      },
      { metadata }
    );

    expect(financialItemResult).not.toBeNull();
    expect(financialItemResult.financialItem).not.toBeNull();
    expect(financialItemResult.financialItem.id).toEqual("1");
    expect(financialItemResult.financialItem.name).toEqual("test");
    expect(financialItemResult.financialItem.type).toEqual("test");
    expect(financialItemResult.financialItem.value).toEqual(1);
  });
});
