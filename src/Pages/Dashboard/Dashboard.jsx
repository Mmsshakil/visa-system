import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const Dashboard = () => {


    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();




    const { isPending, error, data: allusers = [], refetch } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allusers');
            return res.data;
        }
    })

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


    const onSubmitEca = async (data, user) => {
        console.log(user);
        console.log(data);

    }
    const onSubmitLmia = async (data) => {
        console.log(data);

    }
    const onSubmitVisa = async (data) => {
        console.log(data);

    }








    return (
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
                                {user.name}
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
    );
};

export default Dashboard;