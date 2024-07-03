import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Jobs = () => {

    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);

    const { isPending, error, data: jobs = [], refetch } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/jobs');
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
    console.log(jobs);

    return (
        <div>
            <div className="max-w-3xl mx-auto my-7 md:my-10 px-3">
                <h1 className="font-bold text-2xl text-red-600 mb-3 text-center">Employment Details</h1>
                <div className="font-semibold text-left flex flex-col gap-2">
                    <h1>1. Below is the job position currently available.</h1>
                    <h1>2. The company will provide health insurance, travel tax, and a block sum of $5,310 CAD.</h1>
                    <h1>3. The company will cover your food and living expenses.</h1>
                    <h1>4. You are required to work 8 hours per day.</h1>
                    <h1>5. You will have either Saturday or Sunday off every week.</h1>
                    <h1>6. The salary will range from approximately $2700 to $3300 per month.</h1>
                    <h1>7. After the LMIA application is approved, the company will provide you with your joining date and necessary documents.</h1>
                    <h1>8. You can change your job after working for one year in your first job.</h1>
                </div>
            </div>

            <h1 className="font-bold text-2xl text-red-600 mb-3 text-center">Job Bank</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5 mx-auto">

                {
                    jobs?.map((job, index) => <div key={job._id} className="bg-base-100 shadow-xl">

                        <div className=" flex flex-col gap-2 p-5 font-medium">
                            <h1 className="font-bold text-lg text-red-600">Job - {index + 1}</h1>
                            <h1><span className="font-bold">Company Name:</span> {job?.company_name}</h1>
                            <h1><span className="font-bold">Job Title:</span> {job?.job_title}</h1>
                            <h1><span className="font-bold">Salary:</span> ${job?.salary_per_hour}/hr</h1>
                            <h1><span className="font-bold">Vacancy:</span> {job?.vacancy}</h1>
                            <h1><span className="font-bold">Location:</span> {job?.location}</h1>
                            <h1><span className="font-bold">Description:</span> {job?.description}</h1>
                        </div>


                    </div>)
                }


            </div>

        </div>
    );
};

export default Jobs;