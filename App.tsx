import "./globals";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { Layout } from "./components/layout/Layout";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { getStore } from "./state/store";
import theme from "./themes/property-pros-theme";

export default function App() {
  console.log("here");
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={getStore()}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <Layout>
            <Navigation />
            <StatusBar />
          </Layout>
        </ApplicationProvider>
      </Provider>
    );
  }
}
