require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const models = require('./models')

const app = express();
const port = process.env.PORT || '3000';

app
  .use(bodyParser.json())
  .options('*', cors())
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  /*
   * Routes
   */
  .use('/', indexRouter)

   models.User.sync({force: true})
    app.listen(port, () => {
    console.log(`Server started on port ${port}`);

    });

module.exports = app;