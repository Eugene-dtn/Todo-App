import { useState, useContext } from "react";
import { TodosContext, TodosDispatchContext } from "./TodoContext";

export default function TodoList() {
    const todos = useContext(TodosContext);

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                  <Todo todo={todo}/>
                </li>
            ))}
        </ul>
    );
}

function Todo({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useContext(TodosDispatchContext);
    let todoContext;

    if (isEditing) {
        todoContext = (
            <>
                <input 
                    value={todo.text}
                    onChange={e => {
                        dispatch({
                            type: 'changed',
                            todo: {
                                ...todo,
                                text: e.target.value,
                            }
                        });
                    }}
                />
                <button onClick={() => setIsEditing(false)}>Save</button>
            </>
        );
    } else {
        todoContext = (
            <>
                {todo.text}
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
        );
    }

    return (
        <label>
            <input 
                type="checkbox"
                checked={todo.done}
                onChange={e => {
                    dispatch({
                        type: 'changed',
                        todo: {
                            ...todo,
                            done: e.target.checked
                        }
                    });
                }} 
            />
            {todoContext}
            <button onClick={() => {
                dispatch({
                    type: 'deleted',
                    id: todo.id
                });
            }}>Delete</button>
        </label>
    );
}
