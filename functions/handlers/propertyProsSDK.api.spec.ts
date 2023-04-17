import { Metadata } from "nice-grpc-common";
import { SaveNotePurchaseAgreementResponse } from "property-pros-sdk/api/note_purchase_agreement/v1/note_purchase_agreement";
import { authClient, notePurchaseAgreementDocClient } from "./propertyProsSDK";

const npAgreementPayloadFixture = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "15/12/1993",
  homeAddress: "40942 Belleray Ave Murrieta CA 92562",
  phoneNumber: "9512493842",
  user: {
    emailAddress: `test+`+ Math.random()+`@gmail.com`,
    password: "test",
  },
  socialSecurity: "123456789",
  fundsCommitted: 123,
  fileContent: (new TextEncoder()).encode("test"),
}

const getAuthMetadata = async (username: string, password: string)=>{
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
}

describe("notePurchaseAgreements API integration test", function () {
  let emailAddress: string;
  let metadata: Metadata;

  beforeEach(()=>{
    emailAddress = `test+`+ Math.random()+`@gmail.com`
  })

  it("should saveNotePurchaseAgreement", async function() {
    let response: SaveNotePurchaseAgreementResponse = await notePurchaseAgreementDocClient.saveNotePurchaseAgreement({
      payload: {...npAgreementPayloadFixture, user:{
        emailAddress: emailAddress,
        password: npAgreementPayloadFixture.user.password,
      }}
    })
    
    expect(response.payload).toBeDefined();
    expect(response.payload?.id).toBeDefined();
    expect(response.payload?.id).not.toBe("")
  });

  it("should getNotePurchaseAgreement", async function() {
    let response: SaveNotePurchaseAgreementResponse = await notePurchaseAgreementDocClient.saveNotePurchaseAgreement({
      payload: {...npAgreementPayloadFixture, user:{
        emailAddress: emailAddress,
        password: npAgreementPayloadFixture.user.password,
      }}
    })

    let metadata = await getAuthMetadata(emailAddress, npAgreementPayloadFixture.user.password)
    console.log(metadata)
    let agreementResult =
      await notePurchaseAgreementDocClient.getNotePurchaseAgreement(
        {
          payload: {
            id: response.payload?.id
          },
        },
        { metadata }
      );

      expect(agreementResult.payload).toBeDefined();
      expect(agreementResult.payload?.id).toBeDefined();
      expect(agreementResult.payload?.id).not.toBe("")
      expect(agreementResult.payload?.firstName).toBe(npAgreementPayloadFixture.firstName)
      expect(agreementResult.payload?.lastName).toBe(npAgreementPayloadFixture.lastName)
      expect(agreementResult.payload?.dateOfBirth).toBe(npAgreementPayloadFixture.dateOfBirth)
      expect(agreementResult.payload?.phoneNumber).toBe(npAgreementPayloadFixture.phoneNumber)
      expect(agreementResult.payload?.socialSecurity).toBe(npAgreementPayloadFixture.socialSecurity)
      expect(agreementResult.payload?.fundsCommitted).toBe(npAgreementPayloadFixture.fundsCommitted)
  });


  it("should getNotePurchaseAgreements", async function() {
    let response: SaveNotePurchaseAgreementResponse = await notePurchaseAgreementDocClient.saveNotePurchaseAgreement({
      payload: {...npAgreementPayloadFixture, user:{
        emailAddress: emailAddress,
        password: npAgreementPayloadFixture.user.password,
      }}
    })

    let metadata = await getAuthMetadata(emailAddress, npAgreementPayloadFixture.user.password)
    let agreementResult =
      await notePurchaseAgreementDocClient.getNotePurchaseAgreements(
        {},
        { metadata }
      );

      expect(agreementResult.payload).toBeDefined();
      expect(agreementResult.payload?.payload).toBeDefined();
      expect(agreementResult.payload?.payload[0]).not.toBeDefined
      expect(agreementResult.payload?.payload[0]?.id).toBeDefined
      expect(agreementResult.payload?.payload[0]?.createdOn).toBeDefined
  });

  // it.skip("should getNotePurchaseAgreementDoc", async function () {


  //   let agreementDocResult =
  //     await notePurchaseAgreementDocClient.getNotePurchaseAgreementDoc(
  //       {
  //         payload: {},
  //       },
  //       { metadata }
  //     );
  //   console.log("agreementDocResult")
  //   console.log(agreementDocResult)
  //   expect(agreementDocResult.fileContent).not.toBeNull();
  //   expect(agreementDocResult.fileContent.length).toBeGreaterThan(0);
  // });
});
