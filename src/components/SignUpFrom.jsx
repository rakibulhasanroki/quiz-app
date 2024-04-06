import From from "./From";
import InputText from "./InputText";
import Button from "./Button";
import classes from "../assets/css/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import { UseAuth } from "../context/AuthContext";
import { useState } from "react";
export default function SignUpFrom() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [error, setError] = useState();
  const [laoding, setLoading] = useState();

  const { signup } = UseAuth();
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      history("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Signup Failed");
    }
  }

  return (
    <From className={`${classes.signup}`} action="#" onSubmit={handleSubmit}>
      <InputText
        type="text"
        placeholder="Enter Name"
        required
        icon="person"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputText
        type="text"
        placeholder="Enter Email"
        required
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputText
        type="password"
        placeholder="Enter Password"
        required
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputText
        type="password"
        placeholder="Confirm Password"
        required
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Checkbox
        text="I agree to the Terms & Conditions"
        required
        value={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />
      <Button type="submit" disabled={laoding}>
        <span>Submit Now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </From>
  );
}
