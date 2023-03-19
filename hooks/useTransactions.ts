import { useCallback, useEffect, useState } from "react";
import { saveUserFinancialItem } from "../functions";
import {
  exchangePublicToken,
  getLinkToken,
  getTransactions, Transaction, TransactionLinkComponent
} from "./thirdParty/financialIntegration";
console.log("TransactionLinkComponent: ", TransactionLinkComponent);
export default function useTransactions(): UseTransationsResults {
  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [token, setToken] = useState(null as string | null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as Error | null);

  const getLink = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("getting link token");

      const linkToken = await getLinkToken();

      console.log("linkToken: ", linkToken);
      setToken(linkToken);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLink();
  }, []);

  const onLinkSuccess = useCallback(
    async ({ publicToken }) => {
      console.log("publicToken: ", publicToken);

      const { accessToken, itemId } = await exchangePublicToken(publicToken);

      console.log("accessToken: ", accessToken);
      setToken(accessToken);

      saveUserFinancialItem(accessToken, itemId);
      
      // create a date equal to the beginning of the year inclusive
      const startDate = new Date();
      startDate.setMonth(0);
      startDate.setDate(1);
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);

      const transactions = await getTransactions(accessToken, startDate.toString(), Date.now().toString());
      setTransactions(transactions);

    },
    [transactions]
  );

  return {
    transactions,
    loading,
    error,
    onLinkSuccess,
    token,
    TransactionLink: TransactionLinkComponent,
  };
}

interface UseTransationsResults {
  transactions: any[];
  loading: boolean;
  error: Error | null;
  token: string | null;
  onLinkSuccess: (publicToken: string) => void;
  TransactionLink: any;
}
