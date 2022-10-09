import React, { FunctionComponent, ReactElement, ComponentProps } from "react";
import { StyleSheet, ImageProps } from "react-native";
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { RenderProp } from "@ui-kitten/components/devsupport";
import { SafeAreaLayout } from "./SafeAreaLayout";
import { MenuGridList } from "../nav/MenuGridList";
import { MenuIcon } from "../Icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { data } from "./data";

export const Layout: FunctionComponent = ({ children }) => {
  // const onItemPress = (index: number): void => {
  //   navigation.navigate(data[index].route);
  // };

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon as RenderProp<Partial<ImageProps>>}
      // onPress={navigation.toggleDrawer}
    />
  );

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaLayout style={styles.safeArea} insets="top">
          <TopNavigation
            title="Property Pros"
            accessoryLeft={renderDrawerAction}
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
