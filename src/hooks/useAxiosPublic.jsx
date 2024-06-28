import axios from "axios";



const axiosPublic = axios.create({
    baseURL: 'https://first.canadaworkvisa.info'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;