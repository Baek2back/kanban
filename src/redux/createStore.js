export default function createStore(reducer, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer);
  }

  let state = {
    boards: {
      categories: ['backlog', 'inprogress', 'review', 'done'],
      backlog: {
        tasks: [
          {
            id: 'abc',
            content: '가',
            createdAt: 'Sep 14',
            badge: 'Feature Request'
          },
          {
            id: 'def',
            content: '나',
            createdAt: 'Sep 12',
            badge: 'Feature Request'
          },
          {
            id: 'ghi',
            content: '다',
            createdAt: 'Sep 11',
            badge: 'Feature Request'
          }
        ]
      },
      inprogress: {
        tasks: [
          {
            id: 'jkl',
            content: '라',
            createdAt: 'Sep 11',
            badge: 'Feature Request'
          }
        ]
      },
      review: {
        tasks: [
          {
            id: 'mno',
            content: '마',
            createdAt: 'Sep 11',
            badge: 'Feature Request'
          }
        ]
      },
      done: {
        tasks: [
          {
            id: 'pqr',
            content: '바',
            createdAt: 'Sep 12',
            badge: 'Feature Request'
          }
        ]
      }
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
