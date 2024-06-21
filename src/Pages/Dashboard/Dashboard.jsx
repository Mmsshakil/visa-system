import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {


    const axiosSecure = useAxiosSecure();

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user.email);

    const { isPending, error, data: allusers = [], refetch } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allusers');
            return res.data;
        }
    })



    useEffect(() => {
        // Fetch user data
        axiosPublic.get(`/allusers/${user.email}`)
            .then(response => {
                setUserData(response.data);
                setLoading(false);
            })

    }, []);

    if (loading) {
        return <span className="loading loading-spinner text-warning loading-lg"></span>;
    }
    // const {  } = userData;
    console.log(userData[0].role);
    if (userData[0]?.role !== 'admin') {
        return <span className="loading loading-spinner text-warning loading-lg"></span>;
    }


    if (isPending) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>
    }


    return (
        <>

            {
                userData[0]?.role === "admin" ? <>
                    <div className="overflow-x-auto">
                        <table className="table table-pin-rows table-pin-cols">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Mail</th>
                                    <th>Status</th>

                                    <th>ECA Details</th>

                                    <th>LMIA Details</th>

                                    <th>VISA Details</th>

                                </tr>
                            </thead>
                            <tbody>

                                {

                                    allusers.map((user, index) => <tr className="text-sm" key={user._id}>
                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>

                                            <Link to={`/userDetails/${user?._id}`}>
                                                <button className="btn btn-outline btn-info">{user.name}</button>
                                            </Link>
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td className="font-semibold text-red-500">
                                            {user?.userStatus}
                                        </td>

                                        {/* ECA */}


                                        <td className="">
                                            <p>{user?.paymentMethod}</p>
                                            <p>{user?.trxID}</p>
                                        </td>


                                        {/* LMIA */}

                                        <td className="">
                                            <p>{user?.lmiaPaymentMethod}</p>
                                            <p>{user?.lmiaTrxID}</p>
                                        </td>

                                        {/* VISA */}

                                        <td className="">
                                            <p>{user?.visaPaymentMethod}</p>
                                            <p>{user?.visaTrxID}</p>
                                        </td>


                                    </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </> : <>
                    <h1 className="text-center text-6xl font-bold text-red-600">Invalid User</h1>

                </>
            }

        </>


    );
};

export default Dashboard;