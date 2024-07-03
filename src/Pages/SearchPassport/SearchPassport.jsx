
import { useForm } from "react-hook-form";
import canadaSearch from "../../assets/Banners/canadasearch.jpg"
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import approve from "../../assets/icons/approve.png"
import pendingimg from "../../assets/icons/pending.png"
import generalImg from "../../assets/icons/generalImg.png"
import { Link } from "react-router-dom";

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
                    // console.log('Error: No data found');
                    setUserData(null);
                } else {
                    setUserData(response.data);
                    // console.log('data found');

                }
                setLoading(false);
            })
            .catch(error => {
                // console.log(error);
                // setPassport(null);
                setUserData(null);
                setLoading(false);
            })

        if (loading) {
            return <span className="loading loading-spinner text-warning loading-lg"></span>;
        }

        // console.log(passport);
        // console.log(userData);

        console.log(userData[0].userStatus);


    }

    return (
        <div>
            <div className="hero min-h-72 mx-auto" style={{ backgroundImage: `url(${canadaSearch})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-2xl font-bold text-white">Search Passport Number</h1>
                        <p className="mb-5 text-white">Search using your passport number to view your details and all associated documents.</p>
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

                            {
                                userData[0].userStatus === "general" &&
                                <img className="w-40 absolute left-28 md:left-44 lg:left-44 -bottom-14  lg:-bottom-14" src={generalImg} alt="" />
                            }

                            {
                                (userData[0].userStatus === "ecaComplete" || userData[0]?.userStatus === "lmiaComplete" || userData[0]?.userStatus === "visaComplete")
                                &&
                                <img className="w-28 absolute left-32 md:left-48 lg:left-52 -bottom-10  lg:-bottom-10" src={approve} alt="" />

                            }

                            {
                                (userData[0].userStatus === "ecaPending" || userData[0]?.userStatus === "lmiaPending" || userData[0]?.userStatus === "visaPending")
                                &&
                                <img className="w-32 absolute left-32 md:left-48 lg:left-48 -bottom-14  lg:-bottom-14" src={pendingimg} alt="" />
                            }

                            {/* <img className="w-28 absolute left-32 md:left-48 lg:left-52 -bottom-10  lg:-bottom-10" src={approve} alt="" /> */}




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
                                        {
                                            userData[0]?.jobTitle ? <>
                                                <td>{userData[0]?.jobTitle}</td>
                                            </> : <>
                                                <td>N/A</td>
                                            </>
                                        }

                                    </tr>
                                    <tr>
                                        <td className="font-bold">Company</td>
                                        {
                                            userData[0]?.companyName ? <>
                                                <td>{userData[0]?.companyName}</td>
                                            </> : <>
                                                <td>N/A</td>
                                            </>
                                        }
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Father&apos;s Name</td>
                                        <td>{userData[0]?.fatherName}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h1 className="text-center text-2xl font-bold my-4 text-red-600">Documents</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center mx-auto text-center font-semibold text-blue-600">

                        {
                            userData[0]?.adminEcaPhoto ? <>
                                <img className="border-2 border-black p-2" src={userData[0]?.adminEcaPhoto} alt="ECA Verification" />
                            </> : <>
                                <h1>1. Please Apply for ECA Certificate</h1>
                            </>
                        }

                        {
                            userData[0]?.cvPhoto ? <>
                                <img className="border-2 border-black p-2" src={userData[0]?.cvPhoto} alt="" />
                            </> : <>
                                <h1>2. Upload Your CV for Job Offer</h1>
                            </>
                        }

                        {
                            userData[0]?.adminLmiaPhoto ? <>
                                <img className="border-2 border-black p-2" src={userData[0]?.adminLmiaPhoto} alt="" />
                            </> : <>
                                <h1>3. Apply for Job Offer / LMIA</h1>
                            </>
                        }

                        {
                            userData[0]?.adminVisaPhoto ? <>
                                <img className="border-2 border-black p-2" src={userData[0]?.adminVisaPhoto} alt="" />
                            </> : <>
                                <h1>4. Finally Apply for Visa</h1>
                            </>
                        }

                    </div>


                </> : <>
                    {/* <Link className="text-red-600" to='/login'>Register</Link> */}
                </>
            }

        </div>
    );
};

export default SearchPassport;