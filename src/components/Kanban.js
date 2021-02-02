import {
  createTemplate,
  getNewComponent,
  getComponentTag,
  getChildrenComponents,
  cardSelector,
  boardSelector,
  hoverStoreSelector
} from '../utils';
import Board from './Board';
import HoverStore from './HoverStore';

const handlingEvents = (targetElement, dispatch) => {
  let element, ghostNode;
  let ghostStartX, ghostStartY;
  let halfOfghostWidth, halfOfghostHeight;
  let prevCategory, nextCategory;

  const container = targetElement.firstElementChild;
  const hoverStore = container.querySelector(`${hoverStoreSelector} ul`);

  container.addEventListener('mousedown', cardPressed, { passive: true });

  function cardPressed(event) {
    element = event.target.closest(`${cardSelector}`);
    if (!element) return;
    prevCategory = element.parentNode.dataset.category;

    ghostNode = element.cloneNode(true);
    element.style.opacity = 0.5;
    hoverStore.appendChild(ghostNode);
    ghostNode.style.opacity = 0;

    const { x, y, width, height } = ghostNode.getBoundingClientRect();
    ghostStartX = x;
    ghostStartY = y;
    halfOfghostWidth = width / 2;
    halfOfghostHeight = height / 2;

    container.addEventListener('mousemove', cardMoved, { passive: true });
    container.addEventListener('mouseup', cardReleased, {
      passive: true
    });
    container.addEventListener('mouseleave', cardReleased, {
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
    const li = currentElement.closest(`${cardSelector}`);
    ghostNode.hidden = false;
    if (!ul) return;
    nextCategory = ul.dataset.category;

    const start = ul.querySelector('.list-start');
    if (!start) return;
    const { top: startTop } = start.getBoundingClientRect();
    if (startTop + halfOfghostHeight > pageY) {
      start.parentNode.insertBefore(element, start.nextElementSibling);
      return;
    }

    if (!li || li === element) return;
    const { top: liTop } = li.getBoundingClientRect();
    if (liTop + halfOfghostHeight < pageY) {
      ul.insertBefore(element, li.nextElementSibling);
    }
  }

  function cardReleased() {
    ghostNode.remove();
    element.style.opacity = 1;
    container.removeEventListener('mousemove', cardMoved);
    container.removeEventListener('mouseup', cardReleased);
    container.removeEventListener('mouseleave', cardReleased);

    const prevUl = container.querySelector(`[data-category=${prevCategory}]`);
    const nextUl = container.querySelector(`[data-category=${nextCategory}]`);

    const prevLis = [...prevUl.querySelectorAll('[data-id]')];
    const nextLis = [...nextUl.querySelectorAll('[data-id]')];

    const prevTasks = prevLis
      ? prevLis
          .map((li) => [
            li.dataset.id,
            ...li.innerText.replace(/(\n\n)|(\n)/g, ',').split(',')
          ])
          .map((task) => {
            const [id, content, createdAt, badge] = task;
            return {
              id,
              content,
              createdAt,
              badge
            };
          })
      : [];
    const nextTasks = nextLis
      ? nextLis
          .map((li) => [
            li.dataset.id,
            ...li.innerText.replace(/(\n\n)|(\n)/g, ',').split(',')
          ])
          .map((task) => {
            const [id, content, createdAt, badge] = task;
            return {
              id,
              content,
              createdAt,
              badge
            };
          })
      : [];

    dispatch({ category: prevCategory, tasks: prevTasks });
    dispatch({ category: nextCategory, tasks: nextTasks });

    prevCategory = null;
    nextCategory = null;
  }
};

const Kanban = ({ targetElement, state, actions }) => {
  const { categories, tasksWithTypes } = state;
  const { insertTask, allocateTasks } = actions;
  const html = /*html*/ `
    <main class="flex justify-center">
      ${categories.map(() => getComponentTag('board')).join('')}
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
