import Illustration from "../Illustration";
import signupImage from "../../assets/images/signup.svg";
import SignUpFrom from "../SignUpFrom.jsx";
export default function SingUp() {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration imageSrc={signupImage} alt="signup" />
        <SignUpFrom />
      </div>
    </>
  );
}
