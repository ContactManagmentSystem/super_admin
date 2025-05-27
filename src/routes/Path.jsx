/* eslint-disable react/prop-types */
import { IconHome, IconLogin } from "@tabler/icons-react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import Cookies from "js-cookie";
import { Layout } from "../components/ui/Layout";
import UserManage from "../components/UserManage";

const isAuthenticated = () => {
  return !!Cookies.get("auth-spadmin-token");
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element }) => {
  return !isAuthenticated() ? element : <Navigate to="/dashboard" replace />;
};

const Path = () => {
  const privateRoutes = [
    {
      path: "/dashboard/user-manage",
      element: <UserManage />,
      icon: <IconHome />,
    },
  ];

  const publicRoutes = {
    path: "/login",
    element: <Login />,
    icon: <IconLogin />,
  };

  return (
    <Routes>
      {/* Redirect root to the appropriate route based on authentication status */}
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard/user-manage" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public Route - Only accessible if not authenticated */}
      <Route
        path={publicRoutes.path}
        element={<PublicRoute element={publicRoutes.element} />}
      />

      {/* Private Routes - Only accessible if authenticated */}
      {privateRoutes.map((rt) => (
        <Route
          key={rt.path}
          path={rt.path}
          element={
            <Layout>
              <ProtectedRoute element={rt.element} />
            </Layout>
          }
        />
      ))}

      {/* Fallback Route: Redirect any unknown route to the appropriate page */}
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default Path;
