import { useState, useContext } from "react";
import { TodosDispatchContext } from "./TodoContext";

let nextId = 0;

export default function AddTodo() {
    const [text, setText] = useState('');
    const dispatch = useContext(TodosDispatchContext);

    return (
        <>
            <input 
                placeholder="Add todo"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button onClick={() => {
                if (text.trim()) {
                    dispatch({
                        type: 'added',
                        id: nextId++, 
                        text: text,
                    });
                    setText('');
                }
            }}>Add</button>
        </>
    );
}
