import React, { useRef } from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo, removeTodo }) {
    const dragOverRef = useRef()
    const handleOnDragOver = (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(e.clientY)
        const draggable = document.querySelector(".dragging")
        if (afterElement == null) {
            dragOverRef.current.appendChild(draggable)
        } else {
            dragOverRef.current.insertBefore(draggable, afterElement)
        }
    }
    const getDragAfterElement = y => {
        const draggableElements = [...dragOverRef.current.querySelectorAll('.draggable:not(.dragging')]
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }
    return (
        <ul onDragOver={handleOnDragOver} ref={dragOverRef}>
            {todos.map(todo => <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo}/>)}
        </ul>
    )
}
