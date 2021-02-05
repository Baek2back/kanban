import { combineReducers } from '../redux';
import boards from './boards';
import loading from './loading';
import color from './color';

const rootReducer = combineReducers({
  boards,
  loading,
  color
});

export default rootReducer;
