import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import {
  Avatar,
  AvatarProps,
  ButtonElement,
  ButtonProps,
} from "@ui-kitten/components";

export interface ProfileAvatarProps extends AvatarProps {
  editButton?: () => ButtonElement;
}

export const ProfileAvatar = (
  props: ProfileAvatarProps
): React.ReactElement<ViewProps> => {
  const renderEditButtonElement = (): ButtonElement => {
    let buttonElement: React.ReactElement<ButtonProps> = (() => {}) as any;

    if (typeof props.editButton !== "undefined") {
      buttonElement = props.editButton();
    }

    return React.cloneElement(buttonElement, {
      style: [buttonElement.props.style, styles.editButton],
    });
  };

  const { style, editButton, ...restProps } = props as any;

  return (
    <View style={style}>
      <Avatar style={[style, styles.avatar]} {...restProps} shape="rounded" />
      {/* {editButton && renderEditButtonElement()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
  },
  editButton: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
  },
});
