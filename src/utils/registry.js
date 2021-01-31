const registry = {};

const renderWrapper = (component) => {
  return ({ targetElement }) => {
    const element = component({ targetElement });

    const childComponents = element.querySelectorAll('[data-component]');

    [...childComponents].forEach((target) => {
      const name = target.dataset.component;
      const child = registry[name];
      if (!child) return;
      target.replaceWith(child({ targetElement: target }));
    });

    return element;
  };
};

const addToRegistry = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = ({ targetElement }) => {
  const cloneComponent = ({ targetElement }) => targetElement.cloneNode(true);
  return renderWrapper(cloneComponent)({ targetElement });
};

export default {
  addToRegistry,
  renderRoot
};
