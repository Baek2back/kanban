import { createAction, handleActions } from '../redux';

const INSERT_TASK = 'boards/INSERT_TASK';
const ALLOCATE_TASKS = 'boards/ALLOCATE_TASKS';

export const insertTask = createAction(INSERT_TASK, ({ type, task }) => ({
  type,
  task
}));
export const allocateTasks = createAction(
  ALLOCATE_TASKS,
  ({ type, tasks }) => ({
    type,
    tasks
  })
);

const initialState = {
  type: ['backlog', 'inprogress', 'review', 'done'],
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
  },
  inprogress: {
    tasks: [
      {
        id: 3,
        content: 'asdf',
        createdAt: 'Sep 11',
        badge: 'Feature Request'
      }
    ]
  },
  review: {
    tasks: []
  },
  done: {
    tasks: [
      {
        id: 2,
        content: 'asdf',
        createdAt: 'Sep 12',
        badge: 'Feature Request'
      }
    ]
  }
};

const boards = handleActions(
  {
    [INSERT_TASK]: (state, action) => {
      const { type, task } = action.payload;
      return {
        ...state,
        [type]: {
          ...state.type,
          tasks: [...state[type].tasks, task]
        }
      };
    },
    [ALLOCATE_TASKS]: (state, action) => {
      const { type, tasks } = action.payload;
      return {
        ...state,
        [type]: { tasks }
      };
    }
  },
  initialState
);

export default boards;
