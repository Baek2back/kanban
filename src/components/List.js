import { createTemplate, getNewComponent } from '../utils';

const List = ({ targetElement, id, content }) => {
  const html = /*html*/ `
    <h2>${id}</h2>
    <h3>${content}</h3>
  `;
  const template = createTemplate(html);
  const newList = getNewComponent(targetElement, template);
  return newList;
};

export default List;
