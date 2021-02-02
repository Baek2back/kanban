import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  cardListSelector,
  addButtonSelector
} from '../utils';
import CardList from './CardList';
import AddButton from './AddButton';

const Board = ({ targetElement, type, tasks, insertTask, allocateTasks }) => {
  const html = /*html*/ `
    <div class="ml-3 flex-shrink-0 p-3 w-80 bg-gray-100 rounded-md">
      <h3 class="text-sm font-medium text-gray-900">${type}</h3>
      <section data-component="add-button"></section>
      <section data-component="card-list"></section>
    </div>
  `;
  const template = createTemplate(html);
  const newBoard = getNewComponent(targetElement, template);
  getChildrenComponents({
    parentNode: newBoard,
    childSelector: cardListSelector,
    componentFunc: CardList,
    props: [{ type, tasks }]
  });
  getChildrenComponents({
    parentNode: newBoard,
    childSelector: addButtonSelector,
    componentFunc: AddButton,
    props: [{ type, insertTask, allocateTasks }]
  });
  return newBoard;
};
export default Board;
