import { by, device, expect } from "detox";
import "jest-extended";
import { signinActions, signupActions } from "../state";

describe("Sign Up flow", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should show signin screan", async () => {
    await expect(element(by.id("signIn"))).toBeVisible();
  });

  it("should show signup screen after tapping signup button", async () => {
    await element(by.id("signUpButton")).tap();
    await expect(element(by.id("signUpStep1"))).toBeVisible();
  });

  it("should navigate to sign up step 2 after tapping continue", async () => {
    await element(by.id("signUpContinueButton")).tap();
    await expect(element(by.id("signUpStep2"))).toBeVisible();
  });

  it("should navigate to sign up step 3 after tapping continue", async () => {
    await element(by.id("signUpContinueButton")).tap();
    await expect(element(by.id("signUpStep3"))).toBeVisible();
  });

  it("should call signUp action after tapping continue", async () => {
    jest.spyOn(signupActions, "signUp");
    await element(by.id("signUpContinueButton")).tap();
  });

  it("should call signUp action after tapping continue", async () => {
    jest.spyOn(signupActions, "signUp");
    await element(by.id("signUpContinueButton")).tap();
    expect(signupActions.signUp).toHaveBeenCalledEventually();
  });
});

describe("Sign In flow", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should show sign in screen", async () => {
    await expect(element(by.id("signIn"))).toBeVisible();
  });

  it("should navigate to dashboard after tapping sign in button", async () => {
    await element(by.id("signInButton")).tap();
    await expect(element(by.id("dashboard"))).toBeVisible();
  });

  it("should call signIn action after tapping sign in button", async () => {
    jest.spyOn(signinActions, "signIn");
    await element(by.id("signInButton")).tap();
    expect(signinActions.signIn).toHaveBeenCalledEventually();
  });
});
