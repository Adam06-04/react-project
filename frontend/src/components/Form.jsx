import { useState } from "react";
import { useTasks } from "../context/Tasks";
import classes from "./Form.module.css";

const Form = () => {
  const {dispatch} = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const newTask = (e) => {
        e.preventDefault();
        dispatch({type: "add", title: title, description: description});
        setTitle('');
        setDescription('');
    }

    const onResetForm = () => {
        setTitle('');
        setDescription('');
    }

  return (
    <div className={classes.card}>
      <form onSubmit={newTask} onReset={onResetForm}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" maxLength="40" value={title} onChange={onChangeTitle}/>
        <label htmlFor="description">Description</label>
        <textarea name="description" maxLength="500" value={description} onChange={onChangeDescription}></textarea>
        <button type="submit">Create New Task</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
};

export default Form;
