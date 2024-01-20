import {
  CheckBox,
  IndexPath,
  Input,
  Select,
  SelectItem,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { FunctionComponent, ReactElement } from "react";
import { View } from "react-native";
import { useAuth } from "../../../hooks";
import { IInvestorConfidentialInfoStep } from "../../../interface/interfaces";
import { themedStyles as theme } from "../../styles";
import SignUpStep from "./SignUpStep";

const InvestorConfidentialInfoStep: FunctionComponent<
IInvestorConfidentialInfoStep
> = (): ReactElement => {
  const styles = useStyleSheet({ ...theme, ...componentStyles });

  const {
    signUpLegalSocialSecurityNumber,
    setSignUpLegalSocialSecurityNumber,
    signUpSignature,
    setSignUpSignature,
    signUpTaxFilingStatus,
    setSignUpTaxFilingStatus,
    signUpCommittedPrinciple,
    setSignUpCommittedPrinciple
  } = useAuth();
  return (
    <SignUpStep title="Note Purchase Agreement">
      <View style={styles.formContainer}>
        <Input
          placeholder="Social"
          label="Social"
          value={signUpLegalSocialSecurityNumber}
          onChangeText={setSignUpLegalSocialSecurityNumber}
          style={styles.formItem}
        />
        <Select
          label="Tax Filing Status"
          placeholder="Choose One"
          value={signUpTaxFilingStatus}
          onSelect={(value: any) => {
            value = value as IndexPath
            console.log("filing tatus choice: ", value, filingStatusOptions[value.row]);
            setSignUpTaxFilingStatus(filingStatusOptions[value.row]);
          }}
          style={styles.formItem}
        >
          {filingStatusOptions.map((it) => (
            <SelectItem title={it} />
          ))}
        </Select>

        <Input        
          placeholder="Committed Principle"
          label="Committed Principle"
          value={signUpCommittedPrinciple}
          onChangeText={setSignUpCommittedPrinciple}
          style={styles.formItem}
          keyboardType="numeric"
        />
        <CheckBox
          style={styles.formItem}
          checked={signUpSignature}
          onChange={setSignUpSignature}
        >
          Signature
        </CheckBox>
      </View>
    </SignUpStep>
  );
};

const filingStatusOptions = [
  "Single",
  "Married filing jointly",
  "Married filing separately",
  "Head of household",
  "Qualifying widow(er) with dependent child",
];

export default NotePurchaseAgreementStep;

const componentStyles = StyleService.create({});
