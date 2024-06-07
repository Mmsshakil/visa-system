import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";



const SignUp = () => {


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { createUser } = useContext(AuthContext);

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your registration successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className="p-5 md:p-0">
            <div className="hero-content gap-5 md:gap-16 lg:gap-32 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-red-500">Registration now!</h1>
                    <p className="py-6">Immigration Refugees and Citizenship Canada (IRCC) Portal</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" name="email" {...register("email")} placeholder="Enter your email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>

                            <input type="password" name="password" {...register("password", {
                                minLength: 6,
                                maxLength: 25,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} placeholder="Enter your password" className="input input-bordered" required />

                            {errors.password?.type === 'minLength' && <span className="text-sm text-red-500">Password must be 6 characters</span>}

                            {errors.password?.type === 'maxLength' && <span className="text-sm text-red-500">Password must be less than 25 characters</span>}

                            {errors.password?.type === 'pattern' && <span className="text-sm text-red-500">Password must be one upper, lower case and number character</span>}

                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-outline btn-error" value="Registration" />
                        </div>
                    </form>
                    <p className="text-center pb-5">Already have an account? Please <Link className="text-red-600" to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;