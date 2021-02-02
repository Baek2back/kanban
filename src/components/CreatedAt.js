import { createTemplate, getNewComponent } from '../utils';

const CreatedAt = ({ targetElement, createdAt }) => {
  const html = /*html*/ `
    <div class="text-sm text-gray-600">
      <span>${createdAt}</span>
    </div>
  `;
  const template = createTemplate(html);
  const newCreatedAt = getNewComponent(targetElement, template);
  return newCreatedAt;
};

export default CreatedAt;
