import PDFReader from "@hashiprobr/expo-pdf-reader";
import { StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";

export default function TabOneScreen({ doc, base64Conent }: any) {
  let content = base64Conent || doc?.toString("base64");

  return content != null && content != "" ? (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <PDFReader      
          source={{            
            base64: `data:application/pdf;base64,${content}`,
          }}
        />
      </View>
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
