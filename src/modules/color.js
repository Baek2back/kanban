import { createAction, handleActions } from '../redux';

const SET_COLOR = 'color/SET_COLOR';
const SET_VISIBLE = 'color/SET_VISIBLE';

export const setColor = createAction(SET_COLOR, ({ color }) => ({ color }));
export const setVisible = createAction(SET_VISIBLE, ({ visible }) => ({
  visible
}));

const initialState = {
  currentColor: 'black',
  visible: false
};

const colors = handleActions(
  {
    [SET_COLOR]: (state, action) => {
      const { color } = action.payload;
      return {
        ...state,
        currentColor: color
      };
    },
    [SET_VISIBLE]: (state, action) => {
      const { visible } = action.payload;
      return {
        ...state,
        visible
      };
    }
  },
  initialState
);

export default colors;
