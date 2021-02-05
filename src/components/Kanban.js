import {
  createTemplate,
  getNewComponent,
  getComponentTag,
  getChildrenComponents,
  cardSelector,
  boardSelector,
  hoverStoreSelector
} from '../utils';

import _ from 'lodash';

import ModalForm from './ModalForm';
import Board from './Board';
import HoverStore from './HoverStore';
import Header from './Header';

const handlingEvents = (targetElement, dispatch) => {
  let element, ghostNode;
  let ghostStartX, ghostStartY;
  let halfOfghostWidth, halfOfghostHeight;
  let prevCategory, nextCategory;

  const container = targetElement.firstElementChild.nextElementSibling;
  const hoverStore = container.querySelector(`${hoverStoreSelector} ul`);

  container.addEventListener('mousedown', cardPressed, { passive: true });

  const throttledCardMoved = (function (cardMoved) {
    return _.throttle(cardMoved, 25);
  })(cardMoved);

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

    container.addEventListener('mousemove', throttledCardMoved, {
      passive: true
    });
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
    container.removeEventListener('mousemove', throttledCardMoved);
    container.removeEventListener('mouseup', cardReleased);
    container.removeEventListener('mouseleave', cardReleased);

    const prevUl = container.querySelector(`[data-category=${prevCategory}]`);
    const nextUl = container.querySelector(`[data-category=${nextCategory}]`);
    if (!(prevUl && nextUl)) return;

    const prevLis = [...prevUl.querySelectorAll('[data-id]')];
    const nextLis = [...nextUl.querySelectorAll('[data-id]')];

    const prevTasks = prevLis
      ? prevLis
          .map((li) => [
            li.dataset.id,
            ...li.innerText.replace(/(\n\n)|(\n)/g, ',').split(',')
          ])
          .map((task) => {
            const [id, content, dueDate, badge] = task;
            return {
              id,
              content,
              dueDate,
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
            const [id, content, dueDate, badge] = task;
            return {
              id,
              content,
              dueDate,
              badge
            };
          })
      : [];

    dispatch({
      categories: [prevCategory, nextCategory],
      tasks: [prevTasks, nextTasks]
    });

    prevCategory = null;
    nextCategory = null;
  }
};

const Kanban = ({ targetElement, state, actions }) => {
  const {
    categories,
    tasksWithTypes,
    modalStatus,
    currentColor,
    colorVisible
  } = state;
  const {
    insertTask,
    allocateTasks,
    removeTask,
    toggleModalVisible,
    setColor,
    setVisible
  } = actions;

  const html = /*html*/ `
    <header data-component="header"></header>
    <main class="flex justify-center p-5 ${currentColor}">
      <section data-component="modal-form"></section>
      ${categories.map(() => getComponentTag('board')).join('')}
      <section data-component="hover-store"></section>
    </main>
  `;
  const template = createTemplate(html);
  const newKanban = getNewComponent(targetElement, template);

  getChildrenComponents({
    parentNode: newKanban,
    childSelector: `[data-component="header"]`,
    componentFunc: Header,
    props: [{ setColor, setVisible, colorVisible }]
  });

  getChildrenComponents({
    parentNode: newKanban,
    childSelector: `[data-component="modal-form"]`,
    componentFunc: ModalForm,
    props: [{ ...modalStatus, toggleModalVisible, insertTask }]
  });

  getChildrenComponents({
    parentNode: newKanban,
    childSelector: boardSelector,
    componentFunc: Board,
    props: tasksWithTypes.map((tasksWithType) => ({
      ...tasksWithType,
      insertTask,
      removeTask,
      toggleModalVisible
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
