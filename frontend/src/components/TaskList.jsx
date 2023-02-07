import classes from "./TaskList.module.css";
import Task from "./Task";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TaskList = () => {
  const {tasks} = useSelector((state) => state.tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={classes.card}>
      {!tasks.length && <h2>There is no task</h2>}
      {!!tasks.length &&
        tasks.map((value, index) => {
          return (
            <Task
              title={value.title}
              description={value.description}
              key={index}
              index={index}
            />
          );
        })}
    </div>
  );
};

const MemoedTaskList = memo(TaskList);

export default MemoedTaskList;
