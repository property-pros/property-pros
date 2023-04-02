import { grpc } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";
import { CallOptions } from "nice-grpc-common";
import { createChannel, createClient } from "nice-grpc-web";
import { auth, finance, notePurchaseAgreement } from "property-pros-sdk";

// Do this first, before you make any grpc requests!
grpc.setDefaultTransport(NodeHttpTransport());

const channel = createChannel("http://localhost:8000");

//notepurchaseagreement exports
const {
  NotePurchaseAgreementServiceDefinition,
  GetNotePurchaseAgreementRequest,
  GetNotePurchaseAgreementResponse,
  GetNotePurchaseAgreementsRequest,
  GetNotePurchaseAgreementsResponse,
  GetNotePurchaseAgreementDocRequest,
  GetNotePurchaseAgreementDocResponse,
  NotePurchaseAgreementRecord: NotePurchaseAgreement,
  SaveNotePurchaseAgreementRequest,
  SaveNotePurchaseAgreementResponse,
} = notePurchaseAgreement;

//notepurchaseagreement types

type NotePurchaseAgreementServiceClient =
  notePurchaseAgreement.NotePurchaseAgreementServiceClient;
type GetNotePurchaseAgreementRequest =
  notePurchaseAgreement.GetNotePurchaseAgreementRequest;
export type GetNotePurchaseAgreementResponse =
  notePurchaseAgreement.GetNotePurchaseAgreementResponse;
type GetNotePurchaseAgreementsRequest =
  notePurchaseAgreement.GetNotePurchaseAgreementsRequest;
export type GetNotePurchaseAgreementsResponse =
  notePurchaseAgreement.GetNotePurchaseAgreementsResponse;
type GetNotePurchaseAgreementDocRequest =
  notePurchaseAgreement.GetNotePurchaseAgreementDocRequest;
export type GetNotePurchaseAgreementDocResponse =
  notePurchaseAgreement.GetNotePurchaseAgreementDocResponse;

//auth exports
const {
  AuthenticationServiceDefinition,
  User,
  AuthenticateUserRequest,
  AuthenticateUserResponse,
} = auth;

type DeepPartial<T> = notePurchaseAgreement.DeepPartial<T>;

type NotePurchaseAgreement = notePurchaseAgreement.NotePurchaseAgreementRecord;
type SaveNotePurchaseAgreementRequest =
  notePurchaseAgreement.SaveNotePurchaseAgreementRequest;
type SaveNotePurchaseAgreementResponse =
  notePurchaseAgreement.SaveNotePurchaseAgreementResponse;

export const typeDefinitions = {
  ...NotePurchaseAgreementServiceDefinition.methods,
  ...auth.AuthenticationServiceDefinition.methods,
  ...finance.FinanceServiceDefinition.methods,
};

//notepurchaseagreement client setup
export const notePurchaseAgreementDocClient = createClient(
  NotePurchaseAgreementServiceDefinition,
  channel
) as NotePurchaseAgreementServiceClient;

//auth types
type AuthenticationServiceClient = auth.AuthenticationServiceClient;
type AuthenticateUserRequest = auth.AuthenticateUserRequest;
export type AuthenticateUserResponse = auth.AuthenticateUserResponse;
type User = auth.User;

//auth client setup
export const authClient = createClient(
  AuthenticationServiceDefinition,
  channel
) as AuthenticationServiceClient;

const clientMethods = MapClientMethods(
  (methodKey: string) => (args: ClientParameters) => {
    console.log("args: ", args);
    return () => {
      console.log(methodKey, ": ", args.payload);
    };
    //TODO: finish server integration, including auth
    //return (notePurchaseAgreementDocClient as any)[methodKey](args.payload);
  }
);

//notepurchaseagreement interfaces
export interface NotePurchaseAgreementClient {
  getNotePurchaseAgreementDoc<CallOptionsExt>(
    request: DeepPartial<GetNotePurchaseAgreementDocRequest>,
    options?: CallOptions & CallOptionsExt
  ): Generator<never, GetNotePurchaseAgreementDocResponse, unknown>;
  getNotePurchaseAgreement<CallOptionsExt>(
    request: DeepPartial<GetNotePurchaseAgreementRequest>,
    options?: CallOptions & CallOptionsExt
  ): Generator<never, GetNotePurchaseAgreementResponse, unknown>;
  getNotePurchaseAgreements<CallOptionsExt>(
    request: DeepPartial<GetNotePurchaseAgreementsRequest>,
    options?: CallOptions & CallOptionsExt
  ): Generator<never, GetNotePurchaseAgreementsResponse, unknown>;
  saveNotePurchaseAgreement<CallOptionsExt>(
    request: DeepPartial<SaveNotePurchaseAgreementRequest>,
    options?: CallOptions & CallOptionsExt
  ): Generator<never, SaveNotePurchaseAgreementResponse, unknown>;
}

//auth interfaces
export interface AuthClient {
  authenticateUser<CallOptionsExt>(
    request: DeepPartial<AuthenticateUserRequest>,
    options?: CallOptions & CallOptionsExt
  ): Generator<never, AuthenticateUserResponse, unknown>;
}

interface ClientParameters {
  payload: any;
}

export function MapClientMethods(
  fn: (key: string) => Function
): NotePurchaseAgreementServiceClient {
  const methodNames: string[] = Object.keys(typeDefinitions) as any;

  let client: any = {};
  for (let i = 0; i < methodNames.length; i++) {
    let it: any = methodNames[i];

    client[it] = fn(it);
  }

  return client as NotePurchaseAgreementServiceClient & AuthClient;
}

//finance types
type FinanceServiceClient = finance.FinanceServiceClient;
type GetAccountRequest = finance.GetAccountRequest;
type GetAccountResponse = finance.GetAccountResponse;
type GetAccountsRequest = finance.GetAccountsRequest;
type GetAccountsResponse = finance.GetAccountsResponse;
type GetTransactionRequest = finance.GetTransactionRequest;
type GetTransactionResponse = finance.GetTransactionResponse;
type GetTransactionsRequest = finance.GetTransactionsRequest;
type GetTransactionsResponse = finance.GetTransactionsResponse;
type GetBalanceRequest = finance.GetBalanceRequest;
type GetBalanceResponse = finance.GetBalanceResponse;
type GetBalancesRequest = finance.GetBalancesRequest;
type GetBalancesResponse = finance.GetBalancesResponse;

type Account = finance.Account;
type Transaction = finance.Transaction;
type Balance = finance.Balance;
type SaveFinancialItemRequest = finance.SaveFinancialItemRequest;

type SaveFinancialItemResponse = finance.SaveFinancialItemResponse;

//finance client

//financeClient client setup
export const financeClient = createClient(
  finance.FinanceServiceDefinition,
  channel
) as finance.FinanceServiceClient;

//finance interfaces
export interface FinanceClient {
  // getAccount<CallOptionsExt>(
  //   request: DeepPartial<GetAccountRequest>,
  //   options?: CallOptions & CallOptionsExt
  // ): Generator<never, GetAccountResponse, unknown>;
  // getAccounts<CallOptionsExt>(
  //   request: DeepPartial<GetAccountsRequest>,
  //   options?: CallOptions & CallOptionsExt
  // ): Generator<never, GetAccountsResponse, unknown>;
  // getBalance<CallOptionsExt>(
  //   request: DeepPartial<GetBalanceRequest>,
  //   options?: CallOptions & CallOptionsExt
  // ): Generator<never, GetBalanceResponse, unknown>;
  // getBalances<CallOptionsExt>(
  //   request: DeepPartial<GetBalancesRequest>,
  //   options?: CallOptions & CallOptionsExt
  // ): Generator<never, GetBalancesResponse, unknown>;
  // getTransaction<CallOptionsExt>(
  //   request: DeepPartial<GetTransactionRequest>,
  //   options?: CallOptions & CallOptionsExt
  // ): Generator<never, GetTransactionResponse, unknown>;
  // getTransactions<CallOptionsExt>(
  //   request: DeepPartial<GetTransactionsRequest>,
  //   options?: CallOptions & CallOptionsExt
  // ): Generator<never, GetTransactionsResponse, unknown>;
  saveFinancialItem<CallOptionsExt>(
    request: DeepPartial<SaveFinancialItemRequest>,
    options?: CallOptions & CallOptionsExt
  ): Generator<never, SaveFinancialItemResponse, unknown>;
}

//TODO: move each client to separate file
