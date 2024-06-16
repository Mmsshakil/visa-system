import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { BsPatchCheckFill } from "react-icons/bs";

const Profile = () => {

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const { user } = useContext(AuthContext);
    console.log(user.email);




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
    console.log(userData[0]);

    const { _id, name, photoUrl, fatherName, gender, nid, passport, country, phone, email, userStatus, adminEcaPhoto, adminLmiaPhoto } = userData[0];
    console.log(userStatus);




    return (
        <div className="hero-content gap-10 md:gap-16 lg:gap-32 flex-col lg:flex-row mt-1 md:mt-5">
            <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 rounded-lg pt-6 ">
                <figure className="w-60 h-64 mx-auto"><img className="pt-10" src={photoUrl} alt="profilepic" /></figure>
                <div className="card-body gap-0">
                    <h2 className="text-center text-xl font-bold pb-3">{name}</h2>
                    <p><span className="font-semibold">Father&apos; Name:</span> {fatherName}</p>

                    <div className="flex flex-col md:flex-row">
                        <p><span className="font-semibold">Gender:</span> {gender}</p>
                        <p><span className="font-semibold">Country: </span>{country}</p>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <p><span className="font-semibold">Passport Number:</span> {passport}</p>
                        <p><span className="font-semibold">NID Number: </span>{nid}</p>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <p><span className="font-semibold">Email:</span> {email}</p>
                        <p><span className="font-semibold">Phone Number: </span>{phone}</p>
                    </div>


                    <div className="flex flex-col  gap-1">

                        {
                            userStatus === 'general' && <>
                                <div className="divider divider-error my-3"></div>
                                <p><span className="font-semibold">ECA Verification :</span> Unverified </p>
                                <p><span className="font-semibold">LMIA Verification :</span> Unverified </p>
                                <p><span className="font-semibold">Visa Verification :</span> Unverified </p>
                            </>
                        }

                        {
                            userStatus === 'ecaPending' && <>
                                <div className="divider divider-error my-3"></div>
                                <p><span className="font-semibold">ECA Verification :</span> Pending </p>
                                <p><span className="font-semibold">LMIA Verification :</span> Unverified </p>
                                <p><span className="font-semibold">Visa Verification :</span> Unverified </p>
                            </>
                        }

                        {
                            userStatus === 'ecaComplete' && <>
                                <div className="divider divider-error my-3"></div>
                                <div className="flex justify-between">
                                    <div className="flex gap-1 justify-center items-center ">
                                        <p className="font-semibold">ECA Verification : <span className="text-blue-600">Approved</span></p>
                                        <BsPatchCheckFill className="text-blue-600"></BsPatchCheckFill>
                                    </div>
                                    <Link className="btn btn-error btn-sm" to={adminEcaPhoto} target="_blank" download>Download</Link>
                                </div>
                                <p><span className="font-semibold">LMIA Verification :</span> Unverified </p>
                                <p><span className="font-semibold">Visa Verification :</span> Unverified </p>
                            </>
                        }


                        {
                            userStatus === 'lmiaPending' && <>
                                <div className="divider divider-error my-3"></div>
                                <div className="flex justify-between">
                                    <div className="flex gap-1 justify-center items-center ">
                                        <p className="font-semibold">ECA Verification : <span className="text-blue-600">Approved</span></p>
                                        <BsPatchCheckFill className="text-blue-600"></BsPatchCheckFill>
                                    </div>
                                    <Link className="btn btn-error btn-sm" to={adminEcaPhoto} target="_blank" download>Download</Link>
                                </div>
                                <p><span className="font-semibold">LMIA Verification :</span> Pending </p>
                                <p><span className="font-semibold">Visa Verification :</span> Unverified </p>
                            </>
                        }

                        {
                            userStatus === 'lmiaComplete' && <>
                                <div className="divider divider-error my-3"></div>
                                <div className="flex justify-between">
                                    <div className="flex gap-1 justify-center items-center ">
                                        <p className="font-semibold">ECA Verification : <span className="text-blue-600">Approved</span></p>
                                        <BsPatchCheckFill className="text-blue-600"></BsPatchCheckFill>
                                    </div>
                                    <Link className="btn btn-error btn-sm" to={adminEcaPhoto} target="_blank" download>Download</Link>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex gap-1 justify-center items-center ">
                                        <p className="font-semibold">LMIA Verification : <span className="text-blue-600">Approved</span></p>
                                        <BsPatchCheckFill className="text-blue-600"></BsPatchCheckFill>
                                    </div>
                                    <Link className="btn btn-error btn-sm" to={adminLmiaPhoto} target="_blank" download>Download</Link>
                                </div>
                                <p><span className="font-semibold">Visa Verification :</span> Unverified </p>
                            </>
                        }



                        {/* <div className="flex flex-col">
                            <p><span className="font-semibold">ECA Status:</span> </p>
                            <Link className="btn btn-error btn-sm" to={user?.adminEcaPhoto} target="_blank" download>Download</Link>
                        </div> */}
                    </div>

                </div>
            </div>

            {/* right side */}
            <div className="text-center lg:text-left">

                {
                    userStatus === 'general' &&
                    <>
                        <Link to='/ecaForm'>
                            <button className=" btn btn-lg btn-outline btn-error font-bold text-red-500">Apply For ECA</button>
                        </Link>
                        <p className="py-6">An <span className="font-bold">Educational Credential Assessment (ECA)</span> is used to verify that your foreign degree, diploma, or certificate (or other proof of your credential) is valid and equal to a Canadian one. There are different types of ECAs. You need to get an ECA <span className="font-bold">for immigration purposes</span>. For most people, the cost is about <span className="font-bold">CAN$200</span>. It takes 48 hours, or two working days, for verification. After that, you will receive the ECA certificate, and the ECA status will be approved. Your ECA report may help when you’re looking for a job in your field.</p>
                    </>
                }

                {
                    userStatus === 'ecaPending' &&
                    <>
                        <button className=" btn btn-lg btn-outline btn-error font-bold text-red-500" disabled>ECA Application Pending</button>
                        <h1 className="text-red-600 ">&apos;&apos;Please wait 48 hours for verification.&apos;&apos;</h1>
                        <p className="py-6">An <span className="font-bold">Educational Credential Assessment (ECA)</span> is used to verify that your foreign degree, diploma, or certificate (or other proof of your credential) is valid and equal to a Canadian one. There are different types of ECAs. You need to get an ECA <span className="font-bold">for immigration purposes</span>. For most people, the cost is about <span className="font-bold">CAN$200</span>. It takes <span className="font-bold">48 hours, or two working days</span>, for verification. After that, you will receive the ECA certificate, and the ECA status will be approved. Your ECA report may help when you’re looking for a job in your field.</p>
                    </>
                }

                {
                    userStatus === 'ecaComplete' &&
                    <>
                        <Link to='/lmiaform'>
                            <button className=" btn btn-lg btn-outline btn-error font-bold text-red-500">Apply For LMIA</button>
                        </Link>
                        <p className="py-6">A positive <span className="font-bold">Labour Market Impact Assessment (LMIA)</span> demonstrates that there is a need for a foreign worker to fill the job and that no Canadian worker or permanent resident is available to do it. A positive LMIA is sometimes called a confirmation letter. In the LMIA form, choose a company and job position where you want to join, then submit your CV and cover letter. The LMIA application fee is <span className="font-bold">CAN$350</span>, and the process takes a maximum of <span className="font-bold">72 hours</span>, or three working days. After verification, you will receive a job offer letter or LMIA. Then, you can apply for a work permit visa with all your documents. </p>
                    </>
                }

                {
                    userStatus === 'lmiaPending' &&
                    <>

                        <button className=" btn btn-lg btn-outline btn-error font-bold text-red-500 d" disabled>LMIA Application Pending</button>
                        <h1 className="text-red-600 ">&apos;&apos;Please wait 72 hours for verification.&apos;&apos;</h1>

                        <p className="py-6">A positive <span className="font-bold">Labour Market Impact Assessment (LMIA)</span> demonstrates that there is a need for a foreign worker to fill the job and that no Canadian worker or permanent resident is available to do it. A positive LMIA is sometimes called a confirmation letter. In the LMIA form, choose a company and job position where you want to join, then submit your CV and cover letter. The LMIA application fee is <span className="font-bold">CAN$350</span>, and the process takes a maximum of <span className="font-bold">72 hours</span>, or three working days. After verification, you will receive a job offer letter or LMIA. Then, you can apply for a work permit visa with all your documents. </p>
                    </>
                }

                {
                    userStatus === 'lmiaComplete' &&
                    <>
                        <Link to='/visaform'>
                            <button className=" btn btn-lg btn-outline btn-error font-bold text-red-500">Apply For Work Visa</button>
                        </Link>
                        <p className="py-6">A positive <span className="font-bold">Labour Market Impact Assessment (LMIA)</span> demonstrates that there is a need for a foreign worker to fill the job and that no Canadian worker or permanent resident is available to do it. A positive LMIA is sometimes called a confirmation letter. In the LMIA form, choose a company and job position where you want to join, then submit your CV and cover letter. The LMIA application fee is <span className="font-bold">CAN$350</span>, and the process takes a maximum of <span className="font-bold">72 hours</span>, or three working days. After verification, you will receive a job offer letter or LMIA. Then, you can apply for a work permit visa with all your documents. </p>
                    </>
                }


                {
                    userStatus === 'visaPending' &&
                    <>

                        <button className=" btn btn-lg btn-outline btn-error font-bold text-red-500 d" disabled>Visa Application Pending</button>
                        <h1 className="text-red-600 ">&apos;&apos;Please wait 6 weeks for verification.&apos;&apos;</h1>

                        <p className="py-6">A positive <span className="font-bold">Labour Market Impact Assessment (LMIA)</span> demonstrates that there is a need for a foreign worker to fill the job and that no Canadian worker or permanent resident is available to do it. A positive LMIA is sometimes called a confirmation letter. In the LMIA form, choose a company and job position where you want to join, then submit your CV and cover letter. The LMIA application fee is <span className="font-bold">CAN$350</span>, and the process takes a maximum of <span className="font-bold">72 hours</span>, or three working days. After verification, you will receive a job offer letter or LMIA. Then, you can apply for a work permit visa with all your documents. </p>
                    </>
                }




            </div>
        </div>
    );
};

export default Profile;