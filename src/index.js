const express = require('express');
const {expressConfig} = require('./config/express');
const {hbsConfig} = require('./config/hbs');
const {router} = require('./config/routes');

const app = express();
const port = process.env.port || 3000;

hbsConfig(app);
expressConfig(app);

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});