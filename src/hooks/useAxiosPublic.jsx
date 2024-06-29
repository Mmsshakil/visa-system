import axios from "axios";



const axiosPublic = axios.create({
    baseURL: `${import.meta.env.VITE_main_url}`
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;