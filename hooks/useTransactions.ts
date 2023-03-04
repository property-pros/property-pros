import { useCallback, useEffect, useState } from "react";
import { } from "../functions/handlers";
import { exchangePublicToken, getLinkToken } from "./thirdParty/plaid";

export default function useTransactions(): UseTransationsResults {
  const [transactions, setTransactions] = useState([]);
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

      const accessToken = await exchangePublicToken(publicToken);

      console.log("accessToken: ", accessToken);
    },
    [transactions]
  );

  const getTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("getting transactions");
      const transactions = await getTransactions();
      setTransactions(transactions);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    transactions,
    loading,
    error,
    onLinkSuccess,
    getTransactions,
    linkToken: token,
  };
}

interface UseTransationsResults {
  transactions: any[];
  loading: boolean;
  error: Error | null;
  getTransactions: () => Promise<void>;
  linkToken: string | null;
  onLinkSuccess: (publicToken: string) => void;
}
