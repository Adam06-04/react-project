import { useDispatch } from "react-redux";
import { tasksActions, uiActions } from "../store";
import Button from "../UI/Button";
import classes from "./Task.module.css";

const Task = ({title, description, index}) => {
  const dispatch  = useDispatch()

  const onEditTask = () => {
    dispatch(uiActions.toEdit({title: title, description: description, id: index}))
  }

  const onDeleteTask = () => {
    dispatch(tasksActions.remove(index))
  };

  return (
    <div className={classes.card}>
      <h1>{title}</h1>
      <p>{description}</p>
      <Button className={classes.edit} onClick={onEditTask}>
        Edit
      </Button>
      <Button className={classes.delete} onClick={onDeleteTask}>
        Delete
      </Button>
    </div>
  );
};

export default Task;
