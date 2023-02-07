import { useDispatch } from "react-redux";
import Form from "./components/Form";
import TaskList from "./components/TaskList";
import Header from "./layouts/Header";
import { uiActions } from "./store";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

const App = () => {
  const dispatch = useDispatch();

  const onToggle = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <>
      <Header>
        <Button onClick={onToggle}>Create New Task</Button>
      </Header>
      <Modal>
        <Form />
      </Modal>
      <TaskList />
    </>
  );
};

export default App;
