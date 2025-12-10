import { User, LogOut, Menu } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // SECURITY CHECK: Check for JWT token on component load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // !! converts string to boolean (true if token exists)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Destroy the token
    setIsLoggedIn(false);
    navigate("/"); // Redirect to Welcome Page
  };

  return (
    <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide flex items-center gap-2"
        >
          JobHunt
        </Link>
      </div>

      {/* Right Side: Dynamic Content based on Auth */}
      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="hover:text-secondary transition-colors font-medium"
            >
              Dashboard
            </Link>
            <div className="flex items-center gap-2 text-gray-300">
              <User size={20} />
              <span className="hidden sm:inline font-semibold">Profile</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-500/10 text-red-400 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-all text-sm border border-red-500/20"
            >
              Logout <LogOut size={16} />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-secondary text-white px-5 py-2 rounded-md font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-900/20"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
