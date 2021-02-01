import { createTemplate, getNewComponent } from '../utils';

const Badge = ({ targetElement, badge }) => {
  const html = /*html*/ `
    <div class="mt-2">
      <span class="px-2 py-1 leading-tight inline-flex items-center bg-pink-100 rounded">
        <svg
          class="h-2 w-2 text-pink-500"
          viewBox="0 0 8 8"
          fill="currentColor"
        >
          <circle cx="4" cy="4" r="3" />
        </svg>
        <span class="ml-2 text-sm font-medium text-pink-900">
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
