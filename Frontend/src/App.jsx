import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Switch } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Hdfc from "./views/admin/default/hdfc.jsx";
import Axis from "views/admin/default/axis.jsx";
import Icici from "views/admin/default/icici.jsx";
import Kotak from "views/admin/default/kotak.jsx";
import Reliance from "views/admin/default/reliance.jsx";

const App = () => {
  return (
    
    <Routes>
      <Route path="stocks/hdfc" element={<Hdfc />} />
      <Route path="stocks/axis" element={<Axis />} />
      <Route path="stocks/icici" element={<Icici />} />
      <Route path="stocks/kotak" element={<Kotak />} />
      <Route path="stocks/reliance" element={<Reliance />} />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>

  );
};

export default App;
