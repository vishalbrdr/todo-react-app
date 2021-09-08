import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';

import './App.css';
import sunIcon from "./icon-sun.svg"
import moonIcon from "./icon-moon.svg"

const LOCAL_STORAGE_KEY = 'todoApp.todos'
const LOCAL_STORAGE_THEME_KEY = 'todoApp.theme'
function App() {
  const [allTodos, setAllTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [activeTodos, setActiveTodos] = useState([])
  const [todos, setTodos] = useState([])
  const [dark, setDark] = useState(true)
  const todoNameRef = useRef();
  document.body.classList.add("dark")
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setAllTodos(storedTodos)
    const mytheme = JSON.parse(localStorage.getItem(LOCAL_STORAGE_THEME_KEY))
    if (mytheme) setDark(mytheme)
  }, [])
  useEffect(() => {
    setTodos(allTodos)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allTodos))
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(dark))
    function handleShowCompletedTodo() {
      const newTodos = allTodos.filter(todo => todo.complete)
      setCompletedTodos(newTodos)
    }
    function handleShowActiveTodo() {
      const newTodos = allTodos.filter(todo => !todo.complete)
      setActiveTodos(newTodos)
    }
    handleShowCompletedTodo()
    handleShowActiveTodo()
    const navBtns = document.querySelectorAll(".navigation button")
    navBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.add("active")
        navBtns.forEach(b => {
          if (b !== btn) {
            b.classList.remove("active")
          }
        })
      })
    })
  }, [allTodos])


  function handleNav() {
    const navBtns = document.querySelectorAll(".navigation button")
    navBtns.forEach((btn) => btn.classList.remove("active"))
    navBtns[0].classList.add("active")
  }
  function toggleTodo(id) {
    const newTodos = [...allTodos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setAllTodos(newTodos)
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if (name === "") return
    setAllTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
    handleNav()
  }
  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      handleAddTodo()
    }
  }
  function handleShowCompletedTodo() {
    setTodos(completedTodos)
  }
  function handleShowActiveTodo() {
    setTodos(activeTodos)
  }
  function handleShowAllTodo() {
    setTodos(allTodos)
  }
  function handleClearTodos() {

    const newTodos = allTodos.filter(todo => !todo.complete)
    setAllTodos(newTodos)
    handleNav()
  }
  function removeTodo(id) {
    let updatedTodos = [...allTodos].filter((todo) => todo.id !== id);
    setAllTodos(updatedTodos);
    handleNav()
  }
  function toggleTheme() {
    document.body.classList.toggle("dark")
    document.body.classList.toggle("light")
    setDark(!dark)
  }
  return (
    <div className="App">
      <div className="heading">
        <h1>Todo</h1>
        <button onClick={toggleTheme} className="btn-toggle"><img src={dark ? sunIcon : moonIcon} alt="" /></button>
      </div>
      <div className="main">
        <div className="todo-input">
          <span className="circle"></span>
          <input type="text" placeholder="Create a new todo..." ref={todoNameRef} onKeyDown={handleKeyPress} />
        </div>
        <div className="lists">
          <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
          <div className="utilities">
            <div className="left-todo">{allTodos.filter(todo => !todo.complete).length} items left</div>
            <div className="navigation">
              <button onClick={handleShowAllTodo} className="active">All</button>
              <button onClick={handleShowActiveTodo}  >Active</button>
              <button onClick={handleShowCompletedTodo} >Completed</button>
            </div>
            <div className="clear-todo">
              <button onClick={handleClearTodos}>Clear Completed</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div>Drag and drop to reorder list</div>
        <div className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" rel="noopener noreferrer" target="_blank">Frontend Mentor</a>.
          Coded by <a href="https://instagram.com/vishal_brdr">Vishal Biradar</a>.
        </div>
      </div>
    </div>
  )
}

export default App;
