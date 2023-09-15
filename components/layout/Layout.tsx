import React, { FunctionComponent, ReactElement, ComponentProps } from "react";
import { StyleSheet, ImageProps, GestureResponderEvent } from "react-native";
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { RenderProp } from "@ui-kitten/components/devsupport";
import { SafeAreaLayout } from "./SafeAreaLayout";
import { MenuGridList } from "../nav/MenuGridList";
import { ArrowIosBackIcon, MenuIcon } from "../Icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { useNavigate, useNavigation, useLocation } from "react-router-native";
import useNavigation from "../../hooks/useNavigation";
// import { data } from "./data";

export const Layout: FunctionComponent = (props) => {
  const { children } = props;
  console.log("props: ", Object.keys(props));
  const navigation = useNavigation();

  const onBackPress = (e: GestureResponderEvent): void => {
    navigation.goBack();
  };

  const renderDrawerAction = (): React.ReactElement => (
    <>
      <TopNavigationAction
        icon={MenuIcon as RenderProp<Partial<ImageProps>>}
        // onPress={navigation.toggleDrawer}
      />
    </>
  );

  const renderBackAction = (): React.ReactElement => (
    <>
      <TopNavigationAction
        icon={ArrowIosBackIcon as RenderProp<Partial<ImageProps>>}
        onPress={onBackPress}
      />
    </>
  );

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaLayout style={styles.safeArea} insets="top">
          <TopNavigation
            title="Property Pros"
            accessoryLeft={renderBackAction}
            accessoryRight={renderDrawerAction}
          />
          <Divider />
          {children}
        </SafeAreaLayout>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
