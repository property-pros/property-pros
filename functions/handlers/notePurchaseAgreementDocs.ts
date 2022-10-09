import { createChannel, createClient } from "nice-grpc-web";
import {
  NotePurchaseAgreementServiceClient,
  NotePurchaseAgreementServiceDefinition,
} from "property-pros-sdk";
import { grpc } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";

// Do this first, before you make any grpc requests!
grpc.setDefaultTransport(NodeHttpTransport());

const channel = createChannel("http://localhost:8020");

export const typeDefinitions = {
  ...NotePurchaseAgreementServiceDefinition.methods,
};

const notePurchaseAgreementDocClient = createClient(
  NotePurchaseAgreementServiceDefinition,
  channel
) as NotePurchaseAgreementServiceClient;

const clientMethods = MapClientMethods(
  (methodKey: string) => (args: NotePurchaseAgreementDocClientParameters) => {
    console.log("args: ", args);
    return (notePurchaseAgreementDocClient as any)[methodKey](args.payload);
  }
);

export default { ...clientMethods };

interface NotePurchaseAgreementDocClientParameters {
  payload: any;
}

export function MapClientMethods(fn: (key: string) => Function) {
  return Object.keys(NotePurchaseAgreementServiceDefinition.methods).reduce(
    (prev, it, i, col) => {
      return {
        ...col,
        [it]: fn(it),
      };
    },
    {}
  );
}
