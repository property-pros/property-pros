import { StyleSheet, Text } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { View } from "../components/Themed";
import WebView from "react-native-webview";

export default function PdfViewer({ doc, base64Conent }: any) {
console.log("getting base64 content");
  let content = base64Conent || doc?.toString("base64");
  console.log("content is: ", content);
  console.log("pdf viewer");
  return content != null && content != "" ? (
    <View style={{ flex: 1 }}>
      <PDFReader
        source={{
          base64: `data:application/pdf;base64,${content}`,
        }}
      />
    </View>
  ) : (
    <View>
      <Text>doc not found</Text>
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
