import classes from "./TaskList.module.css";
import Task from "./Task";
import { useTasks } from "../context/Tasks";

const TaskList = () => {
  const ctx = useTasks();
  const { tasks } = ctx.state;

  return <div className={classes.card}>
    {!tasks.length && <h2>There is no task</h2>}
    {!!tasks.length && tasks.map((value, index) => {
        return <Task title={value.title} description={value.description} key={index} index={index}/>
    })}
  </div>;
};

export default TaskList;
