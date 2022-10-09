import { FunctionComponent, ReactElement } from "react";
import { View } from "react-native";
import {
  StyleService,
  Text,
  useStyleSheet,
  Radio,
  RadioGroup,
} from "@ui-kitten/components";
import { INotePurchaseAgreementStepProps } from "../../../interface/interfaces";
import SignUpStep from "./SignUpStep";
import { themedStyles as theme } from "../../styles";
import { ProfileAvatar } from "../../../components/profile-avatar.component";
import { useAuth } from "../../../hooks";
import { PersonIcon } from "../extra/icons";

const NotePurchaseAgreementStep: FunctionComponent<
  INotePurchaseAgreementStepProps
> = (): ReactElement => {
  const styles = useStyleSheet({ ...theme, ...componentStyles });

  const {
    signUpHasServedAsPlaintiff,
    setSignUpHasServedAsPlaintiff
  } = useAuth();
  return (
    <SignUpStep title="Note Purchase Agreement">
      <View style={styles.formContainer}>
        <Text style={styles.formItem}>
          If Investor has served, is currently serving, or reasonably expects to
          serve as a plaintiff in a lawsuit, arbitration or other legal
          proceeding, please indicate below and attach a supplemental sheet
          describing such lawsuit(s), arbitration(s) or legal proceeding(s).
          Check the appropriate box below:
        </Text>
        <RadioGroup selectedIndex={+signUpHasServedAsPlaintiff} onChange={()=> setSignUpHasServedAsPlaintiff(!signUpHasServedAsPlaintiff)}>
          <Radio
            style={styles.formItem}
          >
            Investor has not served, is not currently serving, and does not
            reasonably expect to serve as a plaintiff in a lawsuit, arbitration
            or other legal proceeding
          </Radio>
          <Radio
            style={styles.formItem}
          >
            Investor has served, is currently serving, and/or reasonably expects
            to serve as a plaintiff in a lawsuit, arbitration or other legal
            proceeding (see attached supplement)
          </Radio>
        </RadioGroup>
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
