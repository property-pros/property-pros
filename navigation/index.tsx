/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {} from "react-router";
import { NativeRouter, Navigate, Route, Routes } from "react-router-native";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import NotePurchaseAgreementViewer from "../components/NotePurchaseAgreementViewer";
import {
  DASHBOARD_ROUTE,
  NOTE_PURCHASE_AGREEMENT_VIEW_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  STATEMENT_VIEW_ROUTE,
  TRANSACTIONS_VIEW_ROUTE,
  WELCOME_INTRO_ROUTE,
} from "../constants/Routes";
import Dashboard from "../screens/Dashboard";
import ScreenWrapper from "../screens/ScreenWrapper";
import Login from "../screens/SignIn";
import Register from "../screens/SignUp";
import Statement from "../screens/Statement";
import Transactions from "../screens/Transactions";
import WelcomeIntro from "../screens/WelcomeIntro";

export default function navigation() {
  const [deepLinkRoute, setDeepLinkRoute] = useState(null);

  useEffect(() => {
    const handleDeepLink = (event) => {
      let data = Linking.parse(event.url);
      // Handle the deep link (e.g., navigate to a certain screen)

      if (data && data.path) {
        setDeepLinkRoute(data.path);
      }
    };

    // Listen for incoming links
    const sub = Linking.addEventListener("url", handleDeepLink);

    // Check if the app was opened by a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <NativeRouter>
    <Navigate to={deepLinkRoute} />
      <Routes>
        <Route path="/" element={<Navigate to={TRANSACTIONS_VIEW_ROUTE} />} />
        <Route
          path={TRANSACTIONS_VIEW_ROUTE}
          element={<ScreenWrapper component={Transactions} />}
        />
        <Route
          path={SIGN_IN_ROUTE}
          element={<ScreenWrapper component={Login} />}
        />
        <Route
          path={SIGN_UP_ROUTE}
          element={<ScreenWrapper component={Register} />}
        />
        <Route
          path={WELCOME_INTRO_ROUTE}
          element={<ScreenWrapper component={WelcomeIntro} />}
        />
        <Route
          path={DASHBOARD_ROUTE}
          element={<ScreenWrapper component={Dashboard} />}
        />
        <Route
          path={`${STATEMENT_VIEW_ROUTE}/:statementId`}
          element={<ScreenWrapper component={Statement} />}
        />
        <Route
          path={NOTE_PURCHASE_AGREEMENT_VIEW_ROUTE}
          element={<ScreenWrapper component={NotePurchaseAgreementViewer} />}
        />
        <Route
          path={`${NOTE_PURCHASE_AGREEMENT_VIEW_ROUTE}/:notePurchaseAgreementId`}
          element={<ScreenWrapper component={NotePurchaseAgreementViewer} />}
        />
        <Route path="*" element={<Navigate to={SIGN_IN_ROUTE} />} />
      </Routes>
    </NativeRouter>
  );
}

export { Link } from "react-router-native";
