import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Dashboard = () => {


    const axiosSecure = useAxiosSecure();
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

                        <th>ECA Approve</th>

                        <th>LMIA Approve</th>

                        <th>VISA Approve</th>

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


                            <td>
                                <form className="flex flex-col gap-1" action="">
                                    <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs" />

                                    <button className="btn btn-info">ECA Approve</button>
                                </form>

                            </td>


                            {/* LMIA */}

                            <td>
                                <form className="flex flex-col gap-1" action="">
                                    <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs" />

                                    <button className="btn btn-success">LMIA Approve</button>
                                </form>

                            </td>

                            {/* VISA */}

                            <td>
                                <form className="flex flex-col gap-1" action="">
                                    <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs" />

                                    <button className="btn btn-warning">Visa Approve</button>
                                </form>

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