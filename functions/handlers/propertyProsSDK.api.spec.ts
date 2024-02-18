import { Metadata } from "nice-grpc-common";
import {
  GetNotePurchaseAgreementsResponse,
  SaveNotePurchaseAgreementResponse,
} from "property-pros-sdk/api/note_purchase_agreement/v1/note_purchase_agreement";
import { authClient, notePurchaseAgreementDocClient } from "./propertyProsSDK";

let emailAddress: string;
let metadata: Metadata;
let cachedAgreementsResult: GetNotePurchaseAgreementsResponse;
let saveNotPurchaseAgreementResponse: SaveNotePurchaseAgreementResponse;

const npAgreementPayloadFixture = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "15/12/1993",
  homeAddress: "40942 Belleray Ave Murrieta CA 92562",
  phoneNumber: "9512493842",
  user: {
    emailAddress: `test+` + Math.random() + `@gmail.com`,
    password: "test",
  },
  socialSecurity: "123456789",
  fundsCommitted: 123,
  fileContent: new TextEncoder().encode("test"),
};

const getAuthMetadata = async (username: string, password: string) => {
  let metadata = new Metadata({});
  let metadataResult: Metadata = new Metadata();

  const authResult = await authClient.authenticateUser(
    { payload: { emailAddress: username, password: password } },
    {
      metadata,
      onHeader(header) {
        metadataResult = header;
      },
    }
  );

  expect(authResult).not.toBeNull();
  expect(authResult.isAuthenticated).toBe(true);
  expect(authResult.errorMessage).toBe("");

  expect(metadataResult).not.toBeNull();

  let authtoken = metadataResult.get("authorization")!;

  expect(authtoken).not.toEqual("");

  metadata.set("authorization", authtoken);

  return metadata;
};

async function getNotePurchaseAgreements() {
  if (cachedAgreementsResult) {
    return cachedAgreementsResult;
  }

  metadata = await getAuthMetadata(
    emailAddress,
    npAgreementPayloadFixture.user.password
  );
  cachedAgreementsResult =
    await notePurchaseAgreementDocClient.getNotePurchaseAgreements(
      {},
      { metadata }
    );
  return cachedAgreementsResult;
}

describe("notePurchaseAgreements API integration test", function () {
  beforeEach(async () => {
    emailAddress = `test+` + Math.random() + `@gmail.com`;
    
    saveNotPurchaseAgreementResponse =
    await notePurchaseAgreementDocClient.saveNotePurchaseAgreement({
      payload: {
        ...npAgreementPayloadFixture,
        user: {
          emailAddress: emailAddress,
          password: npAgreementPayloadFixture.user.password,
        },
      },
    });
  });

  it("should saveNotePurchaseAgreement", async function () {
    expect(saveNotPurchaseAgreementResponse.payload).toBeDefined();
    expect(saveNotPurchaseAgreementResponse.payload?.id).toBeDefined();
    expect(saveNotPurchaseAgreementResponse.payload?.id).not.toBe("");
  });

  it("should getNotePurchaseAgreement", async function () {
    // let response: SaveNotePurchaseAgreementResponse = await notePurchaseAgreementDocClient.saveNotePurchaseAgreement({
    //   payload: {...npAgreementPayloadFixture, user:{
    //     emailAddress: emailAddress,
    //     password: npAgreementPayloadFixture.user.password,
    //   }}
    // })

    const agreements = await getNotePurchaseAgreements();

    let metadata = await getAuthMetadata(
      emailAddress,
      npAgreementPayloadFixture.user.password
    );
    
    let agreementResult =
      await notePurchaseAgreementDocClient.getNotePurchaseAgreement(
        {
          payload: {
            id: agreements.payload?.payload?.[0]?.id,
          },
        },
        { metadata }
      );

    expect(agreementResult.payload).toBeDefined();
    expect(agreementResult.payload?.id).toBeDefined();
    expect(agreementResult.payload?.id).not.toBe("");
    expect(agreementResult.payload?.firstName).toBe(
      npAgreementPayloadFixture.firstName
    );
    expect(agreementResult.payload?.lastName).toBe(
      npAgreementPayloadFixture.lastName
    );
    expect(agreementResult.payload?.dateOfBirth).toBe(
      npAgreementPayloadFixture.dateOfBirth
    );
    expect(agreementResult.payload?.phoneNumber).toBe(
      npAgreementPayloadFixture.phoneNumber
    );
    expect(agreementResult.payload?.socialSecurity).toBe(
      npAgreementPayloadFixture.socialSecurity
    );
    expect(agreementResult.payload?.fundsCommitted).toBe(
      npAgreementPayloadFixture.fundsCommitted
    );
  });

  it("should getNotePurchaseAgreements", async function () {
    // let response: SaveNotePurchaseAgreementResponse = await notePurchaseAgreementDocClient.saveNotePurchaseAgreement({
    //   payload: {...npAgreementPayloadFixture, user:{
    //     emailAddress: emailAddress,
    //     password: npAgreementPayloadFixture.user.password,
    //   }}
    // })

    let agreementsResult = await getNotePurchaseAgreements();

    expect(agreementsResult.payload).toBeDefined();
    expect(agreementsResult.payload?.payload).toBeDefined();
    expect(agreementsResult.payload?.payload[0]).not.toBeDefined;
    expect(agreementsResult.payload?.payload[0]?.id).toBeDefined;
    expect(agreementsResult.payload?.payload[0]?.createdOn).toBeDefined;
  });

  it("should getNotePurchaseAgreementDoc", async function () {
    let agreementsResult = await getNotePurchaseAgreements();

    let docResult =
      await notePurchaseAgreementDocClient.getNotePurchaseAgreementDoc(
        {
          payload: {
            id: agreementsResult?.payload.payload?.[0].id,
          },
        },
        { metadata }
      );

    expect(docResult.fileContent).toBeDefined();
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
