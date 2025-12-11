import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobToEdit = location.state?.job; // Get data passed from Dashboard

  const [job, setJob] = useState(jobToEdit || {});

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8082/jobs/${job.id}`, job, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job Updated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to update job.");
    }
  };

  if (!jobToEdit) return <div>Invalid Access</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-8">
          Edit Job: {job.title}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6"
        >
          {/* Same fields as PostJob, but values pre-filled from 'job' state */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              name="title"
              value={job.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="company"
              value={job.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Company"
            />
            <input
              name="location"
              value={job.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Location"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="salary"
              value={job.salary}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Salary"
            />
            <input
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Job Type"
            />
          </div>

          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            rows="5"
            className="w-full p-2 border rounded"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}
