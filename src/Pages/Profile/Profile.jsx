import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

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
        <div>
            <h1>this is profile page name: {name}</h1>
        </div>
    );
};

export default Profile;