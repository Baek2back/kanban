import {
  createTemplate,
  getNewComponent,
  applyCSS,
  appSelector,
  kanbanSelector,
  getChildrenComponents
} from '../utils';

import Kanban from './Kanban';

const css = /*css*/ `
  ${appSelector} button {
    
  }
`;

applyCSS(css);

const App = ({ targetElement }) => {
  const html = /*html*/ `
    <div>
      <section data-component="kanban"></section>
    </div>
  `;

  const template = createTemplate(html);

  const newApp = getNewComponent(targetElement, template);
  getChildrenComponents({
    parentNode: newApp,
    childSelector: kanbanSelector,
    componentFunc: Kanban,
    props: [{}]
  });
  return newApp;
};

export default App;
