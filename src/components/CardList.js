import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  cardSelector,
  getComponentTag
} from '../utils';

import Card from './Card';

const handlingEvents = (targetElement, category, dispatch) => {
  const container = targetElement.firstElementChild;
  container.addEventListener('click', (event) => {
    const removeButton = event.target.closest(
      '[data-component="remove-button"]'
    );
    if (!removeButton) return;
    const selectedId = removeButton.parentNode.dataset.id;
    dispatch({ category, id: selectedId });
  });
};

const CardList = ({ targetElement, category, tasks, removeTask }) => {
  const html = /*html*/ `
    <ul class="mt-2 list-none" data-category=${category}>
      <li class="list-start py-0.5"></li>
      ${tasks.map(() => getComponentTag('card')).join('')}
    </ul>
  `;

  const template = createTemplate(html);
  const newCardList = getNewComponent(targetElement, template);

  getChildrenComponents({
    parentNode: newCardList,
    childSelector: cardSelector,
    componentFunc: Card,
    props: tasks
  });
  handlingEvents(newCardList, category, removeTask);
  return newCardList;
};

export default CardList;
