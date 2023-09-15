import axios, { Method } from "axios";
import {
  EffectCommand,
  IApiClientCommand,
  IPropertyProsEffectCommands,
} from "../../interface/IPropertyProsEffectsCommands";

const baseApiUrl = "http://localhost:8000";

const services = {
  StatementService: {
    GetStatements: "/v1/statements",
    GetStatementDoc: "/v1/statement/{id}/file",
  },
  NotePurchaseAgreementService: {
    GetNotePurchaseAgreements: "/v1/notepurchaseagreements",
    GetNotePurchaseAgreement: "/v1/notepurchaseagreement",
    SaveNotePurchaseAgreement: "/v1/notepurchaseagreement",
    GetNotePurchaseAgreementDoc: "/v1/notepurchaseagreement/{id}/file",
  },
  AuthenticationService: {
    AuthenticateUser: "/v1/authenticate-user",
  },
};

function getMethodType(methodName): Method {
  if (methodName.startsWith("Get")) return "get";
  if (methodName.startsWith("Save")) return "post";
  if (methodName.startsWith("Update")) return "put";
  return "post";
}

const apiClient: ApiClient = {} as any;
for (const [serviceName, service] of Object.entries(services)) {
  apiClient[serviceName] = {};
  for (const [methodName, path] of Object.entries(service)) {
    const methodType = getMethodType(methodName);
    const uncapitalizedMethodName =
      methodName.charAt(0).toLowerCase() + methodName.slice(1);

    apiClient[serviceName][uncapitalizedMethodName] = async ({
      payload: data,
      options,
    }) => {
      try {
        const config = {
          url: `${baseApiUrl}${path}`,
          method: methodType,
          data: null,
          headers: { ...defaultHeaders },
        };
        console.log(`${serviceName}.${uncapitalizedMethodName}`);
        if (methodType === "get") {
          if (data && Object.keys(data).length > 0) {
            console.log("data: ", data);
            //check if a data key is in the url in the format of {key}; if so, replace it with the value otherwise append the value to the end of the url
            const requestKeys = Object.keys(data);

            requestKeys.forEach((key) => {
              console.log("key: ", key);
              console.log("config url: ", config.url);
              if (config.url.includes(`{${key}}`)) {
                console.log("key: ", key);
                console.log("value: ", data[key]);
                config.url = config.url.replace(`{${key}}`, data[key]);
                delete data[key];
              }
            });

            config.url += `/${Object.keys(data)
              .map((key) => `${data[key]}`)
              .join("/")}`;

            config.url = config.url.replace(/\/*$/g, "");

            console.log(
              "url: ",
              `/${Object.keys(data)
                .map((key) => `${data[key]}`)
                .join("/")
                .replace(/\/+$/, "")}`
            );
            console.log(
              "url: ",
              `/${Object.keys(data)
                .map((key) => `${data[key]}`)
                .join("/")}`
            );
          }
        } else {
          config.data = data;
        }

        console.log("data after: ", data);
        console.log("config: ", config);
        const response = await axios(config);

        if (serviceName === "AuthenticationService") {
          if (uncapitalizedMethodName === "authenticateUser") {
            defaultHeaders = {
              "grpc-metadata-authorization":
                response.headers["grpc-metadata-authorization"],
            };

            options.onHeader({
              authToken: response.headers["grpc-metadata-authorization"],
            });
          }
        }

        return response.data;
      } catch (error) {
        console.error(
          `Error in ${serviceName}.${uncapitalizedMethodName}:`,
          error
        );
        return error;
      }
    };
  }
}

let defaultHeaders = {};

export function MapClientMethods(
  fn: (key: string) => IApiClientCommand
): ApiClient {
  let client: ApiClient = {} as any;

  for (const serviceName in services) {
    for (const methodName in services[serviceName]) {
      const uncapitalizedMethodName =
        methodName.charAt(0).toLowerCase() + methodName.slice(1);
      client[uncapitalizedMethodName] = fn(uncapitalizedMethodName);
    }
  }

  return client;
}

export default apiClient;

export const statementClient: StatementService = apiClient.StatementService;
export const notePurchaseAgreementClient: NotePurchaseAgreementService =
  apiClient.NotePurchaseAgreementService;
export const authClient: AuthenticationService =
  apiClient.AuthenticationService;

export interface ServiceMethod {
  (data?: any): Promise<any>;
}

export interface StatementService {
  getStatements: ServiceMethod;
  getStatementDoc: ServiceMethod;
}

export interface NotePurchaseAgreementService {
  getNotePurchaseAgreements: ServiceMethod;
  getNotePurchaseAgreement: ServiceMethod;
  saveNotePurchaseAgreement: ServiceMethod;
  getNotePurchaseAgreementDoc: ServiceMethod;
}

export interface AuthenticationService {
  authenticateUser: ServiceMethod;
}

export interface ApiClient {
  StatementService: StatementService;
  NotePurchaseAgreementService: NotePurchaseAgreementService;
  AuthenticationService: AuthenticationService;
}

// import { grpc } from "@improbable-eng/grpc-web";
// // import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";
// import { ReactNativeTransport } from "@improbable-eng/grpc-web-react-native-transport";
// import { CallOptions } from "nice-grpc-common";
// // import { errorDetailsClientMiddleware } from "nice-grpc-error-details";
// import {
//   createChannel,
//   createClient,
//   createClientFactory,
// } from "nice-grpc-web";
// import { auth, notePurchaseAgreement, statement } from "property-pros-sdk";

// const clientFactory = createClientFactory()
// // Do this first, before you make any grpc requests!
// // grpc.setDefaultTransport(NodeHttpTransport());
// grpc.setDefaultTransport(ReactNativeTransport());

// const channel = createChannel(
//   "http://localhost:8000"
// );

// //notepurchaseagreement exports
// const {
//   NotePurchaseAgreementServiceDefinition,
//   GetNotePurchaseAgreementRequest,
//   GetNotePurchaseAgreementResponse,
//   GetNotePurchaseAgreementsRequest,
//   GetNotePurchaseAgreementsResponse,
//   GetNotePurchaseAgreementDocRequest,
//   GetNotePurchaseAgreementDocResponse,
//   NotePurchaseAgreementRecord: NotePurchaseAgreement,
//   SaveNotePurchaseAgreementRequest,
//   SaveNotePurchaseAgreementResponse,
// } = notePurchaseAgreement;

// //notepurchaseagreement types

// type NotePurchaseAgreementServiceClient =
//   notePurchaseAgreement.NotePurchaseAgreementServiceClient;
// type GetNotePurchaseAgreementRequest =
//   notePurchaseAgreement.GetNotePurchaseAgreementRequest;
// export type GetNotePurchaseAgreementResponse =
//   notePurchaseAgreement.GetNotePurchaseAgreementResponse;
// type GetNotePurchaseAgreementsRequest =
//   notePurchaseAgreement.GetNotePurchaseAgreementsRequest;
// export type GetNotePurchaseAgreementsResponse =
//   notePurchaseAgreement.GetNotePurchaseAgreementsResponse;
// type GetNotePurchaseAgreementDocRequest =
//   notePurchaseAgreement.GetNotePurchaseAgreementDocRequest;
// export type GetNotePurchaseAgreementDocResponse =
//   notePurchaseAgreement.GetNotePurchaseAgreementDocResponse;

// //auth exports
// const {
//   AuthenticationServiceDefinition,
//   User,
//   AuthenticateUserRequest,
//   AuthenticateUserResponse,
// } = auth;

// type DeepPartial<T> = notePurchaseAgreement.DeepPartial<T>;

// type NotePurchaseAgreement = notePurchaseAgreement.NotePurchaseAgreementRecord;
// type SaveNotePurchaseAgreementRequest =
//   notePurchaseAgreement.SaveNotePurchaseAgreementRequest;
// type SaveNotePurchaseAgreementResponse =
//   notePurchaseAgreement.SaveNotePurchaseAgreementResponse;

// export const typeDefinitions = {
//   ...NotePurchaseAgreementServiceDefinition.methods,
//   ...auth.AuthenticationServiceDefinition.methods,
// };

// //notepurchaseagreement client setup
// export const notePurchaseAgreementDocClient = createClient(
//   NotePurchaseAgreementServiceDefinition,
//   channel
// ) as NotePurchaseAgreementServiceClient;

// //auth types
// type AuthenticationServiceClient = auth.AuthenticationServiceClient;
// type AuthenticateUserRequest = auth.AuthenticateUserRequest;
// export type AuthenticateUserResponse = auth.AuthenticateUserResponse;
// type User = auth.User;

// //auth client setup
// export const authClient = clientFactory.create(
//   AuthenticationServiceDefinition,
//   channel
//   // {
//   //   authenticateUser: {
//   //     onHeader(header: any) {
//   //       console.log("authenticateUser on header called");
//   //     },
//   //     onTrailer(trailer) {
//   //       console.log("authenticateUser on trailer called");
//   //     },
//   //   },
//   // }
// ) as AuthenticationServiceClient;

// //notepurchaseagreement interfaces
// export interface NotePurchaseAgreementClient {
//   getNotePurchaseAgreementDoc<CallOptionsExt>(
//     request: DeepPartial<GetNotePurchaseAgreementDocRequest>,
//     options?: CallOptions & CallOptionsExt
//   ): Generator<never, GetNotePurchaseAgreementDocResponse, unknown>;
//   getNotePurchaseAgreement<CallOptionsExt>(
//     request: DeepPartial<GetNotePurchaseAgreementRequest>,
//     options?: CallOptions & CallOptionsExt
//   ): Generator<never, GetNotePurchaseAgreementResponse, unknown>;
//   getNotePurchaseAgreements<CallOptionsExt>(
//     request: DeepPartial<GetNotePurchaseAgreementsRequest>,
//     options?: CallOptions & CallOptionsExt
//   ): Generator<never, GetNotePurchaseAgreementsResponse, unknown>;
//   saveNotePurchaseAgreement<CallOptionsExt>(
//     request: DeepPartial<SaveNotePurchaseAgreementRequest>,
//     options?: CallOptions & CallOptionsExt
//   ): Generator<never, SaveNotePurchaseAgreementResponse, unknown>;
// }

// //auth interfaces
// export interface AuthClient {
//   authenticateUser<CallOptionsExt>(
//     request: DeepPartial<AuthenticateUserRequest>,
//     options?: CallOptions & CallOptionsExt
//   ): Generator<never, AuthenticateUserResponse, unknown>;
// }

// const {
//   StatementServiceDefinition,
//   // GetStatementRequest,
//   // GetStatementResponse,
//   GetStatementsRequest,
//   GetStatementsResponse,
//   GetStatementDocRequest,
//   GetStatementDocResponse,
//   Statement,
//   // SaveStatementRequest,
//   // SaveStatementResponse,
// } = statement;

// //notepurchaseagreement types

// type StatementServiceClient = statement.StatementServiceClient;
// // type GetStatementRequest =
// //   statement.GetStatementRequest;
// // export type GetStatementResponse =
// //   statement.GetStatementResponse;
// type GetStatementsRequest = statement.GetStatementsRequest;
// export type GetStatementsResponse = statement.GetStatementsResponse;
// type GetStatementDocRequest = statement.GetStatementDocRequest;
// export type GetStatementDocResponse = statement.GetStatementDocResponse;

// export const statementClient = createClient(
//   StatementServiceDefinition,
//   channel
// ) as StatementServiceClient;

// export function MapClientMethods(
//   fn: (key: string) => Function
// ): NotePurchaseAgreementServiceClient & AuthClient & StatementServiceClient {
//   const methodNames: string[] = Object.keys(typeDefinitions) as any;

//   let client: any = {};
//   for (let i = 0; i < methodNames.length; i++) {
//     let it: any = methodNames[i];

//     client[it] = fn(it);
//   }

//   return client as NotePurchaseAgreementServiceClient &
//     AuthClient &
//     StatementServiceClient;
// }
