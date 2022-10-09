interface IPropertyProseSignInProps extends IPropertyProsBaseProps {}

interface IScreenWrapperProps extends Partial<IPropertyProsProps> {
  component: Component;
}

interface IPropertyProsProps
  extends IPropertyProseSignInProps,
    IPropertyProsState {}
