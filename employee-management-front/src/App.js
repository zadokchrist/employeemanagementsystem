import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import EmployeeListPage from './components/EmployeeListPage';
import EmployeeForm from './components/EmployeeForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './shared/Layout';


function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const setAuthToken = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage setToken={setAuthToken} />} />
                <Route path="/employees" element={token ? <EmployeeListPage token={token} /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/layout" element={token ? <Layout token={token} /> : <Navigate to="/login" />} />
                <Route path='/employeeform' element={ token ?<EmployeeForm  token={token}/>: <Navigate to="/login"/>}/>
            </Routes>
        </Router>
    );
}

export default App;
