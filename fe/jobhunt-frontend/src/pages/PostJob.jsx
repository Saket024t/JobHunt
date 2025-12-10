import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Fix import

export default function PostJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
    description: "",
    skillsRequired: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in!");
        return;
      }

      // Decode token to get User ID
      const decoded = jwtDecode(token);
      const userId = decoded.userId; // matches "userId" we added in Java

      // Prepare payload
      const payload = {
        ...job,
        postedBy: userId,
      };

      // Call Job Service (Port 8082)
      await axios.post("http://localhost:8082/jobs", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Job Posted Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        "Failed to post job. " +
          (error.response?.data?.message || "Server Error")
      );
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-primary mb-8">Post a New Job</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-surface p-8 rounded-xl shadow-sm border border-gray-100 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-textMain mb-1">
                Job Title
              </label>
              <input
                name="title"
                onChange={handleChange}
                className="w-full p-2 border rounded focus:border-secondary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textMain mb-1">
                Company Name
              </label>
              <input
                name="company"
                onChange={handleChange}
                className="w-full p-2 border rounded focus:border-secondary outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-textMain mb-1">
                Location
              </label>
              <input
                name="location"
                onChange={handleChange}
                className="w-full p-2 border rounded focus:border-secondary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textMain mb-1">
                Salary Range
              </label>
              <input
                name="salary"
                placeholder="e.g. 12LPA"
                onChange={handleChange}
                className="w-full p-2 border rounded focus:border-secondary outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-textMain mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white focus:border-secondary outline-none"
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-textMain mb-1">
                Skills (Comma separated)
              </label>
              <input
                name="skillsRequired"
                placeholder="Java, React, AWS"
                onChange={handleChange}
                className="w-full p-2 border rounded focus:border-secondary outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMain mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              rows="5"
              onChange={handleChange}
              className="w-full p-2 border rounded focus:border-secondary outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-md font-bold hover:bg-emerald-600 transition-colors"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
