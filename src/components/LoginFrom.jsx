import classes from "../assets/css/Login.module.css";
import From from "./From";
import InputText from "./InputText";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { useState } from "react";
export default function LoginFrom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { login } = UseAuth();
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Login Failed");
    }
  }

  return (
    <From className={`${classes.login}`} action="#" onSubmit={handleSubmit}>
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
      <Button type="submit" disabled={loading}>
        <span>Submit Now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Don &apos; t have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </From>
  );
}
