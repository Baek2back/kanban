import { combineReducers } from '../redux';
import boards from './boards';
import loading from './loading';

const rootReducer = combineReducers({
  boards,
  loading
});

export default rootReducer;
