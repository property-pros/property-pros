import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Button } from "@ui-kitten/components";
import useNoteServiceAgreement from "../hooks/useNoteServiceAgreement";
import { useMemo, useState, useEffect } from "react";

import PDFReader from "@hashiprobr/expo-pdf-reader";

export default function TabOneScreen({ doc }: any) {
  const [docSource, setDocSource] = useState("data:application/pdf;base64,");
  const functions = useNoteServiceAgreement();

  useEffect(() => {
    (async () => {
      const doc = (await functions.getNotePurchaseAgreementDoc()) as Buffer;

      setDocSource(`data:application/pdf;base64,${doc.toString("base64")}`);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <PDFReader source={{ base64: docSource }} />
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
