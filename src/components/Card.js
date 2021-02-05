import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  contentSelector,
  badgeSelector
} from '../utils';

import Content from './Content';
import DueDate from './DueDate';
import Badge from './Badge';
import RemoveButton from './RemoveButton';

const Card = ({ targetElement, id, content, dueDate, badge }) => {
  const html = /*html*/ `
    <li class="mt-3 block p-5 bg-white rounded-md shadow hover:shadow-xl transition ease-in-out relative" data-id=${id}>
      <section data-component="content"></section>
      <section data-component="remove-button"></section>
      <footer class="flex justify-between items-baseline">
        <section data-component="due-date"></section>
        <section data-component="badge"></section>
      </footer>
    </li>
  `;

  const template = createTemplate(html);
  const newCard = getNewComponent(targetElement, template);

  getChildrenComponents({
    parentNode: newCard,
    childSelector: contentSelector,
    componentFunc: Content,
    props: [{ content }]
  });
  getChildrenComponents({
    parentNode: newCard,
    childSelector: `[data-component="due-date"]`,
    componentFunc: DueDate,
    props: [{ dueDate }]
  });
  getChildrenComponents({
    parentNode: newCard,
    childSelector: badgeSelector,
    componentFunc: Badge,
    props: [{ badge }]
  });
  getChildrenComponents({
    parentNode: newCard,
    childSelector: `[data-component="remove-button"]`,
    componentFunc: RemoveButton,
    props: []
  });
  return newCard;
};

export default Card;
