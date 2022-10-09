import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { default as PdfViewer } from "../components/PdfViewer";
import { Button } from "@ui-kitten/components";
import useNoteServiceAgreement from "../hooks/useNoteServiceAgreement";
import { useMemo, useState, useEffect } from "react"

export default function TabOneScreen({ navigation }: any) {
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
