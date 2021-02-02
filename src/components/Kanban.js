import {
  createTemplate,
  getNewComponent,
  getComponentTag,
  getChildrenComponents,
  boardSelector,
  hoverStoreSelector
} from '../utils';
import Board from './Board';
import HoverStore from './HoverStore';

const handlingEvents = (targetElement, dispatch) => {
  let element, ghostNode;
  let ghostStartX, ghostStartY;
  let halfOfghostWidth, halfOfghostHeight;
  const container = targetElement.firstElementChild;
  const hoverStore = container.querySelector(
    '[data-component="hover-store"] ul'
  );

  container.addEventListener('mousedown', cardPressed, { passive: true });

  function cardPressed(event) {
    element = event.target.closest('[data-component="card"]');
    if (!element) return;

    ghostNode = element.cloneNode(true);
    element.style.opacity = 0.5;
    hoverStore.appendChild(ghostNode);
    ghostNode.style.opacity = 0;

    const { x, y, width, height } = ghostNode.getBoundingClientRect();
    ghostStartX = x;
    ghostStartY = y;
    halfOfghostWidth = width / 2;
    halfOfghostHeight = height / 2;

    container.addEventListener('mousemove', cardMoved);
    container.addEventListener('mouseup', cardReleased(dispatch, element), {
      passive: true
    });
    container.addEventListener('mouseleave', cardReleased(dispatch, element), {
      passive: true
    });
  }

  function cardMoved(event) {
    const { pageX, pageY } = event;
    ghostNode.style.transform = `translate3d(${
      -ghostStartX + event.clientX - halfOfghostWidth
    }px, ${-ghostStartY + event.clientY - halfOfghostHeight}px, 0px)`;
    ghostNode.style.opacity = 1;
    ghostNode.hidden = true;
    const currentElement = document.elementFromPoint(pageX, pageY);
    if (!currentElement) return;
    const ul = currentElement.closest('ul');
    const li = currentElement.closest('[data-component="card"]');
    ghostNode.hidden = false;
    if (!ul) return;
    const start = ul.querySelector('.list-start');
    if (!start) return;
    const { top } = start.getBoundingClientRect();
    if (top + halfOfghostHeight > pageY) {
      start.parentNode.insertBefore(element, start.nextElementSibling);
      return;
    }

    if (!li || li === element) return;
    const { y } = li.getBoundingClientRect();
    if (y + halfOfghostHeight < pageY) {
      ul.insertBefore(element, li.nextElementSibling);
    }
  }

  function cardReleased(dispatch, element) {
    console.log('dispatch', dispatch);
    return function () {
      ghostNode.remove();
      element.style.opacity = 1;
      container.removeEventListener('mousemove', cardMoved);
      container.removeEventListener('mouseup', cardReleased);
      container.removeEventListener('mouseleave', cardReleased);
    };
  }
};

const Kanban = ({ targetElement, state, actions }) => {
  const { types, tasksWithTypes } = state;
  const { insertTask, allocateTasks } = actions;
  const html = /*html*/ `
    <main class="flex justify-center">
      ${types.map(() => getComponentTag('board')).join('')}
      <section data-component="hover-store"></section>
    </main>
  `;
  const template = createTemplate(html);
  const newKanban = getNewComponent(targetElement, template);

  getChildrenComponents({
    parentNode: newKanban,
    childSelector: boardSelector,
    componentFunc: Board,
    props: tasksWithTypes.map((tasksWithType) => ({
      ...tasksWithType,
      insertTask,
      allocateTasks
    }))
  });

  getChildrenComponents({
    parentNode: newKanban,
    childSelector: hoverStoreSelector,
    componentFunc: HoverStore,
    props: []
  });

  handlingEvents(newKanban, allocateTasks);
  return newKanban;
};

export default Kanban;
