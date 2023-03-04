import { Text } from "@ui-kitten/components";
import React from "react";
// import PlaidLink, {
//   LinkEvent,
//   LinkEventListener,
//   LinkExit,
//   LinkExitListener,
//   LinkSuccess,
//   LinkSuccessListener
// } from "react-native-plaid-link-sdk";
import PlaidLink from "expo-plaid-link";
import { View } from "../../components/Themed";
import useTransactions from "../../hooks/useTransactions";

const Transactions: React.FC = () => {
  // useTransactions hook
  const { linkToken, onLinkSuccess, loading, error } = useTransactions();

  // Define a handler function that receives the link success data
  const handleSuccess = onLinkSuccess

  // Define a handler function that receives the link exit data
  const handleExit = (data: any) => {
    // data contains the status, metadata, and request_id
    console.log("handleExit: ", data);
    // Handle the case when the user exits the PlaidLink flow
  };

  // Define a handler function that receives the link event data
  const handleEvent = (data: any) => {
    // data contains the event_name, metadata, and error_code
    console.log("handleEvent: ", data);
    // Handle the different events that occur during the PlaidLink flow
  };

  // Define a handler function that receives the link press event
  const handlePress: () => void = () => {
    // Handle the case when the user presses the PlaidLink button

    console.log("PlaidLink button pressed");
  };

  // Return a button that opens PlaidLink with the given configuration
  return (
    <>
      <View>
        <Text category="h1">Transactions</Text>
      </View>
      {error ? (
        <Text>{error?.toString()}</Text>
      ) : (
        <PlaidLink
          onSuccess={handleSuccess}
          onExit={handleExit}
          onEvent={handleEvent}
          linkToken={linkToken}
        >
          <Text>Connect your bank account</Text>
        </PlaidLink>
      )}
    </>
  );
};

export default Transactions;
