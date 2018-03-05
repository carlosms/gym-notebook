import { combineReducers } from 'redux'

import drawer from './drawer'
import currDate from "./currDate";
import data from "./data"
 
const rootReducer = combineReducers({
  drawer,
  currDate,
  data
});
 
export default rootReducer