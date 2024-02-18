import { Text } from "@ui-kitten/components";
import React, { useState } from "react";
// import PlaidLink, {
//   LinkEvent,
//   LinkEventListener,
//   LinkExit,
//   LinkExitListener,
//   LinkSuccess,
//   LinkSuccessListener
// } from "react-native-plaid-link-sdk";
import { View } from "../../components/Themed";
import useTransactions from "../../hooks/useTransactions";
import { financial as constants } from "../../constants";

// for testing
// username: user_good
// password: pass_good
// pin: credential_good (when required)
const Transactions: React.FC = () => {
  // useTransactions hook
  const { TransactionLink, token, onLinkSuccess, loading, error } =
    useTransactions();

  // Define a handler function that receives the link success data
  const handleSuccess = onLinkSuccess;

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

    if (data.eventName === constants.SELECT_INSTITUTION) {
      console.log(constants.SELECT_INSTITUTION, ": ", data.metadata);
      
      // {"eventName": "SELECT_INSTITUTION", "metadata": {
    //     "errorCode": "", 
    //     "errorMessage": "", 
    //     "errorType": "", 
    //     "exitStatus": undefined, 
    //     "institutionId": "ins_56", 
    //     "institutionName": "Chase", "institutionSearchQuery": "null", "linkSessionId": "976fcb5a-9d09-4c34-99cd-991d5274d0a5", "mfaType": "", "requestId": "crKBZqbCjeeFAFN", "timestamp": "2024-02-09T05:41:41.259Z", "viewName": ""}}
    //   ;
    }
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
        <TransactionLink
          onSuccess={handleSuccess}
          onExit={handleExit}
          onEvent={handleEvent}
          linkToken={token}
        >
          <Text>Connect your bank account</Text>
        </TransactionLink>
      )}
    </>
  );
};

export default Transactions;
