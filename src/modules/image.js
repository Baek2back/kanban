import { createAction, handleActions } from '../redux';
import createRequestThunk from '../lib/createRequestThunk';
import * as imageAPI from '../lib/api/image';

const GET_IMAGES = 'image/GET_IMAGES';
const GET_IMAGES_SUCCESS = 'image/GET_IMAGES_SUCCESS';

const SET_VISIBLE = 'image/SET_VISIBLE';

const SET_BACKGROUND_IMAGE = 'image/SET_BACKGROUND_IMAGE';

export const getImages = createRequestThunk(GET_IMAGES, imageAPI.getImages);
export const setVisible = createAction(SET_VISIBLE, ({ visible }) => ({
  visible
}));
export const setBackgroundImage = createAction(
  SET_BACKGROUND_IMAGE,
  ({ url }) => ({ url })
);

const initialState = {
  imageData: [],
  visible: false,
  backgroundImage: ''
};

const boards = handleActions(
  {
    [GET_IMAGES_SUCCESS]: (state, action) => {
      return { ...state, imageData: [...state.imageData, ...action.payload] };
    },
    [SET_VISIBLE]: (state, action) => {
      const { visible } = action.payload;
      return { ...state, visible };
    },
    [SET_BACKGROUND_IMAGE]: (state, action) => {
      const { url } = action.payload;
      return { ...state, backgroundImage: url };
    }
  },
  initialState
);

export default boards;
