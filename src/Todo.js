import { useState } from "react";
import { getApiUrl } from "./Common";

function Todo({ todo, hideDone, deleteCallback }) {
    const [done, setDone] = useState(todo.done);
    const [name, setName] = useState(todo.name);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);

    function toggleDone() {
        if (loading || edit) return;
        setLoading(true);
        fetch(getApiUrl(todo.id + (done ? "/not_done" : "/done")), {
            "method": "post",
        })
        .then((response) => {
            response.json().then((data) => {
                setDone(data.done);
                setLoading(false);
            });
        });
    }

    function onEdit() {
        if (loading) return;
        setEdit(true);
    }

    function onSave() {
        if (loading || !edit) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        fetch(getApiUrl(todo.id), {
            "method": "post",
            "body": formData,
        })
        .then(() => {
            setLoading(false);
            setEdit(false);
        });
    }

    function onchangeName(ev) {
        setName(ev.target.value);
    }

    let classes = "todo ";
    if (done) classes = classes + "done ";
    if (loading) classes = classes + "loading ";
    if (hideDone) classes = classes + (done ? "hidden " : "");

    return (
        <div className={classes}>
            { edit ? (
                <input type="text" value={name} onChange={onchangeName}/>
            ) : (
                <>
                    <input type="checkbox" checked={done} onChange={toggleDone}/>
                    <span onClick={toggleDone}>{ name }</span>
                </>
            ) }
            { edit ? (
                <button type="button" className="save" onClick={onSave}>SAVE</button>
            ) : (
                <button type="button" className="edit" onClick={onEdit}>EDIT</button>
            ) }
            <button type="button" className="remove" onClick={() => deleteCallback(todo.id)}>DELETE</button>
        </div>
    )
}

export default Todo;
