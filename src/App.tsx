import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import { LoginPage } from "./pages/Login";
import { DashboardPage } from "./pages/Dashboard";
import { FinancePage } from "./pages/Finance";
import { SecurityPage } from "./pages/Secutiry";
import { UsersPage } from "./pages/Users/Users";
import { CompaniesPage } from "./pages/Companies/Companies";
import { CompanyDetailPage } from "./pages/Companies/CompanyDetail";
import { UserDetailPage } from "./pages/Users/UserDetail";
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/:id"
          element={
            <PrivateRoute>
              <UserDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/create"
          element={
            <PrivateRoute>
              <UserDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/empresas"
          element={
            <PrivateRoute>
              <CompaniesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/empresas/:id"
          element={
            <PrivateRoute>
              <CompanyDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/empresas/create"
          element={
            <PrivateRoute>
              <CompanyDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/empresas/create/user"
          element={
            <PrivateRoute>
              <UserDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/financeiro"
          element={
            <PrivateRoute>
              <FinancePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/seguranca"
          element={
            <PrivateRoute>
              <SecurityPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
