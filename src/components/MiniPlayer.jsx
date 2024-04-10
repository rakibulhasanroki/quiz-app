import { useRef, useState } from "react";
import classes from "../assets/css/MiniPlayer.module.css";
import ReactPlayer from "react-player";

export default function MiniPlayer({ id, title }) {
  const [status, setStatus] = useState(false);
  const playerRef = useRef();
  const videoURL = `https://www.youtube.com/watch?v=${id}`;
  function togglePlayer() {
    if (!status) {
      playerRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      playerRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      onClick={togglePlayer}
      ref={playerRef}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={togglePlayer}
      >
        {" "}
        close{" "}
      </span>
      {status && (
        <>
          <ReactPlayer
            className={classes.player}
            url={videoURL}
            width="300px"
            height="168px"
            playing={status}
            controls
          />
          <p>{title}</p>
        </>
      )}
    </div>
  );
}
