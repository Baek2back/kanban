import { createTemplate, getNewComponent } from '../utils';

const HoverStore = ({ targetElement }) => {
  const html = /*html*/ `
    <ul class="mt-2 ml-3 flex-shrink-0 p-3 w-80 rounded-md"></ul>
  `;
  const template = createTemplate(html);
  const newHoverStore = getNewComponent(targetElement, template);
  return newHoverStore;
};
export default HoverStore;
