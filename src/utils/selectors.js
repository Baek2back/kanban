const dataAttrSelector = (attr, value) => `[data-${attr}=${value}]`;

export const appSelector = dataAttrSelector('component', 'app');
export const listSelector = dataAttrSelector('component', 'list');
