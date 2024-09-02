import { useForm } from "react-hook-form";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";

const UserDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);


    const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


    const {
        register: registerEca,
        handleSubmit: handleSubmitEca,
        formState: { errors: errorsEca },
    } = useForm();

    const {
        register: registerLmia,
        handleSubmit: handleSubmitLmia,
        formState: { errors: errorsLmia },
    } = useForm();

    const {
        register: registerVisa,
        handleSubmit: handleSubmitVisa,
        formState: { errors: errorsVisa },
    } = useForm();



    const user = useLoaderData();
    const { _id, name, photoUrl, fatherName, motherName, gender, bloodGroup, maritalStatus, nid, passport, country, phone, email, birthDay, presentCountry, presentCity, presentAddre, permanentCountry, parmanentCity, parmanentAddre, companyName, jobExperience, jobTitle, userStatus, paymentMethod, trxID, lmiaPaymentMethod, lmiaTrxID, visaPaymentMethod, visaTrxID } = user;


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

    // control ECA------------------------------------------
    const onSubmitEca = async (data) => {
        console.log(data);


        const adminEcaPhoto = await uploadImageToCloudinary(data.adminEcaphoto[0]);
        console.log(adminEcaPhoto);


        // now upload all data in database
        const updateUserInfo = {
            adminEcaPhoto
            // userStatus: 'ecaComplete'
        }
        console.log(updateUserInfo);

        // send the data to the server
        fetch(`${import.meta.env.VITE_main_url}/updateEca/${_id}`, {
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
                        title: "ECA Complete",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "ECA Faild",
                        text: "Please check your information"
                    });
                }
            })
    };
    // -------------------------------------------------------
    // control LMIA------------------------------------------
    const onSubmitLmia = async (data) => {
        console.log(data);


        const adminLmiaPhoto = await uploadImageToCloudinary(data.adminLmiaphoto[0]);


        // now upload all data in database
        const updateUserInfo = {
            adminLmiaPhoto

        }
        // console.log(updateUserInfo);

        // send the data to the server
        fetch(`${import.meta.env.VITE_main_url}/updateLmia/${_id}`, {
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
                        title: "LMIA Complete",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "LMIA Faild",
                        text: "Please check your information"
                    });
                }
            })

    };


    // -------------------------------------------------------
    // control VISA------------------------------------------
    const onSubmitVisa = async (data) => {
        console.log(data);


        const adminVisaPhoto = await uploadImageToCloudinary(data.adminVisaphoto[0]);
        console.log(adminVisaPhoto);


        // now upload all data in database
        const updateUserInfo = {
            adminVisaPhoto,
            biometric: data.biometric

        }
        console.log(updateUserInfo);


        // send the data to the server
        fetch(`${import.meta.env.VITE_main_url}/updateVisa/${_id}`, {
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
                        title: "Visa Complete",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Visa Faild",
                        text: "Please check your information"
                    });
                }
            })




    };

    return (
        <div className="hero-content gap-10 md:gap-16 lg:gap-32 flex-col lg:flex-row mt-1 md:mt-5">
            <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 rounded-lg pt-6 ">
                <figure className="w-60 h-64 mx-auto"><img className="pt-10" src={photoUrl} alt="profilepic" /></figure>
                <div className="card-body gap-1">
                    <div>
                        <h2 className="text-center text-xl font-bold pb-3">{name} - <span className="text-blue-500">{userStatus}</span></h2>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <p><span className="font-semibold">Father&apos; Name:</span> {fatherName}</p>
                        <p><span className="font-semibold">Mother&apos; Name:</span> {motherName}</p>
                    </div>



                    <div className="flex flex-col md:flex-row">
                        <p><span className="font-semibold">Gender:</span> {gender}</p>
                        <p><span className="font-semibold">Country: </span>{country}</p>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <p><span className="font-semibold">Company: </span> {companyName}</p>
                        <p><span className="font-semibold">Job Title: </span>{jobTitle}</p>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <p><span className="font-semibold">Passport Number:</span> {passport}</p>
                        {
                            user?.passportUrl ?
                                <Link className="btn btn-error btn-sm" to={user?.passportUrl} target="_blank" download>Passport</Link>
                                :
                                <button className="btn btn-error btn-sm" disabled>Passport</button>
                        }

                    </div>

                    <div className="flex flex-col md:flex-row">
                        <p><span className="font-semibold">NID Number: </span>{nid}</p>
                        {
                            user?.nidUrl ?
                                <Link className="btn btn-error btn-sm" to={user?.nidUrl} target="_blank" download>NID</Link>
                                :
                                <button className="btn btn-error btn-sm" disabled>NID</button>
                        }

                    </div>


                    <div className="flex flex-col md:flex-row">
                        <p><span className="font-semibold">Email:</span> {email}</p>
                        <p><span className="font-semibold">Phone Number: </span>{phone}</p>
                    </div>

                </div>
            </div>

            {/* right side */}
            <div className="text-left">
                <div className=" w-full flex flex-col gap-3">

                    {/* ECA part */}
                    <form className="card-body w-full shadow-2xl bg-base-100" onSubmit={handleSubmitEca(onSubmitEca)} >

                        <label className="label">
                            <span className="font-bold text-lg text-blue-600">ECA details</span>
                        </label>
                        <h1><span className="font-semibold">Payment Method: </span>{paymentMethod}</h1>
                        <h1><span className="font-semibold">Trxid/Number:</span> {trxID}</h1>
                        <div>
                            <h1 className="font-bold">Upload ECA</h1>
                            <input type="file" className="file-input file-input-bordered w-full  text-slate-400 rounded-none" {...registerEca("adminEcaphoto", { required: true })} required />
                        </div>
                        <div className="form-control">
                            <button className="btn btn-primary">Submit ECA</button>
                        </div>
                    </form>


                    {/* ECA part */}
                    <form className="card-body w-full shadow-2xl bg-base-100" onSubmit={handleSubmitLmia(onSubmitLmia)}>

                        <label className="label">
                            <span className="font-bold text-lg text-blue-600">LMIA details</span>
                        </label>
                        <h1><span className="font-semibold">Payment Method: </span>{lmiaPaymentMethod}</h1>
                        <h1><span className="font-semibold">Trxid/Number:</span> {lmiaTrxID}</h1>
                        <div>
                            <h1 className="font-bold">Upload LMIA</h1>
                            <input type="file" className="file-input file-input-bordered w-full  text-slate-400 rounded-none" {...registerLmia("adminLmiaphoto", { required: true })} required />
                        </div>
                        <div className="form-control">
                            <button className="btn btn-primary">Submit LMIA</button>
                        </div>
                    </form>



                    {/* VISA part */}
                    <form className="card-body w-full shadow-2xl bg-base-100" onSubmit={handleSubmitVisa(onSubmitVisa)}>

                        <label className="label">
                            <span className="font-bold text-lg text-blue-600">VISA details</span>
                        </label>
                        <h1><span className="font-semibold">Payment Method: </span>{visaPaymentMethod}</h1>
                        <h1><span className="font-semibold">Trxid/Number:</span> {visaTrxID}</h1>
                        <div>
                            <h1 className="font-bold">Upload VISA</h1>
                            <input type="file" className="file-input file-input-bordered w-full  text-slate-400 rounded-none" {...registerVisa("adminVisaphoto", { required: true })} required />

                            <h1 className="font-bold">Biometric Date</h1>
                            {/* <input type="date" {...registerVisa("adminBiometricDate")} name="" placeholder="Biometric Date" className="input w-full lg:w-auto input-bordered rounded-none" required /> */}

                            <input type="date" {...registerVisa("biometric")} placeholder="Enter Biometric Date" className="input w-full lg:w-auto input-bordered rounded-none" required />
                        </div>
                        <div className="form-control">
                            <button className="btn btn-primary">Submit VISA</button>
                        </div>
                    </form>


                </div>

            </div>
        </div>
    );
};

export default UserDetails;