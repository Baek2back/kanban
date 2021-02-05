import { createTemplate, getNewComponent } from '../utils';

const App = ({ targetElement }) => {
  const html = /*html*/ `
    <section data-component="kanban"></section>
  `;

  const template = createTemplate(html);
  const newApp = getNewComponent(targetElement, template);
  return newApp;
};

export default App;
