import "../assets/css/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from "./pages/Result";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/" element={<PublicRoute />}>
              <Route exact path="/signup" element={<SignUp />} />
            </Route>
            <Route exact path="/" element={<PublicRoute />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/quiz/:id" element={<Quiz />} />
            </Route>

            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/result/:id" element={<Result />} />
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}
export default App;
