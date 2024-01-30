import React, { useEffect } from 'react';
import { useState } from 'react';
import '../css/home.css';
import bgImg from '../images/bgimg.jpg';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const handleAddTodo = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/addone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todos: inputValue }),
      });
      const data = await response.json();
      setTodos(data.todos);
      console.log('data ', data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveTodo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/removetodo/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setTodos(data.todos);
      console.log('data ', data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function showAll() {
      try {
        const res = await fetch('http://localhost:4000/api/showall');
        const data = await res.json();
        setTodos(data.todos);
        console.log('data ', data.todos);
      } catch (error) {
        console.error(error);
      }
    }

    showAll();
  }, []);

  return (
    <div>
      {' '}
      <div className="container" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="todo">
          <h1>My Todo List </h1>
          <input
            type="text"
            placeholder="Enter the Text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="button" onClick={handleAddTodo} className="add-button">
            Add
          </button>
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                {todo.todos}
                <button
                  onClick={() => handleRemoveTodo(todo._id)}
                  className="remove-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
