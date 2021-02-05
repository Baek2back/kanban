import Kanban from '../components/Kanban';
import { connect, bindActionCreators } from '../redux';
import {
  insertTask,
  allocateTasks,
  removeTask,
  toggleModalVisible
} from '../modules/boards';

import { setColor, setVisible as setColorVisible } from '../modules/color';
import {
  setVisible as setImageVisible,
  getImages,
  setBackgroundImage
} from '../modules/image';

const mapStateToProps = (state) => ({
  backgroundImage: state.image.backgroundImage,
  imageData: state.image.imageData,
  colorVisible: state.color.visible,
  imageVisible: state.image.visible,
  currentColor: state.color.currentColor,
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
    {
      insertTask,
      allocateTasks,
      removeTask,
      toggleModalVisible,
      setColor,
      setColorVisible,
      setImageVisible,
      getImages,
      setBackgroundImage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
