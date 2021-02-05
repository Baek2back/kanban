const db = require('../../models');

const fetch = (req, res) => {
  const boards = db.get('boards');
  res.json(boards);
};

const insert = (req, res) => {
  const boards = db.get('boards').value();
  const { category, task } = req.body;
  const newBoards = {
    ...boards,
    [category]: {
      ...boards.category,
      tasks: [...boards[category].tasks, task]
    }
  };
  db.set('boards', newBoards).write();
  res.json({ category, task });
};

const allocate = (req, res) => {
  const boards = db.get('boards').value();
  const { categories, tasks } = req.body;
  const [prevCategory, nextCategory] = categories;
  const [prevTasks, nextTasks] = tasks;
  const newBoards = {
    ...boards,
    [prevCategory]: {
      tasks: prevTasks
    },
    [nextCategory]: {
      tasks: nextTasks
    }
  };
  db.set('boards', newBoards).write();
  res.json({ categories, tasks });
};

const remove = (req, res) => {
  const boards = db.get('boards').value();
  const { category, id } = req.body;
  const newBoards = {
    ...boards,
    [category]: {
      ...boards.category,
      tasks: boards[category].tasks.filter((task) => task.id !== id)
    }
  };
  db.set('boards', newBoards).write();
  res.json({ category, id });
};

module.exports = {
  fetch,
  insert,
  allocate,
  remove
};
