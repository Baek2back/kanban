import { createTemplate, getNewComponent } from '../utils';

const Kanban = ({ targetElement }) => {
  const html = /*html*/ `
    <main class="p-3 flex justify-center">
      <section data-component="backlog-board"></section>
    </main>
  `;
  const template = createTemplate(html);
  const newKanban = getNewComponent(targetElement, template);
  return newKanban;
};

export default Kanban;
