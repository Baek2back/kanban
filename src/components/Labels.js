import { createTemplate, getNewComponent, applyCSS } from '../utils';

const labels = [
  { name: 'duplicate', color: 'gray' },
  { name: 'bug', color: 'red' },
  { name: 'invalid', color: 'yellow' },
  { name: 'help-wanted', color: 'green' },
  { name: 'documentation', color: 'indigo' },
  { name: 'good-first-issue', color: 'purple' },
  { name: 'question', color: 'pink' }
];

const css = /*css*/ `
  [data-component="labels"] input + label {
    opacity: 0.1
  }

  [data-component="labels"] input:checked + label {
    opacity: 1
  }
`;
applyCSS(css);

const Labels = ({ targetElement }) => {
  const html = /*html*/ `
    <div class="container">
      ${labels
        .map(
          (label) => /*html*/ `
          <input class="hidden" type="radio" id="${label.name}" name="tags">
          <label for="${label.name}"
             class="inline-block rounded-full text-white bg-${label.color}-900 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1"
          >
            ${label.name}
          </label>
          `
        )
        .join('')}
  `;

  const template = createTemplate(html);
  const newLabels = getNewComponent(targetElement, template);
  return newLabels;
};

export default Labels;
