import { createTemplate, getNewComponent } from '../utils';

const labels = [
  { name: 'duplicate', color: 'gray' },
  { name: 'bug', color: 'red' },
  { name: 'invalid', color: 'yellow' },
  { name: 'help-wanted', color: 'green' },
  { name: 'documentation', color: 'indigo' },
  { name: 'good-first-issue', color: 'purple' },
  { name: 'question', color: 'pink' }
];

const Badge = ({ targetElement, badge }) => {
  const color = labels.find((label) => label.name === badge).color;
  const html = /*html*/ `
    <div class="mt-2">
      <span class="px-2 py-1 leading-tight inline-flex items-center bg-${color}-100 rounded">
        <svg
          class="h-2 w-2 text-${color}-500"
          viewBox="0 0 8 8"
          fill="currentColor"
        >
          <circle cx="4" cy="4" r="4" />
        </svg>
        <span class="ml-2 text-sm font-medium text-${color}-900">
          ${badge}
        </span>
      </span>
    </div>
  `;

  const template = createTemplate(html);
  const newBadge = getNewComponent(targetElement, template);
  return newBadge;
};

export default Badge;
