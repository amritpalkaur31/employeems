import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Login from "./pages/Login";
import Features from "./pages/Features"; 
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoutes from './utils/PrivateRoutes';
import EmployeeDashboard from "./pages/EmployeeDashboard";
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dasboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/AddSalary';
import ViewSalary from './components/salary/ViewSalary';
import Summary from './components/EmployeeDashboard/Summary';
import LeaveList from './components/leave/LeaveList';
import AddLeave from './components/leave/AddLeave';
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/leave/Table';
import LeaveDetail from './components/leave/LeaveDetail';
import Attendance from './components/attendance/Attendance';
import AttendanceReport from './components/attendance/AttendanceReport';



function App() {

  return (
    <GoogleOAuthProvider clientId="379708666790-ic38t7encjm3gsi4uinpsajk3o0fgknt.apps.googleusercontent.com">

      <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage/>}> </Route>
      <Route path="/about" element={<About />}> </Route>
      <Route path="/features" element={<Features />}> </Route>
      <Route path="/login" element={<Login />}> </Route>
      <Route path="/admin-dashboard" element={
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin"]}>
          <AdminDashboard />
          </RoleBaseRoutes>
        </PrivateRoutes>

      }> 
      <Route index element= {<AdminSummary />}></Route>
      <Route path ="/admin-dashboard/departments"element= {<DepartmentList />}></Route>
      <Route path ="/admin-dashboard/add-department"element= {<AddDepartment />}></Route>
      <Route path ="/admin-dashboard/department/:id"element= {<EditDepartment />}></Route>

      <Route path ="/admin-dashboard/employees"element= {<List />}></Route>
      <Route path ="/admin-dashboard/add-employee"element= {<Add />}></Route>
      <Route path ="/admin-dashboard/employees/:id"element= {<View />}></Route>
      <Route path ="/admin-dashboard/employees/edit/:id"element= {<Edit />}></Route>

      <Route path ="/admin-dashboard/employees/salary/:id"element= {<ViewSalary />}></Route>
      <Route path ="/admin-dashboard/salary/add"element= {<AddSalary />}></Route>

      <Route path ="/admin-dashboard/leaves"element= {<Table />}></Route>
      <Route path ="/admin-dashboard/leaves/:id"element= {<LeaveDetail/>}></Route>
      <Route path ="/admin-dashboard/employees/leaves/:id"element= {<LeaveList/>}></Route>

      <Route path ="/admin-dashboard/setting"element= {<Setting />}></Route>
      <Route path ="/admin-dashboard/attendance"element= {<Attendance />}></Route>
      <Route path ="/admin-dashboard/attendance-report"element= {<AttendanceReport />}></Route>



      </Route>
      <Route path="/employee-dashboard" element={
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin", "employee"]}> 
            <EmployeeDashboard />
          </RoleBaseRoutes>
        </PrivateRoutes>}> 
        <Route index element= {<Summary />}></Route>

        <Route path ="/employee-dashboard/profile/:id"element= {<View/>}></Route>
        <Route path ="/employee-dashboard/leaves/:id"element= {<LeaveList/>}></Route>
        <Route path ="/employee-dashboard/add-leave"element= {<AddLeave/>}></Route>
        <Route path ="/employee-dashboard/salary/:id"element= {<ViewSalary />}></Route>
        <Route path ="/employee-dashboard/setting"element= {<Setting />}></Route>



      </Route>

      </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
  )
}

export default App
