import { combineReducers } from 'redux'

import drawer from './drawer'
import currDate from "./currDate";
 
const rootReducer = combineReducers({
  drawer,
  currDate
});
 
export default rootReducer