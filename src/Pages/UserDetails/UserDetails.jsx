import { useForm } from "react-hook-form";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";

const UserDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    // } = useForm();

    const {
        register: registerEca,
        handleSubmit: handleSubmitEca,
        formState: { errors: errorsEca },
    } = useForm();



    const user = useLoaderData();
    const { _id, name, photoUrl, fatherName, motherName, gender, bloodGroup, maritalStatus, nid, passport, country, phone, email, birthDay, presentCountry, presentCity, presentAddre, permanentCountry, parmanentCity, parmanentAddre, companyName, jobExperience, jobTitle, userStatus, paymentMethod, trxID, lmiaPaymentMethod, lmiaTrxID, visaPaymentMethod, visaTrxID } = user;


    // const onSubmit = (data) => {
    //     console.log(data);

    // }


    const onSubmitEca = async (data) => {
        console.log(data);
        // Add further processing logic here
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
                    <form className="card-body w-full shadow-2xl bg-base-100">

                        <label className="label">
                            <span className="font-bold text-lg text-blue-600">LMIA details</span>
                        </label>
                        <h1><span className="font-semibold">Payment Method: </span>{lmiaPaymentMethod}</h1>
                        <h1><span className="font-semibold">Trxid/Number:</span> {lmiaTrxID}</h1>
                        <div>
                            <h1 className="font-bold">Upload LMIA</h1>
                            <input type="file" className="file-input file-input-bordered w-full  text-slate-400 rounded-none" required />
                        </div>
                        <div className="form-control">
                            <button className="btn btn-primary">Submit LMIA</button>
                        </div>
                    </form>



                    {/* VISA part */}
                    <form className="card-body w-full shadow-2xl bg-base-100">

                        <label className="label">
                            <span className="font-bold text-lg text-blue-600">VISA details</span>
                        </label>
                        <h1><span className="font-semibold">Payment Method: </span>{visaPaymentMethod}</h1>
                        <h1><span className="font-semibold">Trxid/Number:</span> {visaTrxID}</h1>
                        <div>
                            <h1 className="font-bold">Upload VISA</h1>
                            <input type="file" className="file-input file-input-bordered w-full  text-slate-400 rounded-none" required />
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