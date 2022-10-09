import { FunctionComponent, ReactElement } from "react";
import { View } from "react-native";
import {
  StyleService,
  Text,
  useStyleSheet,
  Input,
  CheckBox,
  Layout,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { IInvestorConfidentialInfoStep } from "../../../interface/interfaces";
import SignUpStep from "./SignUpStep";
import { themedStyles as theme } from "../../styles";
import { ProfileAvatar } from "../../../components/profile-avatar.component";
import { useAuth } from "../../../hooks";
import { PersonIcon } from "../extra/icons";

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
