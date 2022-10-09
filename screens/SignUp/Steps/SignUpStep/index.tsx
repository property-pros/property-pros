import React, { FunctionComponent, ReactElement, useRef } from "react";
import { View, useWindowDimensions } from "react-native";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "../../extra/3rd-party";
import { useNavigation } from "../../../../hooks";
import { RegistrationEntryLink } from "../../../../navigation/Links";
import { IPropertyProsSignUpItemProps } from "../../../../interface/interfaces";
import { useWizard } from "react-use-wizard";
import * as Animatable from "react-native-animatable";
import { ProfileAvatar } from "../../../../components/profile-avatar.component";
import { themedStyles as theme } from "../../../styles";

const SignUpStep: FunctionComponent<IPropertyProsSignUpItemProps> = ({
  title,
  description,
  children,
}): ReactElement => {
  const styles = useStyleSheet({ ...themedStyles, ...theme });
  const { openSignInScreen } = useNavigation();
  const wizard = useWizard();
  const dimensions = useWindowDimensions();
  const windowHeight = dimensions.height;
  let headerHeight = windowHeight / 2;
  let header: any = useRef(null);

  const {
    isLastStep,
    handleStep,
  } = useWizard();

  // This handler is optional
  handleStep(() => {
    if (isLastStep) {
      
    }
  });

  return (
    <KeyboardAvoidingView style={styles.mainContentContainer}>
      <Animatable.View
        ref={header}
        animation="lightSpeedIn"
        easing={"ease-out-back"}
        style={{
          ...styles.headerContainer,
          // height: headerHeight,
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <View style={styles.headerMainContainer}>
          <Text category="h5" status="control">
            {title}
          </Text>
          <ProfileAvatar
            style={styles.signUpLogo as any}
            resizeMode="contain"
            source={require("../../../../assets/images/logo.png")}
          />
          {description}
        </View>
      </Animatable.View>
      <Layout style={styles.formContainer} level="1">
        {children}
        <Button
          style={styles.signInButton}
          onPress={async () => {
            await header?.current?.lightSpeedOut(500);
            wizard.nextStep();
          }}
          size="giant"
        >
          Continue
        </Button>
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance="ghost"
            status="basic"
            onPress={openSignInScreen}
          >
            Already open an account? Sign In
          </Button>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default SignUpStep;

const themedStyles = StyleService.create({
  mainContentContainer: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    backgroundColor: "color-primary-default",
  },
  headerMainContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    marginVertical: 16,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "color-primary-default",
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },

  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
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
