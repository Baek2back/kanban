export default function createStore(reducer, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer);
  }

  let state = {
    counter: {
      number: 0
    }
  };

  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(newListener) {
    listeners = [...listeners, newListener];
    return function unsubscribe() {
      listeners = listeners.filter((listener) => listener !== newListener);
    };
  }

  function dispatch(action) {
    const newState = reducer(state, action);
    if (!newState) throw new Error('reducer should always return newState');
    if (newState === state) return;
    state = newState;
    invokeAllSubscribers();
  }

  function invokeAllSubscribers() {
    listeners.forEach((listener) => listener());
  }

  return { getState, dispatch, subscribe };
}
