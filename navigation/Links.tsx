import {
  ComponentProps,
  FunctionComponent,
  FunctionComponentElement,
  PropsWithChildren,
} from "react";
import { Link } from "react-router-native";
import {
  SIGN_IN_ROUTE,
  DASHBOARD_ROUTE,
  SIGN_UP_ROUTE,
  NOTE_PURCHASE_AGREEMENT_VIEW_ROUTE,
  STATEMENT_VIEW_ROUTE,
} from "../constants/Routes";

export const RegistrationEntryLink: FunctionComponent = ({
  children,
}): FunctionComponentElement<void> => (
  <Link replace={true} to={SIGN_UP_ROUTE}>
    {children}
  </Link>
);
export const LoginEntryLink: FunctionComponent = ({
  children,
}): FunctionComponentElement<void> => (
  <Link to={SIGN_IN_ROUTE}>{children}</Link>
);
export const DashboardEntryLink: FunctionComponent = ({
  children,
}): FunctionComponentElement<void> => (
  <Link to={DASHBOARD_ROUTE}>{children}</Link>
);

export const NotePurchaseAgreementEntryLink: FunctionComponent = ({
  children,
}): FunctionComponentElement<void> => (
  <Link to={NOTE_PURCHASE_AGREEMENT_VIEW_ROUTE}>{children}</Link>
);

export const StatementEntryLink: FunctionComponent<{ key: string }> = ({
  children,
  key,
}): FunctionComponentElement<{ key: string }> => (
  <Link to={`${STATEMENT_VIEW_ROUTE}/${key}`}>{children}</Link>
);
