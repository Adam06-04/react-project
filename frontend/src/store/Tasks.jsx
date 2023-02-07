import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import Task from "../classes/Task";

const TasksContext = createContext();

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "remove": {
      return {
        ...state,
        tasks: state.tasks.filter((value, index) => index !== action.id),
      };
    }
    case "add": {
      return {
        ...state,
        tasks: [...state.tasks, new Task(action.title, action.description)],
      };
    }
    case "edit": {
      return {
        ...state,
        tasks: state.tasks.filter((value, index) => {
          if (index !== action.id) {
            return value;
          } else {
            return new Task(action.title, action.description);
          }
        }),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [] }, (state) => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? { tasks: JSON.parse(savedTasks) } : state;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

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
