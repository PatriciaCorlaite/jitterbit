const express = require("express");
const app = express();
const routes = require("./routes/orderRoutes");
const sequelize = require("./config/db");

app.use(express.json());
app.use(routes);

sequelize.authenticate()
    .then(() => console.log("Conectado ao SQL Server!"))
    .catch(err => console.log("Erro ao conectar:", err));

app.listen(3000, () => {
    console.log("API rodando na porta 3000");
});