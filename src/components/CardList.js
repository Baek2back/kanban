import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  cardSelector,
  getComponentTag
} from '../utils';

import Card from './Card';

const CardList = ({ targetElement, tasks, insert, allocate }) => {
  const html = /*html*/ `
    <ul class="mt-2">
      ${tasks.map(() => getComponentTag('card')).join('')}
    </ul>
  `;

  const template = createTemplate(html);
  const newCardList = getNewComponent(targetElement, template);
  newCardList.addEventListener('click', () => {
    insert({ id: 4, content: 'ab' });
  });
  getChildrenComponents({
    parentNode: newCardList,
    childSelector: cardSelector,
    componentFunc: Card,
    props: tasks
  });
  return newCardList;
};

export default CardList;
