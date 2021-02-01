import { createAction, handleActions } from '../redux';

const INSERT = 'backlog/INSERT';
const ALLOCATE = 'backlog/REMOVE';

export const insert = createAction(INSERT, (task) => task);
export const allocate = createAction(ALLOCATE, (tasks) => tasks);

const initialState = {
  tasks: []
};

const tasks = handleActions(
  {
    [INSERT]: (state, action) => ({
      ...state,
      tasks: [...state.tasks, action.payload]
    }),
    [ALLOCATE]: (state, action) => ({
      ...state,
      tasks: [...action.payload]
    })
  },
  initialState
);

export default tasks;
