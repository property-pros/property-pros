import {
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Text,
} from "@ui-kitten/components";
import { GetNotePurchaseAgreementsResponse } from "property-pros-sdk/api/note_purchase_agreement/v1/note_purchase_agreement";
import { ComponentProps, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LineChart, PieChart } from "../components/charts";
import {
  useDocuments,
  useNavigation,
  useNotePurchaseAgreement,
} from "../hooks";

interface Documents {
  id?: string;
  title: string;
  description: string;
}
const statements: Documents[] = [
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
  const { getNotePurchaseAgreements } = useNotePurchaseAgreement();
  const { getUserDocumentsList: getDocumentsList } = useDocuments();
  const [npas, setNpas] = useState<Documents[]>([]);
  const [statements, setStatements] = useState<Documents[]>([]);

  const fetchAgreements = useCallback(async () => {
    try {
      let docs: Documents[] = [];
      const { payload: statementsList } = await getDocumentsList();
      console.log("statements are: ", statementsList);

      const { payload }: GetNotePurchaseAgreementsResponse =
        await getNotePurchaseAgreements();
      console.log("agreements are: ");
      console.log(payload);
      const npaList = payload?.map((agreement) => {
        let date = new Date(agreement.createdOn);
        return {
          id: agreement.id,
          title: `Note Purchase Agreement ${date.toLocaleDateString()}`,
          description: "Note Purchase Agreement",
        };
      });
      console.log("here");
      console.log(npaList);
      setNpas(npaList);

      const statementItems = statementsList?.map((statement) => {
        let date = new Date(statement.startPeriodDate);
        return {
          id: statement.id,
          title: `Statement ${date.toLocaleDateString()}`,
          description: "Interest Statement",
        };
      });

      setStatements(statementItems);
    } catch (error) {
      console.error("error fetching note purchase agreements for user ", error);
    }
  }, []);

  useEffect(() => {
    fetchAgreements();
  }, [fetchAgreements]);

  const renderStatementAccessory = (statementId) => (
    <Button size="tiny" onPress={() => nav.openStatementScreen(statementId)}>
      <Text>VIEW</Text>
    </Button>
  );

  const renderNpaAccessory = (agreementId: string) => {
    return (
      <Button size="tiny" onPress={() => nav.openAgreementScreen(agreementId)}>
        <Text>VIEW</Text>
      </Button>
    );
  };

  const renderItemIcon = (props: any) => <Icon {...props} name="file" />;
  const renderNpa = ({ item, index }: any) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.description}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderNpaAccessory(item.id)}
    />
  );
  const renderStatement = ({ item, index }: any) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.description}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={()=> renderStatementAccessory(item.id)}
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
