import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";

const EcaForm = () => {

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const { user } = useContext(AuthContext);
    console.log(user.email);





    // this part for load data my login user mail
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

    console.log(userData[0]);
    const { _id, name, photoUrl, fatherName, gender, nid, passport, country, phone, email } = userData[0];


    // this part for update and insert new data for the user



    const onSubmit = (data) => {
        console.log(data);
    }





    return (
        <div className=" flex flex-col justify-center items-center ">
            {/* image part */}
            <div className="flex flex-col gap-3 items-center">
                <img className="w-40 h-44 mx-auto" src={photoUrl} alt="profilepic" />
                <h1 className="text-2xl font-bold">{name}</h1>
            </div>

            {/* input part */}
            <div className="card shrink-0 w-full max-w-4xl shadow-2xl bg-base-100">
                <form className="card-body gap-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* PSC education */}
                    <div>
                        <h1 className="text-base font-semibold text-red-500">Primary School Certificate (PSC)</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("pscGrade")} placeholder="Enter Grade/GPA" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("pscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Roll:</span>
                                </label>
                                <input type="number" name="name" {...register("pscRoll")} placeholder="Roll Number" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                        </div>
                    </div>


                    {/* SSC education */}
                    <div>
                        <h1 className="text-base font-semibold text-red-500">Secondary School Certificate (SSC)</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("sscGrade")} placeholder="Enter Grade/GPA" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("sscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Roll:</span>
                                </label>
                                <input type="number" name="name" {...register("sscRoll")} placeholder="Roll Number" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                        </div>
                    </div>


                    {/* JSC education */}
                    <div>
                        <h1 className="text-base font-semibold text-red-500">Junior School Certificate (JSC)</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("jscGrade")} placeholder="Enter Grade/GPA" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("jscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Roll:</span>
                                </label>
                                <input type="number" name="name" {...register("jscRoll")} placeholder="Roll Number" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                        </div>
                    </div>


                    {/* HSC education */}
                    <div >
                        <h1 className="text-base font-semibold text-red-500">Higher Secondary Certificate (HSC)</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("hscGrade")} placeholder="Enter Grade/GPA" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("hscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Roll:</span>
                                </label>
                                <input type="number" name="name" {...register("hscRoll")} placeholder="Roll Number" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                        </div>
                    </div>


                    {/* BSC education */}
                    <div>
                        <h1 className="text-base font-semibold text-red-500">Bachelor&apos;s degree</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("bscGrade")} placeholder="Enter CGPA" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("bscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Subject:</span>
                                </label>
                                <input type="text" name="name" {...register("bscSubject")} placeholder="Subject Name" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                        </div>
                    </div>



                    {/* submit button  */}
                    <div className="form-control mt-6">
                       <input type="submit" className="btn btn-primary" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EcaForm;