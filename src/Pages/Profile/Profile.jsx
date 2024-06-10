import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

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

    const { _id, name, photoUrl, fatherName, gender, nid, passport, country, phone, email } = userData[0];




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

                </div>
            </div>

            {/* right side */}
            <div className="text-center lg:text-left">
                <Link to='/ecaForm'>
                    <button className=" btn btn-lg btn-outline btn-error font-bold text-red-500">Apply For ECA</button>
                </Link>
                <p className="py-6">An <span className="font-bold">Educational credential assessment (ECA)</span> is used to verify that your foreign degree, diploma, or certificate (or other proof of your credential) is valid and equal to a Canadian one. There are different types of ECAs. You need to get an ECA <span className="font-bold">for immigration purposes</span>. For most people, the cost is about <span className="font-bold">CAN$200</span>. Your ECA report may help when you’re looking for a job in your field.</p>
            </div>
        </div>
    );
};

export default Profile;