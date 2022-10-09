import { FunctionComponent, ReactElement } from "react";
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import { IPropertyProsIntroDurationProps } from "../../interface/interfaces";
import IntroItem from "./IntroItem";
import {themedStyles} from "../styles";

const DurationIntro: FunctionComponent<
  IPropertyProsIntroDurationProps
> = (): ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <IntroItem title="Liquidity">
      <Text style={styles.authLabel} category="s1" status="control">
        Principle and interest become 100% liquid and payable to investor
        upon maturity of the investment term. (3-6 month from inception)
        the property pros will make special considerations to help them.
        If approved, principle wwill be returned & interest will be forfeited.
      </Text>
    </IntroItem>
  );
};

export default DurationIntro;
