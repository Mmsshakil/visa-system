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
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: '/userDetails/:id',
                element: <PrivateRoute><UserDetails></UserDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/userDetails/${params.id}`)
            },
            {
                path: '/searchPassport',
                element: <SearchPassport></SearchPassport>
            }
        ]
    },
]);