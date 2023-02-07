import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions, uiActions } from "../store";
import Button from "../UI/Button";
import classes from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const newTask = (e) => {
    e.preventDefault();
    dispatch(tasksActions.add({ title: title, description: description }));
    setTitle("");
    setDescription("");
    dispatch(uiActions.toggle());
  };

  const editTask = (e) => {
    e.preventDefault();
    dispatch(
      tasksActions.edit({
        title: title,
        description: description,
        id: ui.idToEdit,
      })
    );
    setTitle("");
    setDescription("");
    dispatch(uiActions.toggle());
  };

  const onResetForm = () => {
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (ui.isEdition) {
      setTitle(ui.titleToEdit);
      setDescription(ui.descriptionToEdit);
    } 
    else {
      setTitle("");
      setDescription("");
    }
  }, [ui.isEdition, ui.titleToEdit, ui.descriptionToEdit]);

  return (
    <div className={classes.card}>
      <form onSubmit={ui.isEdition ? editTask : newTask} onReset={onResetForm}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          maxLength="40"
          value={title}
          onChange={onChangeTitle}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          maxLength="500"
          value={description}
          onChange={onChangeDescription}
        ></textarea>
        <Button type="submit">{ui.isEdition ? "Edit Task" : "Add Task"}</Button>
        <Button type="reset">Reset</Button>
      </form>
    </div>
  );
};

export default Form;
