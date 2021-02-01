import './index.css';
import rootReducer from './modules';
import { createStore, applyMiddleware, provide } from './redux';
import { logger, thunk } from './middlewares';

import { applyDiff, registry } from './utils';

import App from './components/App';

import BacklogBoardContainer from './containers/BacklogBoardContainer';

registry.addToRegistry('app', App);
registry.addToRegistry('backlog-board', BacklogBoardContainer);

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
provide(store);

const render = () => {
  window.requestIdleCallback(() => {
    const main = document.getElementById('root');
    const newMain = registry.renderRoot({ targetElement: main });
    applyDiff(document.body, main, newMain);
  });
};

store.subscribe(render);

render();
