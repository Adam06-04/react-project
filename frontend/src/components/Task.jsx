import { useTasks } from "../context/Tasks";
import classes from "./Task.module.css";
const Task = (props) => {
  const { dispatch } = useTasks();
  const onDeleteTask = () => {
    dispatch({type: "remove", id: props.index})
  };

  return (
    <div className={classes.card}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <button type="button" onClick={onDeleteTask}>
        Delete
      </button>
    </div>
  );
};

export default Task;
