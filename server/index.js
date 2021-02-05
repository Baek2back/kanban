const PORT = 7000;

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();

const board = require('./api/board');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use('/boards', board);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
