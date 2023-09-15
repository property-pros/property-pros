import { args, testFn } from "effects-as-data/test";
import { Metadata } from "nice-grpc-common";
import { AuthenticateUserResponse } from "property-pros-sdk/api/auth/v1/auth";
import cmds from "../cmds";
import fns, { authenticateUserOptions, metadataResult } from "./auth";

const testSignin = testFn(fns.signIn);

test(
  "testSignin() should return a list of random users",
  testSignin(() => {
    const response: AuthenticateUserResponse = {
      isAuthenticated: true,
      errorMessage: "",
    };
    let metadata = new Metadata({});

    return args()
      .cmd(cmds.reduxGetState("signIn"))
      .result({
        signInEmail: "testemail",
        signInPassword: "testpassword",
      })
      .cmd(
        cmds.authenticateUser(
          {
            payload: { emailAddress: "testemail", password: "testpassword" },
          },
          authenticateUserOptions
        )
      ) // yield cmd
      .result(response)
      .cmd(cmds.call(metadataResult.get, "authorization"))
      .result(metadataResult)
      .returns(undefined);
  })
);
