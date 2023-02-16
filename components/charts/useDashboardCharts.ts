export default function useDashboardCharts(theme: Record<string, string>) {
  return {
    totalValue: {
      labels: ["April", "May", "June", "July", "August"],
      datasets: [
        {
          data: [
            (100000 + (0.02 * 100000)) / 1000,
            (100000 + (0.03 * 100000)) / 1000,
            (100000 + (0.04 * 100000)) / 1000,
            (100000 + (0.05 * 100000)) / 1000,
            (100000 + (0.06 * 100000)) / 1000,
          ],
        },
      ],
    },
    growthDiff: [
      {
        name: "Principal",
        amount: 100000,
        color: theme["color-primary-400"],
        legendFontColor:  theme["color-primary-400"],
        legendFontSize: 15,
      },
      {
        name: "Interest",
        amount: 6000,
        color:  theme["color-success-400"],
        legendFontColor: theme["color-success-400"],
        legendFontSize: 15,
      },
    ],
    chartConfig: {
      backgroundColor: theme["color-primary-default"],
      backgroundGradientFrom: theme["color-primary-default"],
      backgroundGradientTo: theme["color-primary-400"],
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = .1) => theme[`color-info-400`],
      labelColor: (opacity = 1) =>  theme[`color-info-400`],
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: theme[`color-info-400`],
      },
    },
  };
}
