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
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Mail</th>
                        <th>Status</th>

                        <th>ECA Approve</th>
                        <th>ECA Upload</th>
                        <th>ECA Submit</th>

                        <th>LMIA Approve</th>
                        <th>LMIA Upload</th>
                        <th>LMIA Submit</th>

                        <th>VISA Approve</th>
                        <th>VISA Upload</th>
                        <th>VISA Submit</th>

                    </tr>
                </thead>
                <tbody>

                    {

                        allusers.map((user, index) => <tr key={user._id}>
                            <td>
                                {index + 1}
                            </td>

                            <td>
                                {user.name}
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