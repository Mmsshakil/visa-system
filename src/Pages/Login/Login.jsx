import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const { signIn } = useContext(AuthContext);
    // these lines for navigation after login
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    // console.log(location);



    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });

                // these lines for navigation after login
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message);
                Swal.fire({
                    icon: "error",
                    title: "Login Faild",
                    text: "Please check your mail and password"
                });
            })

    }

    return (
        <div className="p-5 md:p-0">
            <div className="hero-content gap-5 md:gap-16 lg:gap-32 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-red-500">Login now!</h1>
                    <p className="py-6">Immigration Refugees and Citizenship Canada (IRCC) Portal</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Enter your mail" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <div className=" relative flex w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password" placeholder="Enter your password" className="input input-bordered w-full" required />

                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-[15px] text-xl">
                                    {
                                        showPassword ? <BiHide /> : <BiShow />
                                    }
                                </span>

                            </div>


                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <input type="submit" className="btn btn-outline btn-error" value="Login" />
                        </div>
                    </form>
                    <p className="text-center pb-5">Do not have an account? Please <Link className="text-red-600" to='/signUp'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;