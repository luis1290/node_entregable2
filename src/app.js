const express = require('express');
const db = require('./utils/database');
const Todos = require('./models/todos.model')
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8000;


db.authenticate()//es una funion asincrono
  .then(() => console.log("Base de datos conectada"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('base de datos sincronizada'))
  .catch(err => console.log(err));


// creamos instancia de express llamada app
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('servidor funcionando')
});

//endpoint obtener todo de la tabla
app.get('/api/v1/todos', async (req, res) => {
  try {
    const todos = await Todos.findAll();
    res.json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

//endpoint obtener por id
app.get('/api/v1/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.findByPk(id);
    res.json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

//endpoint crear nueva tarea 
app.post('/api/v1/todos', async (req, res) => {
  try {
    const newTodo = req.body;
    await Todos.create(newTodo);
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

//endpoint update todos 
app.put('/api/v1/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    await Todos.update({ title, description, completed }, {
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});


//endpont eliminar todos
app.delete('/api/v1/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todos.destroy({
      where: {id}
    })
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});



//dejar escuchando el servidor
app.listen(PORT, () => {
  console.log(`servidor escuchando en el pto ${PORT}`);
})