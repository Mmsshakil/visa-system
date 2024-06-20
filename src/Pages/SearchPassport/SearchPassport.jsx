
import { useForm } from "react-hook-form";
import canadaSearch from "../../assets/Banners/canadasearch.jpg"
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import approve from "../../assets/icons/approve.png"

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

    // const [passport, setPassport] = useState(null);



    const onSubmit = (data) => {

        axiosPublic.get(`/searchPassport/${data.passportNumber}`)
            .then(response => {
                if (!response.data || response.data.length === 0) {
                    console.log('Error: No data found');
                    setUserData(null);
                } else {
                    setUserData(response.data);
                    console.log('data found');

                }
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                // setPassport(null);
                setUserData(null);
                setLoading(false);
            })

        if (loading) {
            return <span className="loading loading-spinner text-warning loading-lg"></span>;
        }

        // console.log(passport);
        console.log(userData);



    }

    return (
        <div>
            <div className="hero min-h-72 mx-auto" style={{ backgroundImage: `url(${canadaSearch})` }}>
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

            {
                userData ? <>

                    <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 rounded-lg pt-2  mx-auto">
                        <div className="relative">
                            <figure className="w-52 h-56 mx-auto"><img className="pt-10" src={userData[0].photoUrl} alt="profilepic" /></figure>
                            <img className="w-28 absolute left-40 -bottom-10 lg:left-48 lg:-bottom-10" src={approve} alt="" />
                        </div>
                        <div className="card-body gap-1">


                            <table className="table text-center">
                                {/* head */}
                                <thead>

                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <td className="font-bold">Name</td>
                                        <td>{userData[0].name}</td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr>
                                        <td className="font-bold">Passport</td>
                                        <td>{userData[0].passport}</td>
                                    </tr>
                                    {/* row 3 */}
                                    <tr>
                                        <td className="font-bold">NID Number</td>
                                        <td>{userData[0].nid}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Job Title</td>
                                        <td>{userData[0]?.jobTitle}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Company</td>
                                        <td>{userData[0]?.companyName}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Father&apos;s Name</td>
                                        <td>{userData[0]?.fatherName}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Mother&apos;s Name</td>
                                        <td>{userData[0]?.motherName}</td>
                                    </tr>
                                </tbody>
                            </table>



                            

                        </div>
                    </div>





                </> : <>
                    <h1>data not available</h1>
                </>
            }

        </div>
    );
};

export default SearchPassport;