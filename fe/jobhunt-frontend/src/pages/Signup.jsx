import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    
    // State for form fields
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', role: 'EMPLOYEE'
    });

    // State for UI feedback
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error for this field when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.firstName.trim()) {
            tempErrors.firstName = "First name is required";
            isValid = false;
        }
        if (!formData.lastName.trim()) {
            tempErrors.lastName = "Last name is required";
            isValid = false;
        }
        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email format is invalid";
            isValid = false;
        }
        if (!formData.password) {
            tempErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        setSuccessMsg('');

        if (!validateForm()) return; // Stop if validation fails

        try {
            await axios.post('http://localhost:8081/auth/register', formData);
            setSuccessMsg("Registration Successful! Redirecting to login...");
            
            // Wait 2 seconds so user can read the message, then redirect
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            setApiError(error.response?.data?.message || "Registration Failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-background">
            <div className="w-full max-w-md bg-surface p-8 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create Account</h2>

                {/* API Feedback Messages */}
                {apiError && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">{apiError}</div>}
                {successMsg && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm border border-green-200">{successMsg}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                        <div className="w-1/2">
                            <input 
                                name="firstName" 
                                placeholder="First Name" 
                                onChange={handleChange} 
                                className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} 
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div className="w-1/2">
                            <input 
                                name="lastName" 
                                placeholder="Last Name" 
                                onChange={handleChange} 
                                className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} 
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="Email Address" 
                            onChange={handleChange} 
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={handleChange} 
                            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`} 
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">I want to...</label>
                        <select name="role" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded bg-white">
                            <option value="EMPLOYEE">Find a Job (Job Seeker)</option>
                            <option value="RECRUITER">Hire Talent (Recruiter)</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-slate-800 font-semibold transition-colors">
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-textMuted">
                    Already have an account? <a href="/login" className="text-secondary hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}