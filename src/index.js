const express = require("express");
const { expressConfig } = require("./config/express");
const { hbsConfig } = require("./config/hbs");
const { databaseConfig } = require("./config/database");
const { routerConfig } = require("./config/routes");

const port = process.env.port || 3000;

const app = express();

async function start() {
    await databaseConfig();
    hbsConfig(app);
    expressConfig(app);
    routerConfig(app);

    app.listen(port, () => console.log(`Server is running on port ${port}...`));
}

start();