const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  todos: {
    type: String,
  },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = {
  Todo,
};
