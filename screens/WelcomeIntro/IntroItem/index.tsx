import React, { FunctionComponent, ReactElement, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "../../SignUp/extra/3rd-party";
import { useNavigation } from "../../../hooks";
import { RegistrationEntryLink } from "../../../navigation/Links";
import { IPropertyProsIntroItemProps } from "../../../interface/interfaces";
import { useWizard } from "react-use-wizard";
import * as Animatable from "react-native-animatable";

const IntroItem: FunctionComponent<IPropertyProsIntroItemProps> = ({
  title,
  children,
}): ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { openSignInScreen } = useNavigation();
  const wizard = useWizard();
  const dimensions = useWindowDimensions();
  const windowHeight = dimensions.height;
  let headerHeight = windowHeight / 2;
  let header: any = useRef(null);

  return (
    <KeyboardAvoidingView style={styles.mainContentContainer}>
      <Animatable.View
        ref={header}
        animation="lightSpeedIn"
        easing={"ease-out-back"}
        style={{
          ...styles.headerContainer,
          height: headerHeight,
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <View style={styles.headerMainContainer}>
          <Text category="h1" status="control">
            {title}
          </Text>
          {children}
        </View>
        <Button style={styles.signUpButton} appearance="ghost" status="basic">
          <RegistrationEntryLink>
            <Text>I'm ready to open my account.</Text>
          </RegistrationEntryLink>
        </Button>
      </Animatable.View>
      <Layout style={styles.formContainer} level="1">
        <Button
          style={styles.signInButton}
          onPress={async () => {
            await header?.current?.lightSpeedOut(500);
            wizard.nextStep();
          }}
          size="giant"
        >
          Tell me more
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

export default IntroItem;

const themedStyles = StyleService.create({
  mainContentContainer: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    backgroundColor: "color-primary-default",
  },
  headerMainContainer: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 12,
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
