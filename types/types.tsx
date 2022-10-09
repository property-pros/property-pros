/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Modal: undefined;
  NotFound: undefined;
};

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};
