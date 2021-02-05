import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  applyCSS
} from '../utils';
import ToggleButton from './ToggleButton';

const css = /*css*/ `
  [data-component="board-title"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

applyCSS(css);

const handlingEvents = (targetElement, category, dispatch) => {
  const container = targetElement;
  container.addEventListener('click', (event) => {
    if (!event.target.closest('[data-component="toggle-button"]')) return;
    dispatch({ visible: true, category });
  });
};

const BoardTitle = ({ targetElement, category, toggleModalVisible }) => {
  const html = /*html*/ `
    <h3 class="antialiased text-base font-semibold text-gray-900 inline">${category}</h3>
    <section data-component="toggle-button"></section>
  `;

  const template = createTemplate(html);
  const newBoardTitle = getNewComponent(targetElement, template);
  getChildrenComponents({
    parentNode: newBoardTitle,
    childSelector: '[data-component="toggle-button"]',
    componentFunc: ToggleButton,
    props: [{ category }]
  });
  handlingEvents(newBoardTitle, category, toggleModalVisible);
  return newBoardTitle;
};
export default BoardTitle;
