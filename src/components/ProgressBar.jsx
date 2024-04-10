import classes from "../assets/css/ProgressBar.module.css";
import Button from "./Button";
import { useRef, useState } from "react";

export default function ProgressBar({ next, prev, submit, progress }) {
  const [toolTip, setToolTip] = useState(false);
  const toggleRef = useRef();

  function toggleToolTip() {
    if (toolTip) {
      setToolTip(false);
      toggleRef.current.style.display = "none";
    } else {
      setToolTip(true);
      toggleRef.current.style.left = `calc(${progress}% - 65px)`;
      toggleRef.current.style.display = "block";
    }
  }

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={toggleRef}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toggleToolTip}
            onMouseOut={toggleToolTip}
          ></div>
        </div>
      </div>

      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : next}
      >
        <span>{progress === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
