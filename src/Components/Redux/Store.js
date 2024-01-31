

import { createStore, combineReducers } from 'redux';
import form2Reducer from "./Reducer"
import form1Reducer from './Reducer1';
const rootReducer = combineReducers({
  form: form2Reducer,
  form1:form1Reducer,
});

const store = createStore(rootReducer);

export default store;