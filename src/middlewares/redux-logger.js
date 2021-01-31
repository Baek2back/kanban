export default function createLoggerMiddleware(store) {
  return function logger(dispatch) {
    return function newDispatch(action) {
      console.log('======== Redux Logger ========');
      console.log('Action Type: ', action.type);
      const prevState = store.getState();
      console.log('Prev: ', prevState);

      const returnValue = dispatch(action);

      const nextState = store.getState();
      console.log('Next: ', nextState);
      console.log('==============================');
      return returnValue;
    };
  };
}
