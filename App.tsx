import 'node-libs-react-native/globals';
import { StatusBar } from "expo-status-bar";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider } from "react-redux";
import { getStore } from "./state/store";
import { Layout } from "./components/layout/Layout";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import theme from "./themes/property-pros-theme";

export default function App() {
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
