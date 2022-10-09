/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NativeRouter, Routes, Route, Navigate } from "react-router-native";
import {} from "react-router";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/SignIn";
import Register from "../screens/SignUp";
import WelcomeIntro from "../screens/WelcomeIntro";
import ScreenWrapper from "../screens/ScreenWrapper";
import {
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  DASHBOARD_ROUTE,
  WELCOME_INTRO_ROUTE
} from "../constants/Routes";

export default function navigation() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Navigate to={WELCOME_INTRO_ROUTE} />} />
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
        <Route path="*" element={<Navigate to={SIGN_IN_ROUTE} />} />
      </Routes>
    </NativeRouter>
  );
}

export { Link } from "react-router-native";
