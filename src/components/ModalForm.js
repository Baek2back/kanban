import {
  createTemplate,
  getNewComponent,
  getChildrenComponents,
  uuid
} from '../utils';
import Labels from './Labels';

const handlingEvents = (targetElement, toggleModalVisible, insertTask) => {
  const container = targetElement;
  container.addEventListener('click', (event) => {
    if (!event.target.closest('[type="button"]')) return;
    toggleModalVisible({ visible: false });
  });
  container.addEventListener('submit', onSubmit);

  function onSubmit(event) {
    event.preventDefault();
    const category = container.querySelector('header').innerText.toLowerCase();
    const content = container.querySelector('input[type="text"]');
    const date = container.querySelector('input[type="date"]');
    const label = container.querySelector('input[type="radio"]:checked');

    const task = {
      id: uuid(),
      content: content.value,
      dueDate: date.value,
      badge: label.id
    };

    insertTask({ category, task });
    toggleModalVisible({ visible: false });
  }
};

const ModalForm = ({
  targetElement,
  visible,
  category,
  toggleModalVisible,
  insertTask
}) => {
  const html = /*html */ `  
    <div class="modal h-screen w-full fixed left-0 top-0 justify-center items-center bg-black bg-opacity-50 z-10 ${
      visible ? 'flex' : 'hidden'
    }">
      <!-- modal -->
      <form id="newTask" action="/" method="POST" class="bg-white rounded shadow-lg w-1/3">
        <!-- modal header -->
        <div class="border-b p-3 flex justify-between items-center">
          <header
            class="inline-block px-3 text-xs font-medium leading-6 text-center text-black-500 uppercase transition bg-transparent border-2 border-black-500 rounded focus:outline-none">
            ${category}
          </header>
          <button type="button" class="text-black close-modal focus:outline-none focus:ring focus:border-blue-300">
            &cross;
          </button>
        </div>
        <!-- modal body -->
        <div class="py-3 px-6 box-border w-full">
          <!-- content -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
              Content
            </label>
            <input type="text" name="content" id="content" placeholder="Enter a new task..."
              class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" required/>
          </div>
          <!-- due date -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Date">
              Due Date
            </label>
            <input
              class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              name="date" id="date" type="date" />
          </div>
          <!-- labels -->
          <label class="block text-gray-700 text-sm font-bold mb-2" for="Date">
            Labels
          </label>
          <section data-component="labels"></section>
        </div>
        <!-- modal footer -->
        <div class="flex justify-end items-center w-100 border-t p-3">
          <button type="submit"
            class="add-btn inline-block w-full px-4 py-1 text-xs font-medium leading-6 text-center text-white transition bg-indigo-500 rounded shadow ripple hover:shadow-lg hover:bg-indigo-600 focus:outline-none">
            Add
          </button>
        </div>
      </form>
    </div>
`;
  const template = createTemplate(html);
  const newModalForm = getNewComponent(targetElement, template);
  getChildrenComponents({
    parentNode: newModalForm,
    childSelector: `[data-component="labels"]`,
    componentFunc: Labels,
    props: []
  });
  handlingEvents(newModalForm, toggleModalVisible, insertTask);
  return newModalForm;
};

export default ModalForm;
