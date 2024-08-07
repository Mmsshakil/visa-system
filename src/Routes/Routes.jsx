import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Jobs from "../Pages/Jobs/Jobs";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Profile/Profile";
import EcaForm from "../Pages/EcaForm/EcaForm";
import LmiaForm from "../Pages/LmiaForm/LmiaForm";
import VisaForm from "../Pages/VisaForm/VisaForm";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UserDetails from "../Pages/UserDetails/UserDetails";
import SearchPassport from "../Pages/SearchPassport/SearchPassport";
import About from "../Pages/About/About";
import AdminRoute from "./AdminRoute";
import PaymentAdminPage from "../Pages/Dashboard/PaymentAdminPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/jobs',
                element: <PrivateRoute><Jobs></Jobs></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/ecaForm',
                element: <PrivateRoute><EcaForm></EcaForm></PrivateRoute>
            },
            {
                path: '/lmiaForm',
                element: <PrivateRoute><LmiaForm></LmiaForm></PrivateRoute>
            },
            {
                path: '/visaform',
                element: <PrivateRoute><VisaForm></VisaForm></PrivateRoute>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><AdminRoute><Dashboard></Dashboard></AdminRoute></PrivateRoute>
            },
            {
                path: '/userDetails/:id',
                element: <PrivateRoute><AdminRoute><UserDetails></UserDetails></AdminRoute></PrivateRoute>,
                // loader: ({ params }) => fetch(`https://first.canadaworkvisa.info/userDetails/${params.id}`)
                loader: ({ params }) => fetch(`${import.meta.env.VITE_main_url}/userDetails/${params.id}`)
            },
            {
                path: '/searchPassport',
                element: <SearchPassport></SearchPassport>
            },
            {
                path: '/paymentAdminPage',
                element: <PrivateRoute><AdminRoute><PaymentAdminPage></PaymentAdminPage></AdminRoute></PrivateRoute>
                // element: <PaymentAdminPage></PaymentAdminPage>
            }
        ]
    },
]);