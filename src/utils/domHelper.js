export const createTemplate = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
};

export const applyCSS = (css) => {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
};

export const getChildrenComponents = ({
  parentNode,
  childSelector,
  componentFunc,
  props
}) => {
  const children = [...parentNode.querySelectorAll(childSelector)];
  children.forEach((child, idx) => {
    child.replaceWith(componentFunc({ targetElement: child, ...props[idx] }));
  });
};

export const getNewComponent = (targetElement, template) => {
  const newComponent = targetElement.cloneNode(true);
  newComponent.innerHTML = '';
  newComponent.appendChild(template.content.cloneNode(true));
  return newComponent;
};

export const getComponentTag = (name) => {
  return /*html*/ `
    <section data-component="${name}"></section>
  `;
};
