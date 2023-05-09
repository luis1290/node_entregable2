// paso 1 importar sequelize
const { Sequelize } = require('sequelize');

// crear una instancia de sequelize con la configuracion de la conexion
const db = new Sequelize({
  host: "localhost",
  database: "entregable2",
  port: 5432,
  username: "postgres",
  password: "1234",
  dialect: "postgres"
});

module.exports = db;