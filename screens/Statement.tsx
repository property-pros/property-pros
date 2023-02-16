import * as Print from "expo-print";
import { useEffect, useState } from "react";
import { View } from "react-native";
import PdfViewer from "../components/PdfViewer";

const MyComponent = () => {
  const [pdfUri, setPdfUri] = useState("");

  useEffect(() => {
    try {
      const html = `
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="text-align: center;">
        <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
          Hello Expo!
        </h1>
      </body>
    </html>
      `;
      Print.printToFileAsync({
        html,
        base64: true,
      }).then(({ base64 }) => {
        setPdfUri(base64!);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <View>{pdfUri != "" && <PdfViewer base64Conent={pdfUri} />}</View>;
};

export default MyComponent;
