import { Fragment } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store";
import classes from "./Modal.module.css";

const Backdrop = () => {
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(uiActions.toggle());
  };

  return <div onClick={toggle} className={classes.backdrop}></div>;
};

const Overlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children }) => {
  const { isShow } = useSelector((state) => state.ui);

  return (
    <Fragment>
      {createPortal(
        <div className={!isShow ? classes.hide : ""}>
          <Backdrop />
          <Overlay>{children}</Overlay>
        </div>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
