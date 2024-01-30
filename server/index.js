const express = require('express');

const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const { Todo } = require('./db');
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
mongoose
  .connect('mongodb://0.0.0.0/todo')
  .then(() => console.log('MongoDB is  connected successfully'))
  .catch((err) => console.error(err));

// app.get('/', async (req, res) => {
//   res.send({ message: 'This is home page' });
// });

app.post('/api/addone', async (req, res) => {
  try {
    const newTodo = req.body.todos;
    const todo = new Todo({ todos: newTodo });
    await todo.save();

    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/showall', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/api/removetodo/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    await Todo.findOneAndDelete({ _id: todoId });

    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(4000, () => {
  console.log('Server running on 4001');
});
