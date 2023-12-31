import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";

import classes from "./Overlay.module.css";

const Overlay = ({
  children,
  className = "",
  overlayIsOpen = false,
  onClickBackdrop = () => {},
}) => {
  const classesTemplate = `${classes["overlay"]} ${classes[className]} ${
    classes[overlayIsOpen ? "show-" + className : undefined]
  }`;

  return (

    <div className={classesTemplate}>
      {children}
      {overlayIsOpen &&
        ReactDOM.createPortal(
          <Backdrop className={className+"-backdrop"} onClick={onClickBackdrop} />,
          document.getElementById("backdrop-root")
        )}
    </div>
  );
};

export default Overlay;
