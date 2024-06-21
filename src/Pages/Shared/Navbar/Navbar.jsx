import { Link } from 'react-router-dom';
import flag from '../../../assets/flag.jpg'
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        console.log('logout done');
                        Swal.fire({
                            title: "Logout Success!",
                            icon: "success"
                        });
                    })
            }
        });



    }

    const navOptions = <>

        <li><Link to="/">Home</Link></li>
        <li> <Link to="/about">About</Link></li>
        <li> <Link to="/searchPassport">Search</Link></li>

        {user ?
            <>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/profile">Profile</Link></li>

            </>
            :

            <li><Link to="/signUp">Registration</Link></li>

        }
    </>


    return (
        <div className="navbar py-1 bg-base-100 mx-auto max-w-7xl font-semibold ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}

                    </ul>
                </div>
                {/* <a className="btn btn-ghost text-xl">daisy</a> */}
                <div className='flex gap-5'>
                    <Link to="/">
                        <img src={flag} alt="canada flag" className='w-12 md:w-20' />
                    </Link>
                    <Link to="/">
                        <h1 className='text-xs md:text-base'>Government <br />of Canada</h1>
                    </Link>

                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {user ?
                    <button onClick={handleLogout} className="btn btn-error">Logout</button>
                    :
                    <Link className="btn btn-outline btn-error" to="/login">Login</Link>
                }

            </div>
        </div>
    );
};

export default Navbar;