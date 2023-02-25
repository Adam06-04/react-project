import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions, uiActions } from "../store";
import Button from "../UI/Button";
import classes from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const enteredTitleRef = useRef("");
  const enteredDescRef = useRef("");

  // const onChangeTitle = (e) => {
  //   enteredTitleRef.current.value = e.target.value;
  // };

  // const onChangeDescription = (e) => {
  //   enteredDescRef.current.value = e.target.value;
  // };

  const newTask = (e) => {
    e.preventDefault();
    dispatch(
      tasksActions.add({
        title: enteredTitleRef.current.value,
        description: enteredDescRef.current.value,
      })
    );
    enteredTitleRef.current.value = "";
    enteredDescRef.current.value = "";
    dispatch(uiActions.toggle());
  };

  const editTask = (e) => {
    e.preventDefault();
    dispatch(
      tasksActions.edit({
        title: enteredTitleRef.current.value,
        description: enteredDescRef.current.value,
        id: ui.idToEdit,
      })
    );
    enteredTitleRef.current.value = "";
    enteredDescRef.current.value = "";
    dispatch(uiActions.toggle());
  };

  const onResetForm = () => {
    enteredTitleRef.current.value = "";
    enteredDescRef.current.value = "";
  };

  useEffect(() => {
    if (ui.isEdition) {
      enteredTitleRef.current.value = ui.titleToEdit;
      enteredDescRef.current.value = ui.descriptionToEdit;
    } else {
      enteredTitleRef.current.value = title;
      enteredDescRef.current.value = desc;
    }
  }, [ui.isEdition, ui.titleToEdit, ui.descriptionToEdit, title, desc]);

  useLayoutEffect(() => {
    if (!ui.isEdition) return;
    setTitle(enteredTitleRef.current.value);
    setDesc(enteredDescRef.current.value);
  }, [ui.isEdition]);

  return (
    <div className={classes.card}>
      <form onSubmit={ui.isEdition ? editTask : newTask} onReset={onResetForm}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" maxLength="40" ref={enteredTitleRef} />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          maxLength="500"
          ref={enteredDescRef}
        ></textarea>
        <Button type="submit">{ui.isEdition ? "Edit Task" : "Add Task"}</Button>
        <Button type="reset">Reset</Button>
      </form>
    </div>
  );
};

export default Form;
