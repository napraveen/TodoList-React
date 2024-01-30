const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  todos: {
    type: String,
  },
  // status: {
  //   type: String,
  // },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = {
  Todo,
};
