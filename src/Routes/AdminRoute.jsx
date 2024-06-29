import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";



const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();
    // console.log(location);

    if (loading || isAdminLoading) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/' state={{ from: location }} replace ></Navigate>;
};

export default AdminRoute;