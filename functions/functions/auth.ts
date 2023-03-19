import cmds from "../cmds";

import { routes } from "../../constants";

export default {
  *signIn() {
    yield cmds.navigate(routes.DASHBOARD_ROUTE);
  },
  *signUp() {
    // const {
    //   signUpAddress,
    //   signUpDate,
    //   signUpEmail,
    //   signUpHasServedAsPlaintiff,
    //   signUpLegalCellPhone,
    //   signUpLegalFirstName,
    //   signUpLegalLastName,
    //   signUpLegalSocialSecurityNumber,
    //   signUpPassword,
    //   signUpSignature,
    //   signUpTaxFilingStatus,
    //   signUpCommittedPrinciple,
    // }: IPropertyProsSignUpState = yield cmds.reduxGetState("signUp");
    const {
      signUpAddress,
      signUpDate,
      signUpEmail,
      signUpHasServedAsPlaintiff,
      signUpLegalCellPhone,
      signUpLegalFirstName,
      signUpLegalLastName,
      signUpLegalSocialSecurityNumber,
      signUpPassword,
      signUpSignature,
      signUpTaxFilingStatus,
      signUpCommittedPrinciple,
    }: any = testSignupValues;

    yield cmds.saveNotePurchaseAgreement({
      payload: {
        fundsCommitted: signUpCommittedPrinciple,
        firstName: signUpLegalFirstName,
        lastName: signUpLegalLastName,
        homeAddress: signUpAddress,
        phoneNumber: signUpLegalSocialSecurityNumber,
        socialSecurity: signUpLegalSocialSecurityNumber,
        user: {
          emailAddress: signUpEmail,
          password: signUpPassword,
        },
      },
    });

    yield cmds.set

    yield cmds.navigate(routes.DASHBOARD_ROUTE);
  },
};

const testSignupValues = {
  signUpAddress: "40942 Belleray Ave Murrieta CA 92562",
  signUpEmail: "propertyprosdemo@gmail.com",
  signUpLegalCellPhone: "9512493842",
  signUpLegalFirstName: "John",
  signUpLegalLastName: "Doe",
  signUpLegalSocialSecurityNumber: "123456789",
  signUpPassword: "test",
  signUpSignature: true,
  signUpTaxFilingStatus: "Single",
};
