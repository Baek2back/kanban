let currentStore;

const defaultMapState = () => ({});
const defaultMapDispatch = (dispatch) => ({ dispatch });

export function provide(store) {
  currentStore = store;
}

export function connect(
  mapState = defaultMapState,
  mapDispatch = defaultMapDispatch
) {
  return (component) => (...args) => {
    if (!currentStore)
      throw new Error('You cannot use connect unless provide a store');
    const actions = mapDispatch(currentStore.dispatch);
    const state = mapState(currentStore.getState());
    const newArgs = Object.assign({}, ...args, { state, actions });
    return component(newArgs);
  };
}
