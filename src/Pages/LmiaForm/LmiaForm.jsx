import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import paypalicon from '../../assets/payments/PayPal.png'
import appleicon from '../../assets/payments/Apple.png'
import usdticon from '../../assets/payments/USDT.png'
import bkashicon from '../../assets/payments/Bkash.png'
import nagadicon from '../../assets/payments/Nagad.png'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LmiaForm = () => {
    const imagebb_key = import.meta.env.VITE_imagebb_key;
    const imagebb_api = `https://api.imgbb.com/1/upload?key=${imagebb_key}`;
    const navigate = useNavigate();

    const [selectedPayment, setSelectedPayment] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


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



    const onSubmit = async (data) => {
        console.log(data);

        // image uploaded in the imagebb site
        // cv image
        const cvImageFile = { image: data.cvPhoto[0] };
        const cvRes = await axiosPublic.post(imagebb_api, cvImageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(cvRes.data);


        // cover image
        const coverImageFile = { image: data.coverPhoto[0] };
        const coverRes = await axiosPublic.post(imagebb_api, coverImageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(coverRes.data);




        // now upload all data in database
        const updateUserInfo = {
            birthDay: data.birthDay,
            bloodGroup: data.bloodGroup,
            companyName: data.companyName,
            jobExperience: data.jobExperience,
            jobTitle: data.jobTitle,
            lmiaPaymentMethod: data.lmiaPaymentMethod,
            lmiaTrxID: data.lmiaTrxID,
            maritalStatus: data.maritalStatus,
            motherName: data.motherName,
            parmanentAddre: data.parmanentAddre,
            parmanentCity: data.parmanentCity,
            permanentCountry: data.permanentCountry,
            presentAddre: data.presentAddre,
            presentCity: data.presentCity,
            presentCountry: data.presentCountry,

            coverPhoto: coverRes.data.data.display_url,
            cvPhoto: cvRes.data.data.display_url,


            userStatus: 'lmiaPending'
        }
        console.log(updateUserInfo);

        if (loading) {
            return <span className="loading loading-spinner text-warning loading-lg"></span>;
        }

        // send the data to the server
        fetch(`http://localhost:5000/alllmiaUsers/${_id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUserInfo)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
            </div>

            {/* input part */}
            <div className="card shrink-0 w-full max-w-4xl shadow-2xl bg-base-100">
                <h1 className="text-center font-bold text-3xl text-red-500 pt-1 md:pt-5">LMIA Application Form</h1>
                <form className="card-body gap-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* name */}
                    <div className="">

                        {/* name */}
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Your Full Name </span>
                                </label>
                                <input type="" placeholder={name} className="input w-full font-bold lg:w-auto input-bordered rounded-none" disabled />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Passport Number</span>
                                </label>
                                <input type="" placeholder={passport} className="input w-full font-bold lg:w-auto input-bordered rounded-none" disabled />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Father Name</span>
                                </label>
                                <input type="" placeholder={fatherName} className="input w-full font-bold lg:w-auto input-bordered rounded-none" disabled />
                            </div>

                        </div>


                        {/* mother name ,birth, merital */}
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Mother Name <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                <input type="text" {...register("motherName")} placeholder="Enter your mother name" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>


                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Date of Birth <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                <input type="date" {...register("birthDay")} placeholder="Enter your mother name" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Marital Status <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                <select defaultValue="default" className="input input-bordered text-slate-400 rounded-none" {...register("maritalStatus", { required: true })}>
                                    <option disabled value="default">Select Marital Status</option>
                                    <option className="text-black" value="Married">Married</option>
                                    <option className="text-black" value="Unmarried">Unmarried</option>
                                    <option className="text-black" value="Divorced">Divorced</option>
                                </select>
                            </div>
                        </div>


                        {/* blood, job experi */}
                        <div className="flex flex-col md:flex-row gap-2">

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Blood Group <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                <select defaultValue="default" className="input input-bordered text-slate-400 rounded-none" {...register("bloodGroup", { required: true })}>
                                    <option disabled value="default">Select Blood Group</option>
                                    <option className="text-black" value="A+">A+</option>
                                    <option className="text-black" value="A-">A-</option>
                                    <option className="text-black" value="B+">B+</option>
                                    <option className="text-black" value="B-">B-</option>
                                    <option className="text-black" value="AB+">AB+</option>
                                    <option className="text-black" value="AB-">AB-</option>
                                    <option className="text-black" value="O+">O+</option>
                                    <option className="text-black" value="O-">O-</option>
                                </select>
                            </div>


                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Job Experience (Year) <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                <input type="number" {...register("jobExperience")} placeholder="Enter experience year" className="input w-full lg:w-auto input-bordered rounded-none" required />
                            </div>

                        </div>




                        {/* present */}
                        <div>
                            <h1 className="font-semibold pt-4 pb-2">Present Address Details <span className="text-lg text-red-600 font-bold">*</span></h1>
                            <div className="flex flex-col md:flex-row gap-2">

                                <div className="flex justify-center gap-1 items-center w-full">
                                    <label className="label">
                                        <span className="label-text font-medium">Country: </span>
                                    </label>
                                    <select defaultValue="default" className="input w-full input-bordered text-slate-400 rounded-none" {...register("presentCountry", { required: true })}>
                                        <option disabled value="default">Select your country</option>
                                        <option className="text-black" value="Afghanistan">Afghanistan</option>
                                        <option className="text-black" value="Albania">Albania</option>
                                        <option className="text-black" value="Argentina">Argentina</option>
                                        <option className="text-black" value="Australia">Australia</option>
                                        <option className="text-black" value="Azerbaijan">Azerbaijan</option>
                                        <option className="text-black" value="Bahamas">Bahamas</option>
                                        <option className="text-black" value="Bangladesh">Bangladesh</option>
                                        <option className="text-black" value="Bhutan">Bhutan</option>
                                        <option className="text-black" value="Bahrain">Bahrain</option>
                                        <option className="text-black" value="Brazil">Brazil</option>
                                        <option className="text-black" value="Burkina Faso">Burkina Faso</option>
                                        <option className="text-black" value="Cambodia">Cambodia</option>
                                        <option className="text-black" value="Canada">Canada</option>
                                        <option className="text-black" value="Colombia">Colombia</option>
                                        <option className="text-black" value="Cyprus">Cyprus</option>
                                        <option className="text-black" value="Denmark">Denmark</option>
                                        <option className="text-black" value="Egypt">Egypt</option>
                                        <option className="text-black" value="Ethiopia">Ethiopia</option>
                                        <option className="text-black" value="Finland">Finland</option>
                                        <option className="text-black" value="India">India</option>
                                        <option className="text-black" value="Kenya">Kenya</option>
                                        <option className="text-black" value="Lebanon">Lebanon</option>
                                        <option className="text-black" value="Malaysia">Malaysia</option>
                                        <option className="text-black" value="Maldives">Maldives</option>
                                        <option className="text-black" value="Nepal">Nepal</option>
                                        <option className="text-black" value="Thailand">Thailand</option>
                                        <option className="text-black" value="United Arab Emirates">United Arab Emirates</option>
                                        <option className="text-black" value="United Kingdom">United Kingdom</option>
                                        <option className="text-black" value="United States of America">United States of America</option>
                                        <option className="text-black" value="Zimbabwe">Zimbabwe</option>
                                    </select>
                                </div>


                                <div className="flex justify-center gap-1  w-full">
                                    <label className="label">
                                        <span className="label-text font-medium">City: </span>
                                    </label>
                                    <input type="text" {...register("presentCity")} placeholder="Enter present city" className="input w-full lg:w-auto input-bordered rounded-none" required />
                                </div>

                                <div className="flex justify-center gap-1  w-full">
                                    <label className="label">
                                        <span className="label-text font-medium">Address: </span>
                                    </label>
                                    <input type="text" {...register("presentAddre")} placeholder="Apartment,house,street" className="input w-full lg:w-auto input-bordered rounded-none" required />
                                </div>

                            </div>
                        </div>


                        {/* parmanet */}
                        <div>
                            <h1 className="font-semibold pt-4 pb-2">Permanent Address Details <span className="text-lg text-red-600 font-bold">*</span></h1>
                            <div className="flex flex-col md:flex-row gap-2">

                                <div className="flex justify-center gap-1 items-center w-full">
                                    <label className="label">
                                        <span className="label-text font-medium">Country: </span>
                                    </label>
                                    <select defaultValue="default" className="input w-full input-bordered text-slate-400 rounded-none" {...register("permanentCountry", { required: true })}>
                                        <option disabled value="default">Select your country</option>
                                        <option className="text-black" value="Afghanistan">Afghanistan</option>
                                        <option className="text-black" value="Albania">Albania</option>
                                        <option className="text-black" value="Argentina">Argentina</option>
                                        <option className="text-black" value="Australia">Australia</option>
                                        <option className="text-black" value="Azerbaijan">Azerbaijan</option>
                                        <option className="text-black" value="Bahamas">Bahamas</option>
                                        <option className="text-black" value="Bangladesh">Bangladesh</option>
                                        <option className="text-black" value="Bhutan">Bhutan</option>
                                        <option className="text-black" value="Bahrain">Bahrain</option>
                                        <option className="text-black" value="Brazil">Brazil</option>
                                        <option className="text-black" value="Burkina Faso">Burkina Faso</option>
                                        <option className="text-black" value="Cambodia">Cambodia</option>
                                        <option className="text-black" value="Canada">Canada</option>
                                        <option className="text-black" value="Colombia">Colombia</option>
                                        <option className="text-black" value="Cyprus">Cyprus</option>
                                        <option className="text-black" value="Denmark">Denmark</option>
                                        <option className="text-black" value="Egypt">Egypt</option>
                                        <option className="text-black" value="Ethiopia">Ethiopia</option>
                                        <option className="text-black" value="Finland">Finland</option>
                                        <option className="text-black" value="India">India</option>
                                        <option className="text-black" value="Kenya">Kenya</option>
                                        <option className="text-black" value="Lebanon">Lebanon</option>
                                        <option className="text-black" value="Malaysia">Malaysia</option>
                                        <option className="text-black" value="Maldives">Maldives</option>
                                        <option className="text-black" value="Nepal">Nepal</option>
                                        <option className="text-black" value="Thailand">Thailand</option>
                                        <option className="text-black" value="United Arab Emirates">United Arab Emirates</option>
                                        <option className="text-black" value="United Kingdom">United Kingdom</option>
                                        <option className="text-black" value="United States of America">United States of America</option>
                                        <option className="text-black" value="Zimbabwe">Zimbabwe</option>
                                    </select>
                                </div>


                                <div className="flex justify-center gap-1  w-full">
                                    <label className="label">
                                        <span className="label-text font-medium ">City: </span>
                                    </label>
                                    <input type="text" {...register("parmanentCity")} placeholder="Enter permanent city" className="input w-full lg:w-auto input-bordered rounded-none" required />
                                </div>

                                <div className="flex justify-center gap-1  w-full">
                                    <label className="label">
                                        <span className="label-text font-medium">Address: </span>
                                    </label>
                                    <input type="text" {...register("parmanentAddre")} placeholder="Apartment,house,street" className="input w-full lg:w-auto input-bordered rounded-none" required />
                                </div>

                            </div>
                        </div>

                    </div>










                    {/* company, position */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Company <span className="text-lg text-red-600 font-bold">*</span></span>
                            </label>
                            <select defaultValue="default" className="input input-bordered text-slate-400 rounded-none" {...register("companyName", { required: true })}>
                                <option disabled value="default">Company</option>
                                <option className="text-black" value="Bombardier Inc">Bombardier Inc</option>
                                <option className="text-black" value="Tim Hortons">Tim Hortons</option>
                                <option className="text-black" value="BCE Inc. (Bell Canada)">BCE Inc. (Bell Canada)</option>
                                <option className="text-black" value="Royal Bank of Canada">Royal Bank of Canada</option>
                                <option className="text-black" value="Shopify">Shopify</option>
                                <option className="text-black" value="Loblaw Companies Limited">Loblaw Companies Limited</option>
                            </select>
                        </div>


                        {/* jobs */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Position <span className="text-lg text-red-600 font-bold">*</span></span>
                            </label>
                            <select defaultValue="default" className="input input-bordered text-slate-400 rounded-none" {...register("jobTitle", { required: true })}>
                                <option disabled value="default">Select job</option>
                                <option className="text-black" value="Delivery Driver">Delivery Driver</option>
                                <option className="text-black" value="Warehouse Worker">Warehouse Worker</option>
                                <option className="text-black" value="Security Guard">Security Guard</option>
                                <option className="text-black" value="Shipping Clerk">Shipping Clerk</option>
                                <option className="text-black" value="Mailroom Clerk">Mailroom Clerk</option>
                                <option className="text-black" value="Forklift Operator">Forklift Operator</option>
                                <option className="text-black" value="Warehouse Worker">Warehouse Worker</option>
                                <option className="text-black" value="File Clerk">File Clerk</option>
                            </select>
                        </div>
                    </div>



                    {/* cv , cover  */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex flex-col w-full md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-base font-semibold">Upload Your CV <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                {/* <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required /> */}
                                <input type="file" className="file-input file-input-bordered w-full text-slate-400 rounded-none" {...register("cvPhoto", { required: true })} required />
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="text-base font-semibold">Upload Cover Letter <span className="text-lg text-red-600 font-bold">*</span></span>
                                </label>
                                {/* <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required /> */}
                                <input type="file" className="file-input file-input-bordered w-full  text-slate-400 rounded-none" {...register("coverPhoto", { required: true })} required />
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


                                <select defaultValue="default" className="input input-bordered text-slate-400" {...register("lmiaPaymentMethod", { required: true })} onChange={handlePaymentChange}>
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
                                        <input type="text" name="name" {...register("lmiaTrxID")} placeholder="Enter Apple Pay Phone Number" className="input w-full lg:w-auto input-bordered " required />
                                        :
                                        <input type="text" name="name" {...register("lmiaTrxID")} placeholder="Enter payment transaction ID" className="input w-full lg:w-auto input-bordered " required />
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

export default LmiaForm;