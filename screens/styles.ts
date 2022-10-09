import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";

export const themedStyles = StyleService.create({
  authLabel: {
    marginTop: 16,
    lineHeight: 32,
  },

  profileAvatar: {
    width: 190,
    height: 190,
    // borderRadius: 170,
    alignSelf: "center",
    backgroundColor: "transparent",
    // tintColor: "color-primary-default",
  },

  signUpLogo: {
    width: 40,
    height: 40,
    borderRadius: 0,
    backgroundColor: "transparent",
    // tintColor: "color-primary-default",
  },

  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formItem: {
    marginBottom: 8
  }
});
