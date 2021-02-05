import { createTemplate, getNewComponent } from '../utils';

import _ from 'lodash';

const handlingEvents = (targetElement, setBackgroundImage, getImages) => {
  let preventScroll = 1;
  targetElement.addEventListener('click', function (e) {
    if (!e.target.matches('div > img')) return;
    const url = e.target.src;
    setBackgroundImage({ url });
  });
  const container = targetElement.firstElementChild;

  container.addEventListener(
    'scroll',
    _.throttle(() => {
      if (container.scrollTop < 600 * preventScroll) return;
      getImages();
      preventScroll++;
    }, 1500)
  );
};

const ImageViewer = ({
  targetElement,
  imageData,
  imageVisible,
  setBackgroundImage,
  getImages
}) => {
  const html = /*html*/ `
    <div class="bg-container bg-white ml-auto mt-0 p-0 max-w-xs my-20 fixed right-5 top-50 flex flex-col flex-nowrap ${
      imageVisible ? '' : 'hidden'
    } shadow-2xl rounded-lg" style="width: 350px; height: 90vh; overflow: auto; padding: 12px;">
    <button class="x-button-image bg-transparent text-blue-dark font-semibold" style="text-align: right;">
    X
  </button>
    ${imageData
      .map(
        (image) =>
          `<div style="margin-bottom: 10px; width: 280px; height: 180px; object-fit: cover;"><img src="${image.urls.regular}" class="object-cover opacity-50 hover:opacity-100" style="width: 280px; height: 180px; border-radius: 10px;"/></div>`
      )
      .join('')}
    </div>
  `;
  const template = createTemplate(html);
  const newImageViewer = getNewComponent(targetElement, template);
  handlingEvents(newImageViewer, setBackgroundImage, getImages);
  return newImageViewer;
};

export default ImageViewer;
