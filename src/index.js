import './index.css';
import rootReducer from './modules';
import { createStore, applyMiddleware, provide } from './redux';
import { logger, thunk } from './middlewares';
import { getBoards } from './modules/boards';
import { applyDiff, registry } from './utils';

import App from './components/App';

import KanbanContainer from './containers/KanbanContainer';

registry.addToRegistry('app', App);
registry.addToRegistry('kanban', KanbanContainer);

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
provide(store);

((dispatch) => {
  getBoards()(dispatch);
})(store.dispatch);

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.getElementById('root');
    const newMain = registry.renderRoot({ targetElement: main });
    applyDiff(document.body, main, newMain);
  });
};

store.subscribe(render);
render();
