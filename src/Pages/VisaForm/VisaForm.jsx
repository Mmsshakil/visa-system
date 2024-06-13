import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import paypalicon from '../../assets/payments/PayPal.png'
import appleicon from '../../assets/payments/Apple.png'
import usdticon from '../../assets/payments/USDT.png'
import bkashicon from '../../assets/payments/Bkash.png'
import nagadicon from '../../assets/payments/Nagad.png'

const VisaForm = () => {

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [selectedPayment, setSelectedPayment] = useState("");
    const imagebb_key = import.meta.env.VITE_imagebb_key;
    const imagebb_api = `https://api.imgbb.com/1/upload?key=${imagebb_key}`;

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
    const { _id, name, photoUrl, fatherName, motherName, gender, bloodGroup, maritalStatus, nid, passport, country, phone, email, birthDay, presentCountry, presentCity, presentAddre, permanentCountry, parmanentCity, parmanentAddre, companyName, jobExperience, jobTitle } = userData[0];


    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const onSubmit = async (data) => {
        console.log(data);

              // image uploaded in the imagebb site
        // cv image
        const ecaImageFile = { image: data.visaFormEca[0] };
        const ecaRes = await axiosPublic.post(imagebb_api, ecaImageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(ecaRes.data);


        // cover image
        const lmiaImageFile = { image: data.visaFormLmia[0] };
        const lmiaRes = await axiosPublic.post(imagebb_api, lmiaImageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(lmiaRes.data);



    }


    return (
        <div className=" flex flex-col justify-center items-center ">
            {/* image part */}
            <div className="flex flex-col gap-3 items-center mb-5">
                <img className="w-40 h-44 mx-auto" src={photoUrl} alt="profilepic" />
            </div>

            {/* input part */}
            <div className="card shrink-0 w-full max-w-4xl shadow-2xl bg-base-100">
                <h1 className="text-center font-bold text-3xl text-red-500 pt-1 md:pt-5">Work Visa Application Form</h1>
                <form className="card-body gap-5" onSubmit={handleSubmit(onSubmit)}>




                    {/* name */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Your Full Name </span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{name}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Fathers Name</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{fatherName}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Mothers Name</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{motherName}</h1>
                        </div>

                    </div>

                    {/* passport */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Passport Number</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{passport}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">NID Number</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{nid}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Date of Birth</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{birthDay}</h1>
                        </div>

                    </div>



                    {/* gender */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Gender</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{gender}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Blood Group</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{bloodGroup}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Marital Status</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{maritalStatus}</h1>
                        </div>

                    </div>

                    {/* email */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Email Address</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{email}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Phone Number</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{phone}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Country</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{country}</h1>
                        </div>

                    </div>

                    {/* Present address */}
                    <div className="">
                        <h1 className="text-base font-semibold pb-1">Present Address</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <h1 className="">Country:</h1>
                                <h1 className=" w-full font-bold lg:w-full bg-slate-100 py-3 pl-3 rounded-none">{presentCountry}</h1>
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <h1 className="">City:</h1>
                                <h1 className=" w-full font-bold lg:w-full bg-slate-100 py-3 pl-3 rounded-none">{presentCity}</h1>
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <h1 className="">Address:</h1>
                                <h1 className=" w-full font-bold lg:w-full bg-slate-100 py-3 pl-3 rounded-none">{presentAddre}</h1>
                            </div>

                        </div>
                    </div>


                    {/* parmanent address */}
                    <div className="">
                        <h1 className="text-base font-semibold pb-1">Parmanent Address</h1>
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="flex w-full items-center  gap-2 lg:gap-1">
                                <h1 className="">Country:</h1>
                                <h1 className=" w-full font-bold lg:w-full bg-slate-100 py-3 pl-3 rounded-none">{permanentCountry}</h1>
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <h1 className="">City:</h1>
                                <h1 className=" w-full font-bold lg:w-full bg-slate-100 py-3 pl-3 rounded-none">{parmanentCity}</h1>
                            </div>

                            <div className="flex w-full items-center  gap-2 md:gap-1">
                                <h1 className="">Address:</h1>
                                <h1 className=" w-full font-bold lg:w-full bg-slate-100 py-3 pl-3 rounded-none">{parmanentAddre}</h1>
                            </div>

                        </div>
                    </div>


                    {/* jobs */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Company Name</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{companyName}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Job Title</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{jobTitle}</h1>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Past Job Experience</span>
                            </label>
                            <h1 className=" w-full font-bold lg:w-auto bg-slate-100 py-3 pl-3 rounded-none">{jobExperience} year</h1>
                        </div>

                    </div>





                    {/* cv , cover  */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex flex-col w-full md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-base font-semibold">Upload ECA <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                {/* <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required /> */}
                                <input type="file" className="file-input file-input-bordered w-full text-slate-400 rounded-none" {...register("visaFormEca", { required: true })} required />
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-base font-semibold">Upload LMIA <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                {/* <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required /> */}
                                <input type="file" className="file-input file-input-bordered w-full  text-slate-400 rounded-none" {...register("visaFormLmia", { required: true })} required />
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


                                <select defaultValue="default" className="input input-bordered text-slate-400" {...register("visaPaymentMethod", { required: true })} onChange={handlePaymentChange}>
                                    <option disabled value="default">Select your payment method</option>
                                    <option className="text-black" value="Paypal">Paypal</option>
                                    <option className="text-black" value="USDT">USDT</option>
                                    <option className="text-black" value="ApplePay">Apple Pay</option>
                                    <option className="text-black" value="Bkash">Bkash</option>
                                    <option className="text-black" value="Nagad">Nagad</option>
                                </select>
                            </div>


                            <div className="form-control w-full">
                                <label className="label">
                                    {
                                        selectedPayment === 'ApplePay' ?
                                            <span className="label-text text-base font-semibold  text-red-500">Apple Pay Number: *</span>
                                            :
                                            <span className="label-text text-base font-semibold text-red-500">Transaction ID: *</span>
                                    }

                                </label>
                                {
                                    selectedPayment === 'ApplePay' ?
                                        <input type="text" name="name" {...register("visaTrxID")} placeholder="Enter Apple Pay Phone Number" className="input w-full lg:w-auto input-bordered " required />
                                        :
                                        <input type="text" name="name" {...register("visaTrxID")} placeholder="Enter payment transaction ID" className="input w-full lg:w-auto input-bordered " required />
                                }
                            </div>
                        </div>

                        {/* paypal */}
                        {
                            selectedPayment === "Paypal" && <div className="flex flex-col gap-0 items-center justify-center">
                                <div className="flex gap-0 items-center justify-center">
                                    <figure className="w-24"><img className="" src={paypalicon} alt="profilepic" /></figure>
                                    <h1 className="text-lg font-bold">- softhandshakil@yahoo.com</h1>
                                </div>

                                <div className="">
                                    <ol className="list-decimal">
                                        <li>Sent <span className="font-bold text-blue-700">$200</span> to the PayPal account address.</li>
                                        <li>Must be sent on <span className="font-bold text-blue-700">&apos;&apos;Friends and Family&apos;&apos;</span> option.</li>
                                        <li>Enter the <span className="font-bold text-blue-700">TrxID</span> and click the Apply button.</li>
                                    </ol>
                                </div>
                            </div>
                        }

                        {/* bkash */}
                        {
                            selectedPayment === "Bkash" && <div className="flex flex-col gap-0 items-center justify-center">
                                <div className="flex gap-0 items-center justify-center">
                                    <figure className="w-24"><img className="" src={bkashicon} alt="profilepic" /></figure>
                                    <h1 className="text-lg font-bold">: +8801712345678</h1>
                                </div>

                                <div className="">
                                    <ol className="list-decimal">
                                        <li>Sent <span className="font-bold text-blue-700">17100/= tk</span> to the BKash account number.</li>
                                        <li>This is a <span className="font-bold text-blue-700">&apos;&apos;Personal&apos;&apos;</span> account number.</li>
                                        <li>Enter the <span className="font-bold text-blue-700">TrxID</span> and click the Apply button.</li>
                                        <li className=" text-red-600">Don&apos;t Cashout or Merchant payment</li>
                                    </ol>
                                </div>
                            </div>
                        }

                        {/* nagad */}
                        {
                            selectedPayment === "Nagad" && <div className="flex flex-col gap-0 items-center justify-center">
                                <div className="flex gap-0 items-center justify-center">
                                    <figure className="w-24"><img className="" src={nagadicon} alt="profilepic" /></figure>
                                    <h1 className="text-lg font-bold">: +8801712345678</h1>
                                </div>

                                <div className="">
                                    <ol className="list-decimal">
                                        <li>Sent <span className="font-bold text-blue-700">17100/= tk</span> to the Nagad account number.</li>
                                        <li>This is a <span className="font-bold text-blue-700">&apos;&apos;Personal&apos;&apos;</span> account number.</li>
                                        <li>Enter the <span className="font-bold text-blue-700">TrxID</span> and click the Apply button.</li>
                                        <li className=" text-red-600">Don&apos;t Cashout or Merchant payment</li>
                                    </ol>
                                </div>
                            </div>
                        }

                        {/* apple */}
                        {
                            selectedPayment === "ApplePay" && <div className="flex flex-col gap-0 items-center justify-center mt-3">
                                <div className="flex gap-0 items-center justify-center">
                                    <figure className="w-20"><img className="" src={appleicon} alt="profilepic" /></figure>
                                    <div>
                                        <h1 className="text-lg font-bold">: +8801712345678</h1>
                                        <h1 className="text-lg font-bold">: softhandshakil@yahoo.com</h1>
                                    </div>
                                </div>


                                <div className="">
                                    <ol className="list-decimal">
                                        <li>Sent <span className="font-bold text-blue-700">$200</span> to the Apply Pay Number or Mail.</li>
                                        <li>Must be sent from <span className="font-bold text-blue-700">&apos;&apos;Apple Cash&apos;&apos;</span>.</li>
                                        <li>Enter your <span className="font-bold text-blue-700">Apple Pay Number</span> and click the Apply button.</li>
                                    </ol>
                                </div>
                            </div>
                        }
                    </div>




                    {/* submit button  */}
                    <div className="form-control mt-6">
                        <input type="submit" className="btn text-white btn-error" value="Apply for LMIA" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VisaForm;