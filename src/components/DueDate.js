import { createTemplate, getNewComponent } from '../utils';

function convertDates(str) {
  const [, month, day] = new Date(str).toString().split(' ');
  return `${month} ${day}`;
}
const DueDate = ({ targetElement, dueDate }) => {
  const html = /*html*/ `
    <div class="text-sm text-gray-600">
      <span>${convertDates(dueDate)}</span>
    </div>
  `;
  const template = createTemplate(html);
  const newDueDate = getNewComponent(targetElement, template);
  return newDueDate;
};

export default DueDate;
