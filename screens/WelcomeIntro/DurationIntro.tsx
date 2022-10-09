import { FunctionComponent, ReactElement } from "react";
import { Text, useStyleSheet } from "@ui-kitten/components";
import { IPropertyProsIntroDurationProps } from "../../interface/interfaces";
import IntroItem from "./IntroItem";
import { themedStyles } from "../styles";

const DurationIntro: FunctionComponent<
  IPropertyProsIntroDurationProps
> = (): ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <IntroItem title="Duration">
      <Text style={styles.authLabel} category="s1" status="control">
        Investment completion/maturity is the closing date of the sale of the
        property linked to the investment. The typeical timeline is 3-4 months
        from intitial receipt of funds. Maximum timeline is 6 months.
      </Text>
    </IntroItem>
  );
};

export default DurationIntro;
