export default function createStore(reducer, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer);
  }

  let state = {
    backlog: {
      tasks: [
        {
          id: 1,
          content: 'asdffsdfsfsfsdfs',
          createdAt: 'Sep 14',
          badge: 'Feature Request'
        },
        {
          id: 2,
          content: 'asdf',
          createdAt: 'Sep 12',
          badge: 'Feature Request'
        },
        {
          id: 3,
          content: 'asdf',
          createdAt: 'Sep 11',
          badge: 'Feature Request'
        }
      ]
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
