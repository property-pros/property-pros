import { testFn, args } from "effects-as-data/test";
import cmds from "../cmds";
import navigation from ".";
import { routes } from "../../constants";

const testOpenSignUpScreen = testFn(navigation.openSignUpScreen);

test(
  "openSignUpScreen()",
  testOpenSignUpScreen(() => {

    return args()
    .cmd(cmds.call(navigation.navigate, routes.SIGN_UP))
    .returns()
  })
);

const testOpenSignInScreen = testFn(navigation.openSignInScreen);

test(
  "openSignInScreen()",
  testOpenSignInScreen(() => {

    return args()
    .cmd(cmds.call(navigation.navigate, routes.SIGN_IN))
    .returns()
  })
);

const testOpenDashboardScreen = testFn(navigation.openDashboardScreen);

test(
  "openDashboardScreen()",
  testOpenDashboardScreen(() => {

    return args()
    .cmd(cmds.call(navigation.navigate, routes.DASHBOARD))
    .returns()
  })
);