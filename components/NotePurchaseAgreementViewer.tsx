import { StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import { default as PdfViewer } from "../components/PdfViewer";
import useNoteServiceAgreement from "../hooks/useNoteServiceAgreement";
import { View } from "./Themed";

export default function NotePurchaseAgreementViewer({ navigation }: any) {
  const [doc, setDoc] = useState<Buffer>();
  const functions = useNoteServiceAgreement();

  useEffect(() => {
    (async () => {
      const doc = (await functions.getNotePurchaseAgreementDoc()) as Buffer;

      setDoc(doc);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <PdfViewer doc={doc} />
      </View>
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
