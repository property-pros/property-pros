import {
  Button,
  Icon,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import React, { ReactElement } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Wizard } from "react-use-wizard";
import { themedStyles as theme } from "../styles";
import NotePurchaseAgreementLegalAuthStep from "./Steps/NotePurchaseAgreementLegalAuthStep";
import NotePurchaseAgreementPlaintiffStep from "./Steps/NotePurchaseAgreementPlaintiffStep";
import NotePurchaseAgreementProfileStep from "./Steps/NotePurchaseAgreementProfileStep";
import { PlusIcon } from "./extra/icons";

export default ({ navigation }: any): React.ReactElement => {
  const [userName, setUserName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const styles = useStyleSheet({ ...theme, ...themedStyles });

  const onSignUpButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate("SignIn2");
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderEditAvatarButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryRight={PlusIcon as any}
    />
  );

  const renderPasswordIcon = (props: any): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderCheckboxLabel = React.useCallback(
    (evaProps) => (
      <Text {...evaProps} style={styles.termsCheckBoxText}>
        I read and agree to Terms & Conditions
      </Text>
    ),
    []
  );

  return (
    <Wizard startIndex={0} testID={"signUpContainer"} as any>
      <NotePurchaseAgreementProfileStep />
      <NotePurchaseAgreementLegalAuthStep />
      <NotePurchaseAgreementPlaintiffStep />
    </Wizard>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    minHeight: 216,
    backgroundColor: "color-primary-default",
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: "text-hint-color",
    marginLeft: 10,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
