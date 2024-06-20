// EmployeeListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

function EmployeeListPage() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/employees/${id}`);
            setEmployees(employees.filter(emp => emp.id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleEdit = async (id) => {
        try {
            
            await axios.delete(`/employees/${id}`);
            setEmployees(employees.filter(emp => emp.id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div>
            <h2>Employee List</h2>
            <button onClick={exportEmployees} className="flex justify-center
              px-4 py-2 text-sm font-medium 
             text-white bg-indigo-600 border 
             border-transparent rounded-lg shadow-sm 
             hover:bg-green-700 focus:outline-none 
             focus:ring-2 focus:ring-offset-2 
             focus:ring-indigo-500">Export to CSV</button>
            <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead>
                    <tr>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </td>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{emp.firstName} {emp.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{emp.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><button onClick={() => handleDelete(emp.id)} className=" justify-center
              px-4 py-2 text-sm font-small 
             text-white bg-indigo-600 border 
             border-transparent rounded-lg shadow-sm 
             hover:bg-red-700 focus:outline-none 
             focus:ring-2 focus:ring-offset-2 
             focus:ring-indigo-500">Delete</button>
             <button onClick={() => navigate("/layout", { state: { screen: "addemployees", empid : emp.id } })} className=" justify-center
              px-4 py-2 text-sm font-small 
             text-white bg-indigo-600 border 
             border-transparent rounded-lg shadow-sm 
             hover:bg-orange-700 focus:outline-none 
             focus:ring-2 focus:ring-offset-2 
             focus:ring-indigo-500">Edit</button>
                                {/* <button onClick={() => handleEdit(emp.id)} className=" justify-center
              px-4 py-2 text-sm font-small 
             text-white bg-indigo-600 border 
             border-transparent rounded-lg shadow-sm 
             hover:bg-orange-700 focus:outline-none 
             focus:ring-2 focus:ring-offset-2 
             focus:ring-indigo-500">Edit</button> */}
             </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const exportEmployees = async () => {
    try {
        const response = await axios.get('/employees/export', { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'employees.csv'); // or any other extension
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Error exporting employees:', error);
    }
};

export default EmployeeListPage;
