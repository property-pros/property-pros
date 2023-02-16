import { LineChart } from "react-native-chart-kit";
import { View, useWindowDimensions } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import useDashboardCharts from "./useDashboardCharts";

export default ({
  containerStyle = {},
  style = {
    backgroundColor: "transparent",
    marginHorizontal: 8,
    borderRadius: 16,
    paddingTop: 30,
  },
}) => {
  const theme = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const { chartConfig, totalValue } = useDashboardCharts(theme);
  console.log("total value: ", totalValue);
  return (
    <View style={containerStyle}>
      <LineChart
        chartConfig={chartConfig}
        data={totalValue}
        width={screenWidth - screenWidth * 0.05} // from react-native
        height={320}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        style={style}
      />
    </View>
  );
};
