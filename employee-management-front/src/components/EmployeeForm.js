import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeForm({ onEmployeeAdded, employeeId }) {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: ''
    });

    
    const navigate = useNavigate();

    useEffect(() => {
        if (employeeId != 0) {
            const fetchEmployee = async () => {
                try {
                    const response = await axios.get(`/employees/${employeeId}`);
                    setEmployee(response.data);
                } catch (error) {
                    console.error('Error fetching employee:', error);
                }
            };

            fetchEmployee();
        }
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (employeeId) {
                await axios.put(`/employees/${employeeId}`, employee);
            } else {
                await axios.post('/employees', employee);
            }
            //navigate('/layout',);
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <div className="flex justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">{employeeId ? 'Edit Employee' : 'Add Employee'}</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name:</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="firstName"
                                value={employee.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="lastName"
                                value={employee.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <div className="mt-1">
                            <input
                                type="email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone:</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="phone"
                                value={employee.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department:</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <button type="submit" className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {employeeId ? 'Update Employee' : 'Add Employee'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;
