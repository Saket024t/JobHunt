import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    if (apiError) setApiError("");
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/token",
        formData
      );
      localStorage.setItem("token", response.data);
      navigate("/dashboard"); // Instant redirect, no alert
    } catch (error) {
      // Use the clean error message from our GlobalExceptionHandler
      setApiError(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="w-full max-w-md bg-surface p-8 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Login to JobHunt
        </h2>

        {/* Error Box */}
        {apiError && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200 text-center">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textMain mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:outline-none focus:border-secondary ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-textMain mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:outline-none focus:border-secondary ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white p-2 rounded hover:bg-emerald-600 font-semibold transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-textMuted">
          Don't have an account?{" "}
          <a href="/signup" className="text-secondary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
