const express = require('express');

const app = express();
const port = process.env.port || 3000;

expressConfig(app);
hbsConfig(app);
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});