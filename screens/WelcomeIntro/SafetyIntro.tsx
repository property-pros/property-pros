import React, { FunctionComponent, ReactElement } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import IntroItem from "./IntroItem";
import { useWizard } from "react-use-wizard";
import { IPropertyProsIntroSafetyProps } from "../../interface/interfaces";
import { themedStyles } from "../styles";

const SafetyIntro: FunctionComponent<
  IPropertyProsIntroSafetyProps
> = (): ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <IntroItem title="Safety">
      <Text style={styles.authLabel} category="p1" status="control">
        100% of the principle investment at 100% of the accumulated Interest are
        secured in whole by the physical real estate that is linked to their
        investment. Additionally, the property pros holds FDIC insured, interest
        bearing cash reserves at Wells Fargo Bank at all times and guarantees
        declared returns.
      </Text>
    </IntroItem>
  );
};

export default SafetyIntro;
