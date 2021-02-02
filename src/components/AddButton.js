import { createTemplate, getNewComponent } from '../utils';

const handleEvents = (component, insertTask, allocateTasks, { type, task }) => {
  const componentRoot = component.firstElementChild;
  componentRoot.addEventListener('click', () => {
    console.log(type);
    // allocateTasks({ type, tasks: [] });
    insertTask({ type, task });
  });
};

const AddButton = ({ targetElement, type, insertTask, allocateTasks }) => {
  const html = /*html*/ `
    <span class="px-2 py-1 leading-tight inline-flex items-center bg-black-100 rounded">+</span>
  `;
  const template = createTemplate(html);
  const newAddButton = getNewComponent(targetElement, template);
  handleEvents(newAddButton, insertTask, allocateTasks, {
    type,
    task: { id: 1, content: '123' }
  });
  return newAddButton;
};

export default AddButton;
