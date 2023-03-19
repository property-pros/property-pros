import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  type Transaction as PlaidTransaction
} from "plaid";
export { default as TransactionLinkComponent } from "@burstware/expo-plaid-link";
export type Transaction = PlaidTransaction;

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "63828522d3d1840013350fec",
      "PLAID-SECRET": "2f4c488af25295391dc2c17c73ba73",
    },
  },
});

const client = new PlaidApi(configuration);

// Function to obtain a link_token from Plaid API
export async function getLinkToken() {
  // Create a new Plaid client with your credentials
  //   const client = new plaid.Client({
  //     clientID: '63828522d3d1840013350fec',
  //     secret: '2f4c488af25295391dc2c17c73ba73',
  //     env: plaid.environments.sandbox,
  //   });
  //   // Call /link/token/create endpoint with your parameters
  const response = await client.linkTokenCreate({
    user: {
      client_user_id: "USER_ID",
    },
    client_name: "Property Pros",
    products: ["transactions"],
    country_codes: ["US"],
    language: "en",
  });
  // Return the link_token from the response
  return response.data.link_token;
}

// Function to exchange a public_token for an access_token
export async function exchangePublicToken(public_token) {
  const response = await client.itemPublicTokenExchange({
    public_token,
  });

  return {
    accessToken: response.data.access_token,
    itemId: response.data.item_id,
  };
}

// Function to fetch transactions for an Item
export async function getTransactions(accessToken: string, startDate?: string, endDate?: string) {
  const response = await client.transactionsGet({
    access_token: accessToken,
    start_date: startDate,
    end_date: endDate,
  });
  return response.data.transactions;
}
