import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  cardListSelector
} from '../utils';
import CardList from './CardList';
import BoardTitle from './BoardTitle';

const Board = ({
  targetElement,
  category,
  tasks,
  removeTask,
  toggleModalVisible
}) => {
  const html = /*html*/ `
    <div class="ml-3 flex-shrink-0 p-3 w-80 bg-gray-100 rounded-md">
      <section data-component="board-title"></section>
      <section data-component="card-list"></section>
    </div>
  `;
  const template = createTemplate(html);
  const newBoard = getNewComponent(targetElement, template);
  getChildrenComponents({
    parentNode: newBoard,
    childSelector: cardListSelector,
    componentFunc: CardList,
    props: [{ category, tasks, removeTask }]
  });
  getChildrenComponents({
    parentNode: newBoard,
    childSelector: '[data-component="board-title"]',
    componentFunc: BoardTitle,
    props: [{ category, toggleModalVisible }]
  });
  return newBoard;
};
export default Board;
