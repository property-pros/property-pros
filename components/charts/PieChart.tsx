import { PieChart } from "react-native-chart-kit";
import { useWindowDimensions, View } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import useDashboardCharts from "./useDashboardCharts";

export default ({ style = {} }) => {
  const theme = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const { growthDiff, chartConfig } = useDashboardCharts(theme);

  return (
    <View style={style}>
      <PieChart
        data={growthDiff}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 50]}
      />
    </View>
  );
};
