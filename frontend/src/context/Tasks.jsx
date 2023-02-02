import { createContext, useContext, useEffect, useReducer } from "react";
import Task from "../classes/Task";

const TasksContext = createContext();

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "remove": {
      return {
        tasks: state.tasks.filter((value, index) => index !== action.id),
      };
    }
    case "add": {
      return { tasks: [...state.tasks, new Task(action.title, action.description)] };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [] }, (tasks) => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? {tasks: JSON.parse(savedTasks)} : tasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks))
  }, [state]);

  const value = { state, dispatch };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TasksProvider");
  }
  return context;
};

export { TasksProvider, useTasks };
