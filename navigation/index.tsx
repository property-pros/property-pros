/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { } from "react-router";
import { NativeRouter, Navigate, Route, Routes } from "react-router-native";
import NotePurchaseAgreementViewer from "../components/NotePurchaseAgreementViewer";
import {
  DASHBOARD_ROUTE, NOTE_PURCHASE_AGREEMENT_VIEW_ROUTE, SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  STATEMENT_VIEW_ROUTE,
  WELCOME_INTRO_ROUTE
} from "../constants/Routes";
import Dashboard from "../screens/Dashboard";
import ScreenWrapper from "../screens/ScreenWrapper";
import Login from "../screens/SignIn";
import Register from "../screens/SignUp";
import Statement from "../screens/Statement";
import WelcomeIntro from "../screens/WelcomeIntro";

export default function navigation() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Navigate to={SIGN_IN_ROUTE} />} />
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
          path={STATEMENT_VIEW_ROUTE}
          element={<ScreenWrapper component={Statement} />}
        />
        <Route
          path={NOTE_PURCHASE_AGREEMENT_VIEW_ROUTE}
          element={<ScreenWrapper component={NotePurchaseAgreementViewer} />}
        />
        <Route path="*" element={<Navigate to={SIGN_IN_ROUTE} />} />
      </Routes>
    </NativeRouter>
  );
}

export { Link } from "react-router-native";
