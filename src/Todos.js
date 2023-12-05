import { useEffect, useState } from "react";
import { getApiUrl } from "./Common";
import Todo from "./Todo";

function Todos() {
    let hideDoneStorageKey = "react-todo-app-hide-done";

    const [todos, setTodos] = useState([]);
    const [hideDone, setHideDone] = useState(localStorage.getItem(hideDoneStorageKey) === "true");
    const [newTaskName, setNewTaskName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(getApiUrl(''))
        .then((response) => {
            response.json().then((data) => {
                setTodos(data);
            });
        });
    }, [setTodos]);

    const createTaskOnEnter = (ev) => {
        if (ev.key === "Enter") {
            createTask();
        }
    };

    const createTask = () => {
        if (loading || !newTaskName) return;
        setLoading(true);
        const form = new FormData();
        form.append("name", newTaskName.trim());
        fetch(getApiUrl(''), {"method": "post", "body": form})
        .then((response) => {
            response.json().then((data) => {
                addTodo(data);
                setLoading(false);
                setNewTaskName("");
            });
        })
    };

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    }

    const onDelete = (todoId) => {
        if (loading || !todoId) return;
        setLoading(true);
        fetch(getApiUrl('/' + todoId), {method: "DELETE"})
        .then(() => {
            setLoading(false);
            setTodos(todos.filter((todo) => todo.id !== todoId));
        })
    }

    const toggleHideDone = () => {
        localStorage.setItem(hideDoneStorageKey, !hideDone);
        setHideDone(!hideDone);
    }

    return (
        <div id="todosContainer">
            <div id="todosMenu">
                <input type="checkbox" checked={hideDone} onClick={toggleHideDone} />
                <span onClick={toggleHideDone}>Hide done</span>
            </div>
            <div id="newTodo">
                <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value.trimStart())}
                    placeholder="Create New Task" onKeyDown={createTaskOnEnter} />
                <button type="button" onClick={createTask} className="save">CREATE</button>
            </div>
            <div id="todosList">
                { todos
                    .map(todo => {
                        return (
                            <Todo todo={todo} key={todo.id} hideDone={hideDone} deleteCallback={onDelete}></Todo>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Todos;
