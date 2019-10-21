import { combineReducers } from "redux";
import airtableReducer from "./airtable/reducers/airtableReducer.js";

export const makeRootReducer = () =>
  combineReducers({
    // Add sync reducers here
    // router: connectRouter(history),
    airtable: airtableReducer
  });

export default makeRootReducer;
