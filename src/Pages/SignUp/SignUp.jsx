import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { BiHide, BiShow } from "react-icons/bi";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const SignUp = () => {
    const imagebb_key = import.meta.env.VITE_imagebb_key;
    const imagebb_api = `https://api.imgbb.com/1/upload?key=${imagebb_key}`;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [imagge, setImagge] = useState("");

    // console.log(import.meta.env.VITE_main_url);

    const [showPassword, setShowPassword] = useState(false);
    // these lines for navigation after login
    const navigate = useNavigate();
    const location = useLocation();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    // console.log(location);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();



    const { isPending, error, data: countries = [], refetch } = useQuery({
        queryKey: ['countries'],
        queryFn: async () => {
            const res = await axiosSecure.get('/countries');
            // return res.data;
            return res.data.sort((a, b) => a.name.localeCompare(b.name));
        }
    })

    if (isPending) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-bars loading-lg text-error"></span>
        </div>
    }
    // console.log(countries);







    // const onSubmit = async (data) => {
    //     // console.log(data);


    //     // ----------- cloudinary---------------------------

    //     data.append("file", imagge)
    //     data.append("upload_preset", "lakiqxh0")
    //     data.append("cloud_name", "deri8mhfz")

    //     fetch("https://api.cloudinary.com/v1_1/deri8mhfz/image/upload", {
    //         method: "post",
    //         body: data
    //     })
    //         .then((res) => {
    //             res.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })




    //     // -------------------------------------------------



    //     // image uploaded in the imagebb site
    //     const imageFile = { image: data.profilePhoto[0] };
    //     const res = await axiosPublic.post(imagebb_api, imageFile, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    //     // console.log(res.data);
    //     // console.log(res.data.data.display_url);



    //     const userInfo = {
    //         name: data.name,
    //         fatherName: data.fatherName,
    //         gender: data.gender,
    //         country: data.country,
    //         email: data.email,
    //         phone: data.phone,
    //         passport: data.passport,
    //         nid: data.nid,
    //         password: data.password,
    //         confirmPassword: data.confirmPassword,
    //         photoUrl: res.data.data.display_url,
    //         userStatus: "general"
    //     }
    //     // console.log(userInfo);



    //     // if the image uploaded successfully then login process will happend
    //     if (res.data.success) {
    //         createUser(data.email, data.password)
    //             .then(result => {
    //                 const loggedUser = result.user;
    //                 // console.log(loggedUser);

    //                 updateUserProfile(data.name, res.data.data.display_url)
    //                     .then(() => {
    //                         // console.log('name also added');

    //                         axiosPublic.post('/users', userInfo)
    //                             .then(res => {
    //                                 if (res.data.insertedId) {
    //                                     // console.log('user added to the database');

    //                                     Swal.fire({
    //                                         position: "top-end",
    //                                         icon: "success",
    //                                         title: "Your registration successful",
    //                                         showConfirmButton: false,
    //                                         timer: 1500
    //                                     });
    //                                     navigate('/');
    //                                 }
    //                             })

    //                     })

    //             })


    //             .catch(error => {
    //                 // console.log(error.message);

    //                 Swal.fire({
    //                     icon: "error",
    //                     title: "Oops...",
    //                     text: "Already have an account! Please Login"
    //                 });
    //                 navigate(location?.state ? location.state : '/login');
    //             })
    //     }

    // }

    const onSubmit = async (formData) => {
        try {
            // Create a new FormData object
            const data = new FormData();
            console.log(data);
            console.log(formData);

            // Assuming 'profilePhoto' is the field name for the file input in your form
            const imageFile = formData.profilePhoto[0];

            // Append the image and other required data for Cloudinary
            data.append("file", imageFile);
            data.append("upload_preset", "lakiqxh0"); // Your upload preset
            data.append("cloud_name", "deri8mhfz"); // Your Cloudinary cloud name

            // Make the request to Cloudinary
            const response = await fetch("https://api.cloudinary.com/v1_1/deri8mhfz/image/upload", {
                method: "POST",
                body: data,
            });

            // Parse the JSON response
            const result = await response.json();

            if (response.ok) {
                console.log("Image uploaded successfully:", result);

                // Get the image URL from Cloudinary
                const imageUrl = result.secure_url;

                // Prepare the user data to send to your backend
                const userInfo = {
                    name: formData.name,
                    fatherName: formData.fatherName,
                    gender: formData.gender,
                    country: formData.country,
                    email: formData.email,
                    phone: formData.phone,
                    passport: formData.passport,
                    nid: formData.nid,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    photoUrl: imageUrl, // Use the Cloudinary image URL
                    userStatus: "general"
                };

                // Create the user and update profile
                await createUser(formData.email, formData.password);
                await updateUserProfile(formData.name, imageUrl);

                // Submit the `userInfo` to your backend
                const res = await axiosPublic.post('/users', userInfo);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your registration was successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/');
                }
            } else {
                throw new Error("Failed to upload image to Cloudinary");
            }

        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please try again."
            });
            navigate(location?.state ? location.state : '/login');
        }
    };

    return (
        <div className="p-5 md:p-0">
            <div className="hero-content gap-5 md:gap-8 lg:gap-32 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-red-500">Registration now!</h1>
                    <p className="py-6">Immigration Refugees and Citizenship Canada (IRCC) Portal</p>
                </div>
                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                        {/* name */}
                        <div className="flex flex-col md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Full Name</span>
                                </label>
                                <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Father&apos;s Name</span>
                                </label>
                                <input type="text" name="fatherName" {...register("fatherName")} placeholder="Enter father&apos;s name" className="input input-bordered" required />
                            </div>
                        </div>

                        {/* gender */}
                        <div className="flex flex-col md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Gender</span>
                                </label>


                                <select defaultValue="default" className="input input-bordered text-slate-400" {...register("gender", { required: true })}>
                                    <option disabled value="default">Select your gender</option>
                                    <option className="text-black" value="Male">Male</option>
                                    <option className="text-black" value="Female">Female</option>
                                </select>

                                {/* <input type="text" name="gender" {...register("gender")} placeholder="Select your gender" className="input input-bordered" required /> */}


                            </div>
                            <div className="form-control w-full md:w-56">
                                <label className="label">
                                    <span className="label-text font-semibold">Country</span>
                                </label>


                                <select defaultValue="default" className="input input-bordered text-slate-400" {...register("country", { required: true })}>
                                    <option disabled value="default">Select your country</option>

                                    {
                                        countries?.map((country) =>
                                            <option key={country?._id} className="text-black" value={country?.name}>{country?.name}</option>
                                        )
                                    }


                                </select>

                                {/* <input type="text" name="country" {...register("country")} placeholder="Select your country" className="input input-bordered" required /> */}
                            </div>
                        </div>

                        {/* passport */}
                        <div className="flex flex-col md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Passport Number</span>
                                </label>
                                <input type="text" name="passport" {...register("passport")} placeholder="Enter passport number" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">NID Number</span>
                                </label>
                                <input type="number" name="nid" {...register("nid")} placeholder="Enter NID number" className="input input-bordered" required />
                            </div>
                        </div>

                        {/* mail */}
                        <div className="flex flex-col md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email")} placeholder="Enter your email" className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Phone Number</span>
                                </label>
                                <input type="text" name="phone" {...register("phone")} placeholder="Enter phone number" className="input input-bordered" required />
                            </div>
                        </div>

                        {/* image */}
                        <div className="flex flex-col w-full md:flex-row gap-1">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Upload Photo</span>
                                </label>
                                {/* <input type="text" name="name" {...register("name")} placeholder="Enter your name" className="input input-bordered" required /> */}
                                <input type="file" className="file-input file-input-bordered w-full" {...register("profilePhoto", { required: true })} required />
                            </div>
                        </div>


                        {/* password */}
                        <div className="flex flex-col md:flex-row gap-1 w-full">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>

                                <div className=" relative flex w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password" {...register("password", {
                                            minLength: 4,
                                            maxLength: 25,
                                            // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                        })} placeholder="Enter your password" className="input input-bordered w-full" required />

                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-[15px] text-xl">
                                        {
                                            showPassword ? <BiHide /> : <BiShow />
                                        }
                                    </span>
                                </div>

                                {errors.password?.type === 'minLength' && <span className="text-sm text-red-500">Password must be 6 characters</span>}

                                {errors.password?.type === 'maxLength' && <span className="text-sm text-red-500">Password must be less than 25 characters</span>}

                                {/* {errors.password?.type === 'pattern' && <span className="text-sm text-red-500">Password must be one upper, lower case and number character</span>} */}

                            </div>

                            {/* confirm */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Confirm Password</span>
                                </label>

                                <div className=" relative flex w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword" {...register("confirmPassword", {
                                            minLength: 6,
                                            maxLength: 25,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            validate: value => value === getValues('password')
                                        },
                                        )} placeholder="Confirm password" className="input input-bordered w-full" required />

                                </div>

                                {errors.confirmPassword?.type === 'validate' && <span className="text-sm text-red-500">Password does not match</span>}

                            </div>

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
