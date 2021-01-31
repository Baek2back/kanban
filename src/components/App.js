import {
  createTemplate,
  getNewComponent,
  applyCSS,
  appSelector,
  listSelector,
  getComponentTag,
  getChildrenComponents
} from '../utils';

import List from './List';

const css = /*css*/ `
  ${appSelector} button {
    background: red;
  }
`;

applyCSS(css);

const handlingEvents = (targetElementRoot, dispatch) => {
  const delegatedTarget = targetElementRoot.firstElementChild;
  const someH = (e) => {
    if (!e.target.matches(`${appSelector} button`)) return;
    dispatch();
  };
  delegatedTarget.addEventListener('click', someH);
};

const App = ({ targetElement, state, actions }) => {
  const todos = [
    { id: 1, content: 'a' },
    { id: 1, content: 'a' },
    { id: 1, content: 'a' }
  ];
  const html = /*html*/ `
    <div>
      <button>${state.number}</button>
      ${todos.map(() => getComponentTag('list')).join('')}
    </div>
  `;

  const template = createTemplate(html);

  const newApp = getNewComponent(targetElement, template);
  getChildrenComponents({
    parentNode: newApp,
    childSelector: listSelector,
    componentFunc: List,
    props: todos
  });
  handlingEvents(newApp, actions.increase);
  return newApp;
};

export default App;
