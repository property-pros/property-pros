import React, { FunctionComponent, ReactElement } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
  BottomNavigation,
} from "@ui-kitten/components";
import { useNavigation, useAuth } from "../../hooks";
import { RegistrationEntryLink } from "../../navigation/Links";
import { IPropertyProsIntroEarningsProps } from "../../interface/interfaces";
import { useWizard } from "react-use-wizard";
import IntroItem from "./IntroItem";
import { themedStyles } from "../styles";

const EarningsIntro: FunctionComponent<
  IPropertyProsIntroEarningsProps
> = (): ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { openSignInScreen } = useNavigation();
  const wizard = useWizard();

  return (
    <IntroItem title="Earnings">
      <Text style={styles.authLabel} category="s1" status="control">
        Fixed interest of (12% yearly) = (1% monthly) = (.03333% daily)
        Regardless of any negative changes in the real estate market, any other
        economic down turn, recession, depressison or anything else. Interest
        accumulates daily beginning on the date the funds clear.
      </Text>
    </IntroItem>
  );
};

export default EarningsIntro;
