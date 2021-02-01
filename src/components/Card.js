import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  contentSelector,
  createdAtSelector,
  badgeSelector
} from '../utils';

import Content from './Content';
import CreatedAt from './CreatedAt';
import Badge from './Badge';

const Card = ({ targetElement, id, content, createdAt, badge }) => {
  const html = /*html*/ `
    <li class="mt-3" id=${id}>
      <a href="#" class="block p-5 bg-white rounded-md shadow">
        <section data-component="content"></section>
        <div class="flex justify-between items-baseline">
          <section data-component="created-at"></section>
          <section data-component="badge"></section>
        </div>
      </a>
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
    childSelector: createdAtSelector,
    componentFunc: CreatedAt,
    props: [{ createdAt }]
  });
  getChildrenComponents({
    parentNode: newCard,
    childSelector: badgeSelector,
    componentFunc: Badge,
    props: [{ badge }]
  });
  return newCard;
};

export default Card;
