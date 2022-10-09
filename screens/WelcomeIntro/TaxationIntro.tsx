import { FunctionComponent, ReactElement } from "react";
import {  Text, useStyleSheet } from "@ui-kitten/components";
import { IPropertyProsIntroDurationProps } from "../../interface/interfaces";
import IntroItem from "./IntroItem";
import {themedStyles} from "../styles";

const DurationIntro: FunctionComponent<
  IPropertyProsIntroDurationProps
> = (): ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <IntroItem title="Taxation">
      <Text style={styles.authLabel} category="s1" status="control">
        Interest paid is treated as ordinary income and subject to form 1099.
        If however the investor elects to receive interest only and reinvests
        entire principle for additional ongoing term, the amount recieved
        can be considered a return on principle payment and defer tax
        liability up to 8 years from inception or until closing investment,
        whichever comes first.
      </Text>
    </IntroItem>
  );
};

export default DurationIntro;