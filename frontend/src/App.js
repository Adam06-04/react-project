// import { useEffect, useState } from "react";
// import Task from "./classes/Task";
import Form from "./components/Form";
import TaskList from "./components/TaskList";
import { TasksProvider } from "./context/Tasks";

const App = () => {
  return (
    <TasksProvider>
      <Form></Form>
      <TaskList></TaskList>
    </TasksProvider>
  );
};

export default App;
