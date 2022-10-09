import { configureStore, combineReducers, Store } from "@reduxjs/toolkit";
import { createMemoryHistory as createHistory } from "history";
import thunk from "redux-thunk";
import { reducers } from "./";

export const history: History = createHistory() as any;

let store: Store;

export const getStore = () => store;

export const createStore = (preloadedState: any = {}) =>
  (store = configureStore({
    reducer: combineReducers(reducers),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  }));
