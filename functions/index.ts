import { generateFunctionsFromActions } from "effects-as-data-redux";
import { buildFunctions } from "effects-as-data/core";
import { actions } from "../state";
import { createStore, getStore } from "../state/store";
import functions from "./functions";
import buildHandlers from "./handlers";



// It is not necessary to generate these functions but is convenient
// so that your application can talk to Redux indirectly through
// effects-as-data.  If your view only talks to effects-as-data,
// and effects-as-data talk to Redux, you'll have a clean unidirectional
// data-flow through the application.
export const reduxFunctions = generateFunctionsFromActions(actions);

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
