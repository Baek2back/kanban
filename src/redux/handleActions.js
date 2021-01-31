const statusMappings = Object.freeze({
  error: 'error',
  success: 'success'
});

const defaultStatus = 'success';

function handleAction(type, reducers) {
  return (state, action) => {
    if (action.type !== type) return state;

    const status =
      typeof action.status !== 'undefined' ? action.status : defaultStatus;

    const handlerKey = statusMappings[status];

    if (!handlerKey) return state;

    if (typeof reducers === 'function') return reducers(state, action);

    const reducer = reducers[handlerKey];
    return reducer(state, action);
  };
}

function reduceReducers(...args) {
  const initialState = typeof args[0] !== 'function' && args.shift();
  const reducers = args;

  if (typeof initialState === 'undefined')
    throw new TypeError(
      'The initial state may not be undefined. If you do not want to set a value for this reducer, you can use null instead of undefined'
    );

  return (prevState, value, ...args) => {
    const prevStateIsUndefined = typeof prevState === 'undefined';
    const valueIsUndefined = typeof value === 'undefined';

    if (prevStateIsUndefined && valueIsUndefined && initialState) {
      return initialState;
    }

    const newState =
      prevStateIsUndefined && !valueIsUndefined && initialState
        ? initialState
        : prevState;

    return reducers.reduce((newState, reducer, index) => {
      if (typeof reducer === 'undefined')
        throw new TypeError(
          `An undefined reducer was passed in at index ${index}`
        );

      return reducer(newState, value, ...args);
    }, newState);
  };
}

export default function handleActions(handlers, defaultState) {
  const reducers = Object.keys(handlers).reduce((result, type) => {
    return (result = [...result, handleAction(type, handlers[type])]);
  }, []);

  return typeof defaultState !== 'undefined'
    ? (state = defaultState, action) =>
        reduceReducers(...reducers)(state, action)
    : reduceReducers(...reducers);
}
