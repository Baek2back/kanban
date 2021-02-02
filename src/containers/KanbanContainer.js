import Kanban from '../components/Kanban';
import { connect, bindActionCreators } from '../redux';
import { insertTask, allocateTasks } from '../modules/boards';

const mapStateToProps = (state) => ({
  types: state.boards.types,
  tasksWithTypes: state.boards.types.map((type) => {
    return {
      type,
      tasks: state.boards[type].tasks
    };
  })
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ insertTask, allocateTasks }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
