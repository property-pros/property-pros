import { FunctionComponentElement } from "react";
import { connect, ConnectedComponent } from "react-redux";
import { initNavigation } from "../hooks";

export const ScreenWrapper = ({
  component: Component,
  ...props
}: IScreenWrapperProps): FunctionComponentElement<IScreenWrapperProps> => {
  //ensures that navigation is initialized
  initNavigation();
  return <Component {...props} />;
};

export default connect((state, ownProps) => {
  return { ...state, ...ownProps };
})(ScreenWrapper) as ConnectedComponent<
  typeof ScreenWrapper,
  IScreenWrapperProps
>;
