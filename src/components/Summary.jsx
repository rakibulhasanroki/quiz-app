import classes from "../assets/css/Summary.module.css";
import successImage from "../assets/images/success.png";
import useFetch from "./hooks/useFetch";
export default function Summary({ score, noq }) {
  function getImage() {
    console.log("summary");
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "better luck";
    }
  }

  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${getImage()}&per_page=1`,
    "GET",
    {
      Authorization: import.meta.env.VITE_REACT_APP_IMAGE_API,
    }
  );
  const image = result ? result?.photos[0].src.medium : successImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>
      {loading && <div>Loading....</div>}
      {error && <div>There is an error.</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}
