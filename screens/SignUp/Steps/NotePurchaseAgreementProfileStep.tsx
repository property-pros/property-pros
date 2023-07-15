import {
  Input,
  StyleService,
  useStyleSheet
} from "@ui-kitten/components";
import { FunctionComponent, ReactElement } from "react";
import { View } from "react-native";
import { useAuth } from "../../../hooks";
import { INotePurchaseAgreementStepProps } from "../../../interface/interfaces";
import { themedStyles as theme } from "../../styles";
import { PersonIcon } from "../extra/icons";
import SignUpStep from "./SignUpStep";

const NotePurchaseAgreementProfileStep: FunctionComponent<
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
  } = useAuth();

  return (
    <SignUpStep title="Note Purchase Agreement" testID="signUpStep1">
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
      </View>
    </SignUpStep>
  );
};

export default NotePurchaseAgreementProfileStep;

const componentStyles = StyleService.create({
 
});
