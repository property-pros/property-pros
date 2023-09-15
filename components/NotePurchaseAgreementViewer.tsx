import { StyleSheet } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useParams } from "react-router-native";

import { default as PdfViewer } from "../components/PdfViewer";
import useNoteServiceAgreement from "../hooks/useNotePurchaseAgreement";
import { View } from "./Themed";

export default function NotePurchaseAgreementViewer({ navigation }: any) {
  const { notePurchaseAgreementId } = useParams();
  const [doc, setDoc] = useState<Buffer>();
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const functions = useNoteServiceAgreement();

  useEffect(() => {
    (async () => {
      SplashScreen.preventAutoHideAsync();
      if (!notePurchaseAgreementId) return;
      const doc = (await functions.getNotePurchaseAgreementDoc(
        notePurchaseAgreementId
      )) as Buffer;

      setDoc(doc);
      setLoadingComplete(true);
      await SplashScreen.hideAsync();
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoadingComplete ? <PdfViewer doc={doc} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
