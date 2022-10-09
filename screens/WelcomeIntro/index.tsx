import { Wizard, useWizard } from "react-use-wizard";
import SignUpScreen from "../SignUp";
import QualificationIntro from "./QualificationIntro";
import EarningsIntro from "./EarningsIntro";
import SafetyIntro from "./SafetyIntro";
import DurationIntro from "./DurationIntro";
import LiquidityIntro from "./LiquidityIntro";
import TaxationIntro from "./TaxationIntro";

export default (props: IPropertyProsProps) => {
  return (
    <Wizard startIndex={0}>
      <QualificationIntro />
      <EarningsIntro />
      <SafetyIntro />
      <DurationIntro />
      <LiquidityIntro />
      <TaxationIntro />
      <SignUpScreen {...props} />
    </Wizard>
  );
};
