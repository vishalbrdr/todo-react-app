import React, { useState } from "react"
import iconCross from "./icon-cross.svg"
import iconCheck from "./icon-check.svg"


export default function Todo({ todo, toggleTodo, removeTodo }) {
    const [dargging, setDargging] = useState(false)
    function handleOnChange() {
        toggleTodo(todo.id)
    }
    function handleDragStart() {
        setDargging(true)
    }
    function handleDragEnd() {
        setDargging(false)
    }

    return (
        <li
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={dargging ? "Todo dragging draggable" : "Todo draggable"}
        >   
            
            <input type="checkbox" id={todo.id} checked={todo.complete} onChange={handleOnChange} />
            <label htmlFor={todo.id}>
                <span className={todo.complete?"checkbox checked": "checkbox"}><img src={iconCheck} alt=""/></span>
                <span className="todo-name" >{todo.name}</span>
            </label>
            <button onClick={() => removeTodo(todo.id)} className="btn-remove" > <img src={iconCross} alt="" /> </button>
        </li>
    )
}
