import {
  CheckBox, Input, Select,
  SelectItem, StyleService, useStyleSheet
} from "@ui-kitten/components";
import { FunctionComponent, ReactElement } from "react";
import { View } from "react-native";
import { useAuth } from "../../../hooks";
import { INotePurchaseAgreementStepProps } from "../../../interface/interfaces";
import { themedStyles as theme } from "../../styles";
import { PersonIcon } from "../extra/icons";
import SignUpStep from "./SignUpStep";

const NotePurchaseAgreementStep: FunctionComponent<
  INotePurchaseAgreementStepProps
> = (): ReactElement => {
  const styles = useStyleSheet({ ...theme, ...componentStyles });

  const {
    signUpEmail,
    setSignUpEmail,
    signUpPassword,
    setSignUpPassword,
    signUpDate,
    setSignUpDate,
    signUpLegalCellPhone,
    setSignUpLegalCellPhone,
    signUpLegalFirstName,
    setSignUpLegalFirstName,
    signUpLegalLastName,
    setSignUpLegalLastName,
    signUpAddress,
    setSignUpAddress,
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
          autoCapitalize="none"
          label="Email"
          placeholder="Email"
          accessoryRight={PersonIcon as any}
          value={signUpEmail}
          onChangeText={setSignUpEmail}
          style={styles.formItem}
        />

        <Input
          label="Password"
          // style={styles.passwordInput}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="Password"
          // accessoryRight={renderPasswordIcon}
          value={signUpPassword}
          onChangeText={setSignUpPassword}
          style={styles.formItem}
        />

        <Input
          placeholder="Cell Phone"
          label="Cell Phone"
          value={signUpLegalCellPhone}
          onChangeText={setSignUpLegalCellPhone}
          style={styles.formItem}
        />

        <Input
          placeholder="Legal First Name"
          label="Legal First Name"
          value={signUpLegalFirstName}
          onChangeText={setSignUpLegalFirstName}
          style={styles.formItem}
        />

        <Input
          placeholder="Legal Last Name"
          label="Legal Last Name"
          value={signUpLegalLastName}
          onChangeText={setSignUpLegalLastName}
          style={styles.formItem}
        />

        <Input
          placeholder="Address"
          label="Address"
          value={signUpAddress}
          onChangeText={setSignUpAddress}
          style={styles.formItem}
        />

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
          onSelect={setSignUpEmail}
        >
          <SelectItem key="single">Single</SelectItem>
          <SelectItem key="married-filing-jointly">Married filing jointly</SelectItem>
          <SelectItem key="married-filing-separately">Married filing separately</SelectItem>
          <SelectItem key="head-of-household">Head of household</SelectItem>
          <SelectItem key="qualifying-widower">Qualifying widow(er) with dependent child.</SelectItem>
        </Select>
        <Input
          placeholder="Tax Filing Status"
          label="Tax Filing Status"
          value={signUpTaxFilingStatus}
          onChangeText={setSignUpEmail}
          style={styles.formItem}
        />

        <CheckBox
          style={styles.formItem}
          checked={signUpSignature}
          onChange={setSignUpSignature}
        >
          Signature -By Checking this box you authorize your signature to be used to complete the Note Purchase Booklet on your behalf
        </CheckBox>

        {/* <CheckBox
          style={styles.termsCheckBox}
          checked={termsAccepted}
          onChange={(checked: boolean) => setTermsAccepted(checked)}
        >
          {renderCheckboxLabel}
        </CheckBox> */}
      </View>
    </SignUpStep>
  );
};

export default NotePurchaseAgreementStep;

const componentStyles = StyleService.create({
  formContainer: {
    flex: 1,
  },
});
