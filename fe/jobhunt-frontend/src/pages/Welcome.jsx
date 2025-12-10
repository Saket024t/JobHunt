import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Briefcase, CheckCircle, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      {/* 1. HERO SECTION */}
      <div className="flex-grow flex items-center justify-center bg-surface px-6 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-6">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
              #1 Job Portal
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-primary leading-tight">
              Find Your <span className="text-secondary">Dream Job</span> <br/> 
              Without the Hassle.
            </h1>
            <p className="text-lg text-textMuted max-w-lg">
              Connecting top talent with top companies. Upload your resume, track applications, and get hired fast.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/signup" className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all shadow-lg">
                I am a Job Seeker <ArrowRight size={18} />
              </Link>
              <Link to="/signup" className="flex items-center gap-2 bg-white text-primary border border-gray-200 px-8 py-3 rounded-lg font-semibold hover:border-secondary hover:text-secondary transition-all">
                I am a Recruiter
              </Link>
            </div>
          </div>

          {/* Illustration / Image Placeholder */}
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-gray-100 shadow-2xl">
                {/* Abstract Visual representation of a Job Card */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-secondary">
                    <h3 className="font-bold text-primary">Senior Developer</h3>
                    <p className="text-sm text-gray-500">Google Inc. • Remote</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-blue-500">
                    <h3 className="font-bold text-primary">UI/UX Designer</h3>
                    <p className="text-sm text-gray-500">Amazon • New York</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                    <h3 className="font-bold text-primary">Product Manager</h3>
                    <p className="text-sm text-gray-500">Netflix • California</p>
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. FEATURES SHOWCASE */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-primary mb-4">Why Choose JobHunt?</h2>
                <p className="text-textMuted">We provide the tools you need to succeed in your career.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Feature 1 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
                        <Briefcase className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">Easy Applications</h3>
                    <p className="text-textMuted leading-relaxed">
                        Apply to multiple companies with a single click. Our smart system autofills your details so you save time.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="bg-green-50 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
                        <Users className="text-secondary" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">Direct Connection</h3>
                    <p className="text-textMuted leading-relaxed">
                        Talk directly to recruiters. No middleman. Get feedback on your applications instantly.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="bg-purple-50 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
                        <CheckCircle className="text-purple-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">Verified Jobs</h3>
                    <p className="text-textMuted leading-relaxed">
                        Every job posting is verified by our team. No scams, no fake listings. Only real opportunities.
                    </p>
                </div>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}