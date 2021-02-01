import { createTemplate, getNewComponent } from '../utils';

const handleEvents = (component, dispatch) => {
  const componentRoot = component.firstElementChild;
  componentRoot.addEventListener('click', () => {
    dispatch({ id: 123, content: '123n1lk23nl1' });
  });
};

const AddButton = ({ targetElement, insert }) => {
  const html = /*html*/ `
    <span class="px-2 py-1 leading-tight inline-flex items-center bg-black-100 rounded">+</span>
  `;
  const template = createTemplate(html);
  const newAddButton = getNewComponent(targetElement, template);
  handleEvents(newAddButton, insert);
  return newAddButton;
};

export default AddButton;
