import { createContext, useReducer, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

export const TodosContext = createContext(null);
export const TodosDispatchContext = createContext(null);


const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];

export function TodosProvider() {
    const [todos, dispatch] = useReducer(todosReducer, initialTodos);


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <TodosContext.Provider value={todos}>
            <TodosDispatchContext.Provider value={dispatch}>
                <AddTodo />
                <TodoList />
            </TodosDispatchContext.Provider>
        </TodosContext.Provider>
    );
}

function todosReducer(todos, action) {
    switch(action.type) {
        case 'added': {
            return [...todos, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return todos.map(t => {
                if (t.id === action.todo.id) {
                    return action.todo;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return todos.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('unknown action: ' + action.type);
        }
    }
}
