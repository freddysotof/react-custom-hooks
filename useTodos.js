import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"


const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}
export const useTodos = (initialState = []) => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])


    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };

        dispatch(action);
    }
    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    // const todosCount =dispatch({
    //         type: '[TODO] All Todos Count',
    //     });

    // const pendingTodosCount = dispatch({
    //         type: '[TODO] Pending Todos Count',
    //     });

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount:todos.length,
        pendingTodosCount:todos.filter(todo=>!todo.done).length
    }
}
