import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      const data = await loginUser(formData);

      if (!data.token) {
        throw new Error(
          "Login response did not contain an authentication token.",
        );
      }

      // Save JWT for authenticated API requests
      localStorage.setItem("token", data.token);

      // Save user information if returned by the backend
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/seller-dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section auth-page">
      <div className="auth-card">
        <div className="auth-heading">
          <span className="auth-eyebrow">WELCOME BACK</span>
          <h1>Login to HostelXchange</h1>
          <p>Sign in and connect with your student community.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
