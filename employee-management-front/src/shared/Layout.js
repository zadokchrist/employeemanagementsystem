import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeListPage from "../components/EmployeeListPage";
import { useLocation } from "react-router-dom";
import NewUser from "../components/NewUser";

function Layout() {
  const location = useLocation();
  const { state } = location;
  const screen = state?.screen || 'addemployees';

  const empid = state?.empid || 0;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="flex bg-gray-100">
            <div className="w-full shadow-lg p-8 bg-white space-y-6 rounded-lg ">
            {screen === 'viewemployees' && <EmployeeListPage />}
            {screen === 'addemployees' && <EmployeeForm employeeId={empid} />}
            {screen === 'newuser' && <NewUser />}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Layout;