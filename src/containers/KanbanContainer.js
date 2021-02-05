import Kanban from '../components/Kanban';
import { connect, bindActionCreators } from '../redux';
import {
  insertTask,
  allocateTasks,
  removeTask,
  toggleModalVisible
} from '../modules/boards';

const mapStateToProps = (state) => ({
  modalStatus: state.boards.modal,
  categories: state.boards.categories,
  tasksWithTypes: state.boards.categories.map((category) => {
    return {
      category,
      tasks: state.boards[category].tasks
    };
  })
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { insertTask, allocateTasks, removeTask, toggleModalVisible },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
