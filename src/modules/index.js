import { combineReducers } from '../redux';
import boards from './boards';
import loading from './loading';
import color from './color';
import image from './image';

const rootReducer = combineReducers({
  boards,
  loading,
  color,
  image
});

export default rootReducer;
