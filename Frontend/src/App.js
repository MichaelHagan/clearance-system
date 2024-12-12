import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import StudentLogin from "./Pages/LoginForm";
import StudentClearanceCard from "./Pages/StudentClearanceCard";
import SignUp from "./Pages/SignUp";
import ApproveClearance from "./Pages/ApproveClearance";
import ManageUsers from "./Pages/ManageUsers";
import ManageDepartment from "./Pages/ManageDepartment";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/dashboard" element={<StudentClearanceCard />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="approve" element={<ApproveClearance />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-dept" element={<ManageDepartment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
