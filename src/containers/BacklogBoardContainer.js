import BacklogBoard from '../components/BacklogBoard';
import { connect, bindActionCreators } from '../redux';
import { insert, allocate } from '../modules/backlog';

const mapStateToProps = (state) => ({
  tasks: state.backlog.tasks
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ insert, allocate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BacklogBoard);
