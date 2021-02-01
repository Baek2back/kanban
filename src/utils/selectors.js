const dataAttrSelector = (attr, value) => `[data-${attr}=${value}]`;

export const appSelector = dataAttrSelector('component', 'app');
export const listSelector = dataAttrSelector('component', 'list');
export const kanbanSelector = dataAttrSelector('component', 'kanban');
export const createdAtSelector = dataAttrSelector('component', 'created-at');
export const cardSelector = dataAttrSelector('component', 'card');
export const cardListSelector = dataAttrSelector('component', 'card-list');
export const contentSelector = dataAttrSelector('component', 'content');
export const badgeSelector = dataAttrSelector('component', 'badge');
export const backlogBoardSelector = dataAttrSelector(
  'component',
  'backlog-board'
);
export const addButtonSelector = dataAttrSelector('component', 'add-button');
