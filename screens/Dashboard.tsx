import {
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Text
} from "@ui-kitten/components";
import { ComponentProps } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LineChart, PieChart } from "../components/charts";
import { useNavigation } from "../hooks";

const data = [
  {
    title: "Note Purchase Agreement Oct 2022",
    description: "Note purchase agreement from your october investment",
  },
  {
    title: "October 2022",
    description: "Interest Statement for October",
  },
  {
    title: "September 2022",
    description: "Interest Statement for September",
  },
  {
    title: "August 2022",
    description: "Interest Statement for August",
  },
  {
    title: "July 2022",
    description: "Interest Statement for July",
  },
];

export default () => {
  const nav = useNavigation();

  const renderItemAccessory = (props: any) => (
    <Button size="tiny" onPress={() => nav.openStatementScreen()}>
      <Text>VIEW</Text>
    </Button>
  );

  const renderItemIcon = (props: any) => <Icon {...props} name="file" />;

  const renderItem = ({ item, index }: any) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.description}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <>
      <DashboardSection>
        <DasboardHeading>My Documents</DasboardHeading>
        <List data={data} renderItem={renderItem} />
      </DashboardSection>
      <ScrollView>
        <DashboardSection>
          <DasboardHeading>My Account Value</DasboardHeading>
          <LineChart />
        </DashboardSection>
        <DashboardSection>
          <DasboardHeading>My Account Distribution</DasboardHeading>
          <PieChart />
        </DashboardSection>
      </ScrollView>
    </>
  );
};

const DasboardHeading = ({ children }: ComponentProps<any>) => (
  <Text style={styles.dashBoardHeading} category="h6" status="primary">
    {children}
  </Text>
);

const DashboardSection = ({ children }: ComponentProps<any>) => (
  <View style={styles.dashboardSection}>
    {children}
    <Divider style={styles.dashboardDivider} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dashboardSection: {
    marginTop: 15,
  },
  dashboardDivider: {
    marginTop: 15,
  },
  dashBoardHeading: {
    marginLeft: 15,
  },
});
