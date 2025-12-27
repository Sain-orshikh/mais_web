import { Navigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: authUser, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
