import Navbar from "../components/Navbar";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Jobs");
  const [jobs, setJobs] = useState([]);
  const [userRole, setUserRole] = useState("EMPLOYEE");
  const [loading, setLoading] = useState(true);

  // --- HANDLERS ---

  // 1. Fetch Jobs from Backend
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8082/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Apply Click
  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to apply!");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      const applicationData = {
        jobId: jobId,
        applicantId: userId,
        resumeUrl: "https://linkedin.com/placeholder",
        status: "APPLIED",
      };

      await axios.post("http://localhost:8083/applications", applicationData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Application Successful! You can track it in My Applications.");
    } catch (error) {
      console.error(error);
      alert(
        "Failed to apply: " + (error.response?.data?.message || "Server Error")
      );
    }
  };

  // 3. Handle Job Status Toggle (Pause/Resume)
  const handlePause = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8082/jobs/${jobId}/status`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchJobs(); // Refresh list
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  // 4. Handle Job Close
  const handleClose = async (jobId) => {
    if (
      !window.confirm(
        "Are you sure you want to CLOSE this job? It will be removed from circulation."
      )
    ) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8082/jobs/${jobId}/close`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchJobs(); // Refresh list
    } catch (error) {
      alert("Failed to close job.");
    }
  };

  // 5. Handle Edit
  const handleEdit = (job) => {
    navigate("/edit-job", { state: { job } });
  };

  // --- USE EFFECT (ON LOAD) ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (e) {
        console.error("Invalid Token", e);
      }
    }
    fetchJobs();
  }, []);

  // --- JSX RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* === HERO / WELCOME SECTION === */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-500">
              Here is what's happening in your network.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex w-full md:w-auto bg-gray-50 p-1 rounded-lg border border-gray-200">
            <input
              type="text"
              placeholder="Job title, keywords..."
              className="bg-transparent px-4 py-2 outline-none text-gray-700 w-64"
            />
            <button className="bg-[#10B981] text-white px-6 py-2 rounded-md font-semibold hover:bg-emerald-600 transition-colors">
              Search
            </button>
          </div>

          {/* Recruiter Action Button */}
          {userRole === "RECRUITER" && (
            <Link
              to="/post-job"
              className="flex items-center gap-2 bg-[#0F172A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-shadow shadow-lg"
            >
              <PlusCircle size={20} /> Post a Job
            </Link>
          )}
        </div>

        {/* --- MAIN LAYOUT GRID --- */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* === LEFT SIDEBAR === */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
              <div className="flex flex-col text-gray-700 font-medium">
                {[
                  "Upcomings...",
                  "News",
                  "Update Resume",
                  "My Offers",
                  "Settings",
                ].map((item, index) => (
                  <button
                    key={index}
                    className="px-5 py-4 text-left hover:bg-blue-50 hover:text-[#0F172A] border-b border-gray-50 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* === MAIN CONTENT (TABS & LIST) === */}
          <div className="lg:w-3/4">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {["Jobs", "Applications", "Offers"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 font-semibold text-sm transition-all ${
                    activeTab === tab
                      ? "text-[#10B981] border-b-2 border-[#10B981]"
                      : "text-gray-500 hover:text-[#0F172A]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Job List Feed */}
            <div className="space-y-6">
              {loading ? (
                <p className="text-center text-gray-500">Loading jobs...</p>
              ) : jobs.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  No jobs found.
                </p>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Job Card Header (Blue) */}
                    <div className="bg-[#003366] px-6 py-3 flex justify-between items-center">
                      <h3 className="text-white text-lg font-bold">
                        {job.title}
                      </h3>
                      <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/20">
                        {job.jobType || "Full Time"}
                      </span>
                    </div>

                    {/* Job Body */}
                    <div className="p-6">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {job.description || "No description provided."}
                      </p>

                      {/* Details Grid */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Briefcase size={16} /> {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={16} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={16} /> {job.salary}
                        </span>
                      </div>

                      {/* Skills Section */}
                      <div className="mb-6">
                        <span className="block text-sm font-bold text-gray-800 mb-2">
                          Skills
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {job.skillsRequired &&
                            job.skillsRequired.split(",").map((skill, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md border border-gray-200"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Action Button Area */}
                      <div className="border-t border-gray-100 pt-4 flex justify-end">
                        {/* RECRUITER ACTIONS (Edit, Pause, Close) */}
                        {userRole === "RECRUITER" ? (
                          <div className="flex gap-3">
                            {/* Pause / Resume Button */}
                            {job.status !== "CLOSED" && (
                              <button
                                onClick={() => handlePause(job.id)}
                                className={`px-4 py-2 rounded-md text-sm font-bold border transition-colors ${
                                  job.status === "PAUSED"
                                    ? "border-yellow-500 text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
                                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                                }`}
                              >
                                {job.status === "PAUSED"
                                  ? "Resume Job"
                                  : "Pause Job"}
                              </button>
                            )}

                            {/* Edit Button */}
                            <button
                              onClick={() => handleEdit(job)}
                              className="px-4 py-2 rounded-md text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                              Edit
                            </button>

                            {/* Close Button */}
                            {job.status !== "CLOSED" && (
                              <button
                                onClick={() => handleClose(job.id)}
                                className="px-4 py-2 rounded-md text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors"
                              >
                                Close Job
                              </button>
                            )}

                            {/* Status Indicator (if CLOSED) */}
                            {job.status === "CLOSED" && (
                              <span className="text-sm font-bold text-red-500 italic p-2 border border-red-200 rounded-md">
                                Permanently CLOSED
                              </span>
                            )}
                          </div>
                        ) : (
                          /* SEEKER ACTION (Apply Button) */
                          <button
                            onClick={() => handleApply(job.id)}
                            disabled={job.status !== "OPEN"}
                            className={`px-6 py-2 rounded-md font-bold text-white transition-colors ${
                              job.status === "OPEN"
                                ? "bg-[#10B981] hover:bg-emerald-600"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {job.status === "CLOSED"
                              ? "Job Closed"
                              : job.status === "PAUSED"
                              ? "Job Paused"
                              : "Apply Now"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
