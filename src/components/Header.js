import {
  createTemplate,
  getNewComponent,
  getChildrenComponents
} from '../utils';
import ImageViewer from './ImageViewer';

const handlingEvents = (
  targetElement,
  setColor,
  setColorVisible,
  setImageVisible
) => {
  const container = targetElement;

  container.addEventListener('click', (event) => {
    if (!event.target.matches('button')) return;
    if (event.target.matches('.bg-Btn')) {
      setImageVisible({ visible: true });
      return;
    }
    if (event.target.matches('.bgc-Btn')) {
      setColorVisible({ visible: true });
      return;
    }
    if ([...event.target.classList].includes('x-button-image')) {
      setImageVisible({ visible: false });
      return;
    }
    if ([...event.target.classList].includes('x-button')) {
      setColorVisible({ visible: false });
    } else {
      setColor({
        color: [...event.target.classList].find((node) => node.includes('bg-'))
      });
    }
  });
};

let init = false;

const Header = ({
  targetElement,
  setColor,
  setColorVisible,
  colorVisible,
  imageVisible,
  setImageVisible,
  getImages,
  imageData,
  setBackgroundImage
}) => {
  if (!init) {
    getImages();
    init = true;
  }
  const html = /*html*/ `
  <header class="text-gray-100 bg-gray-900 body-font shadow w-full">
  <div class="lg:w-full flex flex-wrap p-5 flex-col md:flex-row justify-between m-0 w-full">
    <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-start lg:items-center mb-4 md:mb-0">
      <span class="text-xl">dev.Trello</span>
    </a>
    <div class="btn-List lg:w-2/5 inline-flex lg:justify-end lg:ml-0">
      <button
        class="bg-Btn minecraft-btn m-0 w-60 text-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200">
        Change Image
      </button>
      <button
        class="bgc-Btn minecraft-btn m-0 w-60 text-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200">
        Change Color
      </button>
    </div>
  </div>
</header>
<div class="bg-container ml-auto mt-0 p-0 max-w-xs my-20 fixed right-5 top-50 ${
    colorVisible ? '' : 'hidden'
  }">
  <div class="bgc-Change bg-white w-60 mx-auto shadow-2xl rounded-lg flex flex-col flex-nowrap">
    <button class="x-button ml-auto bg-transparent text-blue-dark font-semibold py-2 px-4">
      X
    </button>
    <div class="flex flex-row">
      <button type="button"
        class="rounded-full h-16 w-16 bg-indigo-300 text-white px-4 py-2 m-2 transition duration-500 select-none hover:bg-gray-400 focus:outline-none focus:shadow-outline"></button>
      <span class="my-auto">Blue</span>
    </div>
    <div class="flex flex-row">
      <button type="button"
        class="rounded-full h-16 w-16 bg-red-200 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-400 focus:outline-none focus:shadow-outline"></button>
      <span class="my-auto">Red</span>
    </div>
    <div class="flex flex-row">
      <button type="button"
        class="rounded-full h-16 w-16 bg-green-200 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-400 focus:outline-none focus:shadow-outline"></button>
      <span class="my-auto">Green</span>
    </div>
    <div class="flex flex-row">
      <button type="button"
        class="rounded-full h-16 w-16 bg-yellow-200 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-400 focus:outline-none focus:shadow-outline"></button>
      <span class="my-auto">Yellow</span>
    </div>
  </div>
</div>
<section data-component="image-viewer"></section>
  `;
  const template = createTemplate(html);
  const newHeader = getNewComponent(targetElement, template);
  getChildrenComponents({
    parentNode: newHeader,
    childSelector: '[data-component="image-viewer"]',
    componentFunc: ImageViewer,
    props: [{ imageVisible, imageData, setBackgroundImage, getImages }]
  });
  handlingEvents(newHeader, setColor, setColorVisible, setImageVisible);
  return newHeader;
};
export default Header;
