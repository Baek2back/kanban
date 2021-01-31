export default function createThunkMiddleware(store) {
  return function thunk(dispatch) {
    return function newDispatch(action) {
      if (typeof action === 'function') {
        return action(dispatch, store.getState());
      }
      return dispatch(action);
    };
  };
}
