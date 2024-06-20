// LoginPage.js
import React, { useState } from 'react';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/auth/login', { email, password });
            console.log("****************************",response.data.token);

            localStorage.setItem('token', response.data.token);
            if (response.data.token) {
                navigate("/layout");
            } else {
                setFeedback("Error: Invalid Login Credentials");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            
            
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
                {console.log("*************")}
                {console.log(feedback)}
                {console.log("*************")}
                {feedback ? <div className=" font-bold bg-red-500 text-center">Test message</div> : <div></div>}
                
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required 
                            id="email-address"
                            name="email"
                            autoComplete="email"
                            className="relative block w-full px-3 
                            py-2 border border-gray-300 
                            placeholder-gray-500 text-gray-900 
                            rounded-md focus:outline-none focus:ring-indigo-500 
                            focus:border-indigo-500 focus:z-10 sm:text-sm" />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                            <input type="password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} required 
                             className="relative block w-full px-3 py-2 
                             border border-gray-300 placeholder-gray-500 
                             text-gray-900 rounded-md focus:outline-none 
                             focus:ring-indigo-500 focus:border-indigo-500 
                             focus:z-10 sm:text-sm"
                            />
                        </div>

                        <button type="submit" 
                        className="flex justify-center w-full 
                        px-4 py-2 text-sm font-medium 
                        text-white bg-indigo-600 border border-transparent 
                        rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-indigo-500" >
                            { loading ? "Authenticating ....": "Login"}
                            </button>
                    </div>

                </form>
            </div>

        </div>

    );
}

export default LoginPage;
