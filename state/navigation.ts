import {
  createSlice,
  PayloadAction,
  combineReducers,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { INavigationState } from "../interface/interfaces";

const initialState: INavigationState = {
  currentRoute: "/",
  changeRoute: false
};

export const reducerFunctions = {
  navigate: (state: INavigationState, action: PayloadAction<string>) => {
    state.currentRoute = action.payload;
    state.changeRoute = true
  },
  setChangeRoute: (state: INavigationState, action: PayloadAction<boolean>) => {
    state.changeRoute = action.payload;
  },
};

export const navigation = createSlice({
  name: "navigation",
  initialState,
  reducers: reducerFunctions,
});

// Action creators are generated for each case reducer function
export const actions = {
  ...navigation.actions,
};

export const navigationReducer = navigation.reducer;
