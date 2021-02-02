import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  cardSelector,
  getComponentTag
} from '../utils';

import Card from './Card';

const CardList = ({ targetElement, category, tasks }) => {
  const html = /*html*/ `
    <ul class="mt-2" data-category=${category}>
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
  return newCardList;
};

export default CardList;
