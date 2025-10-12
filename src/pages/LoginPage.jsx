import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";
import Spinner from "../components/Spinner";
import logo from "../assets/logo-h.png";
import "../styles/AuthForm.css";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.email.trim() || !formData.password.trim()) {
      setNotification({
        message: "Please enter both email and password.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setNotification({ message: "", type: "" });

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setIsLoading(false);

      // Debug log: print backend response
      console.log("Login response:", response.data);

      // ✅ Backend returns { success: true, message, data: { token } }
      if (response.data.success) {
        setNotification({
          message: "Login successful!",
          type: "success",
        });

        // Store token
        if (response.data.data?.token) {
          localStorage.setItem("authToken", response.data.data.token);
        }

        // Store user info if provided
        if (response.data.data?.user) {
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
        }

        // Redirect after short delay for UX
        setTimeout(() => {
          navigate("/dashboard");
        }, 800);
      } else {
        // Handle backend error (even if status 200 but success: false)
        setNotification({
          message: response.data.error || "Login failed. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        // Backend returned 4xx or 5xx
        setNotification({
          message: error.response.data.error || "Invalid credentials. Please try again.",
          type: "error",
        });
      } else if (error.request) {
        // No response received from backend
        setNotification({
          message: "Server did not respond. Please check your connection.",
          type: "error",
        });
      } else {
        // Any other unexpected error
        setNotification({
          message: error.message || "An unexpected error occurred.",
          type: "error",
        });
      }

      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <img src={logo} alt="Happenix Logo" className="auth-logo" />
        <h2>Welcome To Happenix</h2>
        <p>Please sign in or sign up below.</p>

        {/* Notification message */}
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onDismiss={() => setNotification({ message: "", type: "" })}
          />
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Mail Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@cusat.ac.in"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : "Sign In"}
          </button>
        </form>

        <p className="auth-switch-link">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;