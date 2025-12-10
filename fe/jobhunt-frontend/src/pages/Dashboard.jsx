import Navbar from "../components/Navbar";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  PlusCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Jobs");
  const [jobs, setJobs] = useState([]);
  const [userRole, setUserRole] = useState("EMPLOYEE");

  // Fetch Jobs and User Role on Load
  useEffect(() => {
    // 1. Get Role
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role); // "RECRUITER" or "EMPLOYEE"
      } catch (e) {
        console.error("Token error", e);
      }
    }

    // 2. Fetch Jobs from Backend
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8082/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HERO SECTION */}
        <div className="bg-surface p-8 rounded-xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Welcome Back!
            </h2>
            <p className="text-textMuted">
              Here is what's happening in your network.
            </p>
          </div>

          {/* Show "Post Job" Button ONLY if Recruiter */}
          {userRole === "RECRUITER" && (
            <Link
              to="/post-job"
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg"
            >
              <PlusCircle size={20} /> Post a Job
            </Link>
          )}
        </div>

        {/* ... (Search Bar and Sidebar code remains the same as previous step) ... */}

        {/* Main Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Code (Keep your previous Sidebar code here) */}
          <div className="lg:col-span-1 h-fit">{/* ... Sidebar ... */}</div>

          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-surface rounded-t-xl shadow-sm border-b border-gray-200 flex mb-4">
              {/* ... Tabs Code ... */}
            </div>

            {/* JOB LIST */}
            <div className="space-y-6">
              {jobs.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  No jobs posted yet.
                </p>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-surface border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all relative overflow-hidden group"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:bg-secondary transition-colors"></div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-primary">
                          {job.title}
                        </h3>
                        <p className="text-sm font-medium text-textMuted">
                          {job.company}
                        </p>
                      </div>
                      <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                        {job.jobType}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 my-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={16} /> {job.salary}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex justify-end">
                      {/* Hide Apply button for Recruiters */}
                      {userRole !== "RECRUITER" && (
                        <button className="bg-secondary text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors">
                          Apply Now
                        </button>
                      )}
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
