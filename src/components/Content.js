import { createTemplate, getNewComponent } from '../utils';

const Content = ({ targetElement, content }) => {
  const html = /*html*/ `
    <div class="flex justify-between">
      <p class="text-sm font-medium leading-snug text-gray-900">${content}</p>
    </div>
  `;

  const template = createTemplate(html);
  const newContent = getNewComponent(targetElement, template);
  return newContent;
};

export default Content;
