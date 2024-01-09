import axios, { Method, AxiosResponse } from "axios";
import {
  EffectCommand,
  IApiClientCommand,
  IPropertyProsEffectCommands,
} from "../../interface/IPropertyProsEffectsCommands";

const baseApiUrl = "https://property-pros-service-2cmojdnxfq-uw.a.run.app";
// const baseApiUrl = "http://localhost:8030";

const services = {
  StatementService: {
    GetStatements: "/v1/statements",
    GetStatementDoc: "/v1/statement/{id}/file",
  },
  NotePurchaseAgreementService: {
    GetNotePurchaseAgreements: "/v1/notepurchaseagreements",
    GetNotePurchaseAgreement: "/v1/notepurchaseagreement",
    SaveNotePurchaseAgreement: "/v1/notepurchaseagreement",
    StreamNotePurchaseAgreementDoc: "/v1/notepurchaseagreement/{id}/file",
  },
  AuthenticationService: {
    AuthenticateUser: "/v1/authenticate-user",
  },
};

function getMethodType(methodName): Method {
  if (methodName.startsWith("Get") || methodName.startsWith("Stream"))
    return "get";
  if (methodName.startsWith("Save")) return "post";
  if (methodName.startsWith("Update")) return "put";
  return "post";
}

function getResponseType(methodName): string {
  if (methodName.startsWith("Stream")) return "stream";

  return "json";
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
          responseType: getResponseType(methodName),
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
        const response = await sendRequest(config);

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
        //TODO: what's the best way to get all the data?
        if (config.responseType === "stream") {
          return await processStream(config);
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

async function sendRequest(config) {
  try {
    return await axios(config);
  } catch (error) {
    console.error("Error during stream request:", error);
    throw error; // rethrow the error for the caller to handle
  }
}

async function processStream(config) {
  const streamResponse = await sendRequest(config);
  // let counter = 0;
  // let content = "";
  // console.log("streamResponse: ", streamResponse);
  // for await (const chunk of streamResponse.data) {
  //   counter++;
  //   // Process each chunk
  //   console.log("Received chunk ", counter, ": ", chunk);
  //   content += chunk;
  // }
  // const response = { data: content };
  // console.log("Stream ended");
  console.log("stream data: ", streamResponse.data);
  return streamResponse.data.result;
}

// Define a function that retries a promise with exponential backoff
function retryWithBackoff(promiseFn, maxRetries, delay) {
  return new Promise((resolve, reject) => {
    // Define a recursive function that attempts to resolve the promise
    function attempt() {
      // Call the promise function and handle the result
      promiseFn()
        .then(resolve) // If the promise is resolved, resolve the outer promise
        .catch((error) => {
          // If the promise is rejected, check the error
          if (error.response.status === 503 && maxRetries > 0) {
            // If the error is 503 and there are more retries left, wait for the delay and try again
            setTimeout(attempt, delay);
            // Decrease the max retries and increase the delay exponentially
            maxRetries--;
            delay *= 2;
          } else {
            // Otherwise, reject the outer promise with the error
            reject(error);
          }
        });
    }
    // Call the attempt function for the first time
    attempt();
  });
}

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

export const notePurchaseAgreementClient: NotePurchaseAgreementService =
  apiClient.NotePurchaseAgreementService;
export const authClient: AuthenticationService =
  apiClient.AuthenticationService;
export const statementClient: StatementService = apiClient.StatementService;

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
  streamNotePurchaseAgreementDoc: ServiceMethod;
}

export interface AuthenticationService {
  authenticateUser: ServiceMethod;
}

export interface ApiClient {
  StatementService: StatementService;
  NotePurchaseAgreementService: NotePurchaseAgreementService;
  AuthenticationService: AuthenticationService;
}
