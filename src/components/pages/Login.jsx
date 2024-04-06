import Illustration from "../Illustration";
import loginImage from "../../assets/images/login.svg";
import LoginFrom from "../LoginFrom";
export default function Login() {
  return (
    <>
      <h1>Login to your account</h1>
      <div className="column">
        <Illustration imageSrc={loginImage} alt="login" />
        <LoginFrom />
      </div>
    </>
  );
}
