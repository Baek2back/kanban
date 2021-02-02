import {
  createTemplate,
  getNewComponent,
  applyCSS,
  appSelector
} from '../utils';

const css = /*css*/ `
  ${appSelector} button {
    
  }
`;

applyCSS(css);

const App = ({ targetElement }) => {
  const html = /*html*/ `
    <div>
      <section data-component="kanban" class="p-3 flex justify-center"></section>
    </div>
  `;

  const template = createTemplate(html);
  const newApp = getNewComponent(targetElement, template);
  return newApp;
};

export default App;
