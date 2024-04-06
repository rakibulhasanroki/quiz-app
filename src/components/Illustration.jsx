import classes from "../assets/css/Illustration.module.css";

export default function Illustration({ imageSrc, alt }) {
  return (
    <div className={classes.illustration}>
      <img src={imageSrc} alt={alt} />
    </div>
  );
}
