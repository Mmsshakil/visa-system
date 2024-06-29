import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_main_url}`
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);

    // request interceptors to add authorizations header for every secure api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log('requestred stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // do something with request error
        return Promise.reject(error);
    })


    // intercept 401 and 403
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {

        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    })



    return axiosSecure;
};

export default useAxiosSecure;