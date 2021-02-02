import { createTemplate, getNewComponent } from '../utils';

const handleEvents = (component, insertTask, { category, task }) => {
  const componentRoot = component.firstElementChild;
  componentRoot.addEventListener('click', () => {
    insertTask({ category, task });
  });
};

const AddButton = ({ targetElement, category, insertTask }) => {
  const html = /*html*/ `
    <span class="px-2 py-1 leading-tight inline-flex items-center bg-black-100 rounded">+</span>
  `;
  const template = createTemplate(html);
  const newAddButton = getNewComponent(targetElement, template);
  handleEvents(newAddButton, insertTask, {
    category,
    task: { id: 1, content: '123' }
  });
  return newAddButton;
};

export default AddButton;
