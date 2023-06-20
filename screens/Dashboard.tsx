import {
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Text
} from "@ui-kitten/components";
import { ComponentProps } from "react";
import { useEffect, useState, useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LineChart, PieChart } from "../components/charts";
import { useNavigation } from "../hooks";
import useNoteServiceAgreement from "../hooks/useNoteServiceAgreement";
import { GetNotePurchaseAgreementsResponse } from "property-pros-sdk/api/note_purchase_agreement/v1/note_purchase_agreement";

interface Data {
  id? : string,
  title: string,
  description: string
}
const statements:Data[] = [
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
  const { getNotePurchaseAgreements } = useNoteServiceAgreement();
  const [npas, setNpas] = useState<Data[]>([]);

  const fetchAgreements = useCallback(async () => {
    try {
      const agreements: GetNotePurchaseAgreementsResponse = await getNotePurchaseAgreements();
      console.log("agreements are: ")
      console.log(agreements)
      let docs:Data[] = []
      agreements.payload?.payload.map(agreement => {
        let date = new Date(agreement.createdOn)
        docs.push({
          id: agreement.id,
          title: `Note Purchase Agreement ${date.toLocaleDateString()}`,
          description: "Note Purchase Agreement"
        })
      })
      console.log("here")
      console.log(docs)
      setNpas(docs)
    } catch (error) {
      console.error("error fetching note purchase agreements for user ",error);
    }
  }, [])

  useEffect(() => {
    fetchAgreements()
  }, [fetchAgreements]);

  const renderStatementAccessory = (props: any) => (
    <Button size="tiny" onPress={() => nav.openStatementScreen()}>
      <Text>VIEW</Text>
    </Button>
  );

  const renderNpaAccessory = (agreementId: string)  => {
    return (
      <Button size="tiny" onPress={() => nav.openAgreementScreen(agreementId)}>
        <Text>VIEW</Text>
      </Button>
    );
  }

  const renderItemIcon = (props: any) => <Icon {...props} name="file" />;
  const renderNpa = ({item, index}: any) => (
    <ListItem
    title={`${item.title}`}
    description={`${item.description}`}
    accessoryLeft={renderItemIcon}
    accessoryRight={()=> renderNpaAccessory(item.id)}
  />
  )
  const renderStatement = ({ item, index }: any) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.description}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderStatementAccessory}
    />
  );

  return (
    <>
      <DashboardSection>
        <DasboardHeading>My Documents</DasboardHeading>
        <List data={npas} renderItem={renderNpa} />
        <List data={statements} renderItem={renderStatement} />
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
