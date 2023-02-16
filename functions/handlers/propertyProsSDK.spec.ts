import { MapClientMethods } from "./propertyProsSDK";
import { notePurchaseAgreement } from "property-pros-sdk";

const NotePurchaseAgreementServiceDefinition =
  notePurchaseAgreement.NotePurchaseAgreementServiceDefinition;
describe("note purchase agreement handlers", function () {
  it("should map client functions", function () {
    const results = MapClientMethods((key: string) => () => key);

    expect(Object.keys(results)).toEqual(
        expect.arrayContaining(
          Object.keys(NotePurchaseAgreementServiceDefinition.methods)
        )
      );

      let fns = Object.values(results)

      expect(typeof fns[0]).toEqual("function");
      expect(typeof fns[1]).toEqual("function");

      expect(typeof fns[0]()).toEqual("string");
      expect(typeof fns[1]()).toEqual("string");
  });
});
