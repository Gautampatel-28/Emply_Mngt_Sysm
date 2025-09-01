import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login";
import AdminDashboard from "./assets/pages/AdminDashboard";
import AdminSummary from "./assets/components/dashboard/AdminSummary";
import EmployeeDashboard from "./assets/pages/EmployeeDashboard";
import PrivateRoutes from "./assets/utils/PrivateRoutes";
import RoleBaseRoutes from "./assets/utils/RoleBaseRoutes";
import DepartmentList from "./assets/components/departments/DepartmentList";
import AddDepartment from "./assets/components/departments/AddDepartment";
import EditDepartment from "./assets/components/departments/EditDepartment";
import List from "./assets/components/employee/List";
import Add from "./assets/components/employee/Add";
import View from "./assets/components/employee/View";
import Edit from "./assets/components/employee/Edit";
import Add_salary from "./assets/components/salary/Add_salary";
import View_salary from "./assets/components/salary/View_salary";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary />}></Route>
            <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
            <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
            <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />

            <Route path="/admin-dashboard/employees" element={<List />} />
            <Route path="/admin-dashboard/add-employee" element={<Add />} />
            <Route path="/admin-dashboard/employees/:id" element={<View />} />
            <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />} /> 
            <Route path="/admin-dashboard/employees/salary/:id" element={< View_salary/>} />

            <Route path="/admin-dashboard/salary/add" element={<Add_salary />} />
            

          </Route>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
