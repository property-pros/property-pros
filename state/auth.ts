import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import {
  IPropertyProsAuthenticatedUserState,
  IPropertyProsSignInState,
  IPropertyProsSignUpState,
  IPropertyProsSignupStateActions
} from "../interface/interfaces";

const initialState: IPropertyProsSignInState = {
  signInEmail: "",
  signInPassword: "",
};

export const reducerFunctions = {
  setSignInEmail: (
    state: IPropertyProsSignInState,
    action: PayloadAction<string>
  ) => {
    console.log("hrere")
    console.log(action.payload)
    state.signInEmail = action.payload;
  },
  setSignInPassword: (
    state: IPropertyProsSignInState,
    action: PayloadAction<string>
  ) => {
    state.signInPassword = action.payload;
  },
  
};

export const signIn = createSlice({
  name: "signIn",
  initialState,
  reducers: reducerFunctions,
});

export const signinActions = signIn.actions;

export const signInReducer = signIn.reducer;

const initialAuthState: IPropertyProsAuthenticatedUserState = {
  isAuthenticated: false,
}
export const authReducerFunctions = {
  setAuthenticated: (
    state: IPropertyProsAuthenticatedUserState,
    action: PayloadAction<boolean>
  ) => {
    state.isAuthenticated = action.payload;
  },
  setAuthToken: (
    state: IPropertyProsAuthenticatedUserState,
    action: PayloadAction<string>
  ) => {
    state.authToken = action.payload;
  },
  
};

export const authenticatedUser = createSlice({
  name: "authenticatedUser",
  initialState: initialAuthState,
  reducers: authReducerFunctions as any,
});

export const authenticatedUserActions = authenticatedUser.actions;

export const authenticatedUserReducer = authenticatedUser.reducer;

const signUpInitialState: IPropertyProsSignUpState = {
  signUpAddress: "40942 Belleray Ave Murrieta CA 92562",
  signUpDate: new Date(Date.now()).toISOString(),
  signUpEmail: "srt0422@yahoo.com",
  signUpLegalCellPhone: "9512493842",
  signUpLegalFirstName: "Scott",
  signUpLegalLastName: "Terry",
  signUpLegalSocialSecurityNumber: "123411234",
  signUpPassword: "testtest",
  signUpSignature: false,
  signUpTaxFilingStatus: "Single",
  signUpHasServedAsPlaintiff: false,
  signUpCommittedPrinciple: "0",
};

export const signUpReducerFunctions: IPropertyProsSignupStateActions = {
  setSignUpAddress: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ) => {
    state.signUpAddress = action.payload;
  },
  setSignUpDate: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ) => {
    state.signUpDate = new Date(action.payload).toISOString();
  },
  setSignUpEmail: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ) => {
    state.signUpEmail = action.payload;
  },
  setSignUpLegalCellPhone: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ) => {
    state.signUpLegalCellPhone = action.payload;
  },
  setSignUpLegalFirstName: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ) => {
    state.signUpLegalFirstName = action.payload;
  },
  setSignUpLegalLastName: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ) => {
    state.signUpLegalLastName = action.payload;
  },
  setSignUpLegalSocialSecurityNumber: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ) => {
    state.signUpLegalSocialSecurityNumber = action.payload;
  },
  setSignUpPassword: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ) => {
    state.signUpPassword = action.payload;
  },
  setSignUpSignature: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<boolean>
  ) => {
    state.signUpSignature = action.payload;
  },
  setSignUpTaxFilingStatus: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<string>
  ) => {
    state.signUpTaxFilingStatus = action.payload;
  },
  setSignUpCommittedPrinciple: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<number>
  ) => {
    state.signUpCommittedPrinciple = action.payload;
  },
  setSignUpHasServedAsPlaintiff: (
    state: IPropertyProsSignUpState,
    action: PayloadAction<boolean>
  ) => {
    state.signUpHasServedAsPlaintiff = action.payload;
  },
};

export const signUp = createSlice({
  name: "signUp",
  initialState: signUpInitialState,
  reducers: signUpReducerFunctions as any,
});

export const signupActions = signUp.actions;

export const signUpReducer = signUp.reducer;
