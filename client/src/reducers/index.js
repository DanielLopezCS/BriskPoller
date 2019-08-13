import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import pollReducer from './pollReducer';

export default combineReducers({

  error: errorReducer,
  polls: pollReducer
});