import { FunctionComponent, ReactElement } from "react";
import {
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { IPropertyProsIntroQualificationProps } from "../../interface/interfaces";
import IntroItem from "./IntroItem";
import {themedStyles} from "../styles";

const QualificationIntro: FunctionComponent<
IPropertyProsIntroQualificationProps
> = (): ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <IntroItem title="Qualification">
      <Text style={styles.authLabel} category="s1" status="control">
        Open to individual investors only (no entities).
        Minimum Investment amount is $100,000.00 USD.
        All investment capital must be in cash or check.
        No "Tax Qualified" money of any kind accepted.
      </Text>
    </IntroItem>
  );
};

export default QualificationIntro;