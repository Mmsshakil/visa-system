
import { useForm } from "react-hook-form";
import canadaSearch from "../../assets/Banners/canadasearch.jpg"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SearchPassport = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const [passport, setPassport] = useState(null);



    const onSubmit = (data) => {
        console.log(data);
        setPassport(data.passportNumber);
        console.log(passport);

        axiosPublic.get(`/searchPassport/${passport}`)
            .then(response => {
                setUserData(response.data);
                setLoading(false);
            })

        console.log(passport);
        console.log(userData);
        // if (loading) {
        //     return <span className="loading loading-spinner text-warning loading-lg"></span>;
        // }


    }

    return (
        <div>
            <div className="hero min-h-20" style={{ backgroundImage: `url(${canadaSearch})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-2xl font-bold text-white">Search Passport Number</h1>
                        <p className="mb-5 text-white">Please search using your passport number to view your details and all associated documents.</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-0">
                            <input style={{ color: 'black', fontWeight: "bold" }} type="text" {...register("passportNumber")} placeholder="Enter Passport Number" className="input input-bordered w-full max-w-xs rounded-r-none" required />
                            <input className="btn btn-info font-semibold text-lg rounded-l-none" type="submit" value="Search" />
                        </form>
                    </div>
                </div>
            </div>
            {/* after */}

        </div>
    );
};

export default SearchPassport;