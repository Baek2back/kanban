import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  cardListSelector,
  addButtonSelector
} from '../utils';
import CardList from './CardList';
import AddButton from './AddButton';

const BacklogBoard = ({ targetElement, state, actions }) => {
  const { insert, allocate } = actions;
  const html = /*html*/ `
    <div class="ml-3 flex-shrink-0 p-3 w-80 bg-gray-100 rounded-md">
      <h3 class="text-sm font-medium text-gray-900">Backlog
        <section data-component="add-button"></section>
      </h3>
      <section data-component="card-list"></section>
    </div>
  `;
  const template = createTemplate(html);
  const newBacklogBoard = getNewComponent(targetElement, template);
  getChildrenComponents({
    parentNode: newBacklogBoard,
    childSelector: cardListSelector,
    componentFunc: CardList,
    props: [{ tasks: state.tasks, insert, allocate }]
  });
  getChildrenComponents({
    parentNode: newBacklogBoard,
    childSelector: addButtonSelector,
    componentFunc: AddButton,
    props: [{ insert }]
  });
  return newBacklogBoard;
};
export default BacklogBoard;
