import { buildFunctions } from "effects-as-data/core";
import { generateFunctionsFromActions } from "effects-as-data-redux";
import buildHandlers from "./handlers";
import functions from "./functions";
import { actions as reduxActions, reduxFunctions } from "../state";
import { createStore, getStore } from "../state/store";


// Combine functions from project and reduxFunctions generated above
const allFunctions = {
  ...functions,
  ...reduxFunctions,
};

const config = {
  onCommandComplete: ({ command }: any) => console.log(command), //for telemetry
};

// create the redux store and pass it to the handlers
const store = createStore() as any;
// console.log("created store: ", store);
// console.log("get store result: ", getStore())
const handlers = buildHandlers(getStore());

// This will export an object of promise return functions
// that have been generated from the effects-as-data functions
// represented by allFunctions
export default buildFunctions(
  config,
  handlers,
  allFunctions
) as typeof functions;
