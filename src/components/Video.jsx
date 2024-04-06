import classes from "../assets/css/Video.module.css";
// import Image from "../assets/images/3.jpg";
export default function Video({ title, id, noq }) {
  return (
    <div className={classes.video}>
      <img
        src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
      />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Question</p>
        <p>Total Score: {noq * 5}</p>
      </div>
    </div>
  );
}
