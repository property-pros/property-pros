import {
  Button,
  Icon,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import React, { FunctionComponent, ReactElement } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { ProfileAvatar } from "../../components/profile-avatar.component";
import { useAuth } from "../../hooks";
import { RegistrationEntryLink } from "../../navigation/Links";
import { themedStyles as theme } from "../styles";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import { PersonIcon } from "./extra/icons";

const SignInScreen: FunctionComponent<
  IPropertyProseSignInProps
> = (): ReactElement => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const {
    signIn,
    setSignInPassword,
    setSignInEmail,
    signInEmail,
    signInPassword,
  } = useAuth();

  const styles = useStyleSheet({ ...theme, ...themedStyles });

  const onForgotPasswordButtonPress = (): void => {
    // navigation && navigation.navigate("ForgotPassword");
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props: any): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={styles.container} testID="signIn">
      <View style={styles.headerContainer}>
        <ProfileAvatar
          style={styles.profileAvatar as any}
          resizeMode="center"
          source={require("../../assets/images/logo.png")}
        />
        <Text style={styles.authLabel} category="s1" status="control">
          Sign in to your Property Pros account
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          autoCapitalize="none"
          placeholder="Email"
          accessoryRight={PersonIcon as any}
          value={signInEmail}
          onChangeText={setSignInEmail}
        />
        <Input
          style={styles.passwordInput}
          placeholder="Password"
          accessoryRight={renderPasswordIcon}
          value={signInPassword}
          secureTextEntry={!passwordVisible}
          onChangeText={setSignInPassword}
        />


        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance="ghost"
            status="basic"
            onPress={onForgotPasswordButtonPress}
          >
            Forgot your password?
          </Button>
        </View>
      </Layout>
      <Button style={styles.signInButton} onPress={signIn} size="giant" testID="signInButton">
        SIGN IN
      </Button>
      <Button style={styles.signUpButton} appearance="ghost" status="basic" testID="signUpButton">
        <RegistrationEntryLink>
          <Text>Don't have an account? Create</Text>
        </RegistrationEntryLink>
      </Button>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: 288,
    backgroundColor: "color-primary-default",
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
