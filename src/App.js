import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { TodosProvider } from "./components/TodoContext";

export default function TodoApp() {
    return (
      <TodosProvider>
        <AddTodo />
        <TodoList />
      </TodosProvider>
    );
  }