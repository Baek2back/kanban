import { createAction, handleActions } from '../redux';
import createRequestThunk from '../lib/createRequestThunk';
import * as boardsAPI from '../lib/api/boards';

const GET_BOARDS = 'boards/GET_BOARDS';
const GET_BOARDS_SUCCESS = 'boards/GET_BOARDS_SUCCESS';

const INSERT_TASK = 'boards/INSERT_TASK';
const INSERT_TASK_SUCCESS = 'boards/INSERT_TASK_SUCCESS';

const ALLOCATE_TASKS = 'boards/ALLOCATE_TASKS';
const ALLOCATE_TASKS_SUCCESS = 'boards/ALLOCATE_TASKS_SUCCESS';

const REMOVE_TASK = 'boards/REMOVE_TASK';
const REMOVE_TASK_SUCCESS = 'boards/REMOVE_TASK_SUCCESS';

const TOGGLE_MODAL_VISIBLE = 'boards/TOGGLE_MODAL_VISIBLE';

export const getBoards = createRequestThunk(GET_BOARDS, boardsAPI.getBoards);
export const insertTask = createRequestThunk(INSERT_TASK, boardsAPI.insertTask);
export const allocateTasks = createRequestThunk(
  ALLOCATE_TASKS,
  boardsAPI.allocateTasks
);
export const removeTask = createRequestThunk(REMOVE_TASK, boardsAPI.removeTask);

export const toggleModalVisible = createAction(
  TOGGLE_MODAL_VISIBLE,
  ({ category, visible }) => ({ category, visible })
);

const initialState = {
  modal: {
    visible: false,
    category: null
  },
  categories: ['backlog', 'inprogress', 'review', 'done'],
  backlog: {
    tasks: []
  },
  inprogress: {
    tasks: []
  },
  review: {
    tasks: []
  },
  done: {
    tasks: []
  }
};

const boards = handleActions(
  {
    [GET_BOARDS_SUCCESS]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [INSERT_TASK_SUCCESS]: (state, action) => {
      const { category, task } = action.payload;
      return {
        ...state,
        [category]: {
          ...state.category,
          tasks: [...state[category].tasks, task]
        }
      };
    },
    [ALLOCATE_TASKS_SUCCESS]: (state, action) => {
      const { categories, tasks } = action.payload;

      const [prevCategory, nextCategory] = categories;
      const [prevTasks, nextTasks] = tasks;

      return {
        ...state,
        [prevCategory]: { tasks: prevTasks },
        [nextCategory]: { tasks: nextTasks }
      };
    },
    [REMOVE_TASK_SUCCESS]: (state, action) => {
      const { category, id } = action.payload;

      return {
        ...state,
        [category]: {
          ...state.category,
          tasks: state[category].tasks.filter((task) => task.id !== id)
        }
      };
    },
    [TOGGLE_MODAL_VISIBLE]: (state, action) => {
      const { category, visible } = action.payload;
      return {
        ...state,
        modal: {
          category,
          visible
        }
      };
    }
  },
  initialState
);

export default boards;
