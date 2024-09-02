import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Payment from "../../components/Payment";

const EcaForm = () => {

    const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

   
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState("");


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
    // console.log(user.email);





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

    // console.log(userData[0]);
    const { _id, name, photoUrl, fatherName, gender, nid, passport, country, phone, email } = userData[0];
    // console.log(_id);


    // this part for update and insert new data for the user


    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };


    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryUploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        // console.log(data);
        return data.secure_url;
    };



    const onSubmit = async (data) => {
        // console.log(data);




        const nidUrl = await uploadImageToCloudinary(data.nidPhoto[0]);
        const passportUrl = await uploadImageToCloudinary(data.passportPhoto[0]);
        const certificatUrl = data.certificatPhoto[0] ? await uploadImageToCloudinary(data.certificatPhoto[0]) : null;
        const ieltsUrl = await uploadImageToCloudinary(data.ieltsPhoto[0]);


        // now upload all data in database
        const updateUserInfo = {
            bscGrade: data.bscGrade,
            bscSubject: data.bscSubject,
            bscYear: data.bscYear,
            hscGrade: data.hscGrade,
            hscRoll: data.hscRoll,
            hscYear: data.hscYear,
            jscGrade: data.jscGrade,
            jscRoll: data.jscRoll,
            jscYear: data.jscYear,
            pscGrade: data.pscGrade,
            pscRoll: data.pscRoll,
            pscYear: data.pscYear,
            sscGrade: data.sscGrade,
            sscRoll: data.sscRoll,
            sscYear: data.sscYear,

            // nidUrl: nidRes.data.data.display_url,
            // passportUrl: passportRes.data.data.display_url,
            // certificatUrl: certificatRes.data.data.display_url,
            // ieltsUrl: ieltsRes.data.data.display_url,

            nidUrl,
            passportUrl,
            certificatUrl,
            ieltsUrl,

            paymentMethod: data.paymentMethod,
            trxID: data.trxID,

            userStatus: 'ecaPending'
        }
        // console.log(updateUserInfo);

        if (loading) {
            return <span className="loading loading-spinner text-warning loading-lg"></span>;
        }

        // send the data to the server
        fetch(`${import.meta.env.VITE_main_url}/allEcaUsers/${_id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUserInfo)

        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "ECA Application Success",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate(location?.state ? location.state : '/');
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "ECA Application Faild",
                        text: "Please check your information"
                    });
                }
            })

    }





    return (
        <div className=" flex flex-col justify-center items-center ">
            {/* image part */}
            <div className="flex flex-col gap-3 items-center mb-5">
                <img className="w-40 h-44 mx-auto" src={photoUrl} alt="profilepic" />
                <h1 className="text-xl font-bold">{name}</h1>
            </div>

            {/* input part */}
            <div className="card shrink-0 w-full max-w-4xl shadow-2xl bg-base-100">
                <h1 className="text-center font-bold text-3xl text-red-500 pt-1 md:pt-5">ECA Application Form</h1>
                <form className="card-body gap-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* PSC education */}
                    <div className="">
                        <h1 className="text-base font-semibold pb-1">Primary School Certificate (PSC)</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("pscGrade")} placeholder="Enter Grade/GPA" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("pscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Roll:</span>
                                </label>
                                <input type="number" name="name" {...register("pscRoll")} placeholder="Roll Number" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                        </div>
                    </div>


                    {/* SSC education */}
                    <div>
                        <h1 className="text-base font-semibold pb-1">Secondary School Certificate (SSC)</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("sscGrade")} placeholder="Enter Grade/GPA" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("sscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Roll:</span>
                                </label>
                                <input type="number" name="name" {...register("sscRoll")} placeholder="Roll Number" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                        </div>
                    </div>


                    {/* JSC education */}
                    <div>
                        <h1 className="text-base font-semibold pb-1">Junior School Certificate (JSC)</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("jscGrade")} placeholder="Enter Grade/GPA" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("jscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Roll:</span>
                                </label>
                                <input type="number" name="name" {...register("jscRoll")} placeholder="Roll Number" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                        </div>
                    </div>


                    {/* HSC education */}
                    <div >
                        <h1 className="text-base font-semibold pb-1">Higher Secondary Certificate (HSC)</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("hscGrade")} placeholder="Enter Grade/GPA" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("hscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Roll:</span>
                                </label>
                                <input type="number" name="name" {...register("hscRoll")} placeholder="Roll Number" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                        </div>
                    </div>


                    {/* BSC education */}
                    <div>
                        <h1 className="text-base font-semibold pb-1">Bachelor&apos;s degree</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Grade:</span>
                                </label>
                                <input type="text" name="name" {...register("bscGrade")} placeholder="Enter CGPA" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Year:</span>
                                </label>
                                <input type="number" name="name" {...register("bscYear")} placeholder="Passing Year" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <label className="label">
                                    <span className="label-text font-medium">Subject:</span>
                                </label>
                                <input type="text" name="name" {...register("bscSubject")} placeholder="Subject Name" className="input w-full lg:w-auto input-bordered rounded-none" />
                            </div>

                        </div>
                    </div>

                    {/* passport */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex flex-col w-full md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-base font-semibold ">Upload Passport Photo <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                {/* <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required /> */}
                                <input type="file" className="file-input file-input-bordered w-full text-slate-400 rounded-none" {...register("passportPhoto", { required: true })} required />
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-base font-semibold ">Upload NID Photo <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                {/* <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required /> */}
                                <input type="file" className="file-input file-input-bordered w-full  text-slate-400 rounded-none" {...register("nidPhoto", { required: true })} required />
                            </div>
                        </div>
                    </div>


                    {/* passport */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex flex-col w-full md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-base font-semibold ">Upload Any Education Certificate </span>
                                </label>
                                {/* <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required /> */}
                                <input type="file" className="file-input file-input-bordered w-full text-slate-400 rounded-none" {...register("certificatPhoto")} />
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-base font-semibold ">Upload Your Photo <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                {/* <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required /> */}
                                <input type="file" className="file-input file-input-bordered w-full  text-slate-400 rounded-none" {...register("ieltsPhoto", { required: true })} required />
                            </div>
                        </div>
                    </div>


                    {/* payment informations */}
                    <div>
                        <div className="flex justify-center flex-col md:flex-row items-center gap-1 md:gap-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-base font-semibold text-red-500">Payment Methods *</span>
                                </label>


                                <select defaultValue="default" className="input input-bordered text-slate-400" {...register("paymentMethod", { required: true })} onChange={handlePaymentChange}>
                                    <option disabled value="default">Select your payment method</option>
                                    <option className="text-black" value="Paypal">Paypal</option>
                                    <option className="text-black" value="USDT">USDT</option>
                                    <option className="text-black" value="ApplePay">Apple Pay</option>
                                    <option className="text-black" value="Bkash">Bkash</option>
                                    {/* <option className="text-black" value="Nagad">Nagad</option> */}
                                </select>
                            </div>


                            <div className="form-control w-full">
                                <label className="label">
                                    {
                                        selectedPayment === 'ApplePay' ?
                                            <span className="label-text text-base font-semibold text-red-500">Apple Pay Number: *</span>
                                            :
                                            <span className="label-text text-base font-semibold text-red-500">Transaction ID: *</span>
                                    }

                                </label>
                                {
                                    selectedPayment === 'ApplePay' ?
                                        <input type="text" name="name" {...register("trxID")} placeholder="Enter Apple Pay Phone Number" className="input w-full lg:w-auto input-bordered " required />
                                        :
                                        <input type="text" name="name" {...register("trxID")} placeholder="Enter payment transaction ID" className="input w-full lg:w-auto input-bordered " required />
                                }
                            </div>
                        </div>


                        <Payment
                            selectedPayment={selectedPayment}
                            bkashAmount={"17100"}
                            othersAmount={"200"}
                        ></Payment>


                    </div>




                    {/* submit button  */}
                    <div className="form-control mt-6">
                        <input type="submit" className="btn text-white btn-error" value="Apply for ECA" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EcaForm;