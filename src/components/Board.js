import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  cardListSelector,
  addButtonSelector
} from '../utils';
import CardList from './CardList';
import AddButton from './AddButton';

const Board = ({ targetElement, category, tasks, insertTask }) => {
  const html = /*html*/ `
    <div class="ml-3 flex-shrink-0 p-3 w-80 bg-gray-100 rounded-md">
      <h3 class="text-sm font-medium text-gray-900">${category}</h3>
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
    props: [{ category, tasks }]
  });
  getChildrenComponents({
    parentNode: newBoard,
    childSelector: addButtonSelector,
    componentFunc: AddButton,
    props: [{ category, insertTask }]
  });
  return newBoard;
};
export default Board;
