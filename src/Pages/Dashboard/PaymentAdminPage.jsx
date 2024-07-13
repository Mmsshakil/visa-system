import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

const PaymentAdminPage = () => {
    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic();


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const { isPending, error, data: paymetMethods = [], refetch } = useQuery({
        queryKey: ['paymetMethods'],
        queryFn: async () => {
            const res = await axiosSecure.get('/paymetMethods');
            return res.data;
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

    // console.log(paymetMethods?.[0]);



    const onSubmit = (data) => {
        console.log(data);

        fetch(`${import.meta.env.VITE_main_url}/paymentUpdate`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access-token')}` // Add authorization header if needed
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment update complete",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (data.upsertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "New payment info created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "info",
                        title: "No changes were made",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error('Error updating payment information:', error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "An error occurred while updating",
                    text: error.message,
                    showConfirmButton: true
                });
            });

    }


    return (
        <div className=" bg-base-100 w-full max-w-3xl shadow-2xl mx-auto">
            <div className="flex justify-center">
                <Link className="btn btn-primary" to={'/dashboard'}>Dashboard</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body font-bold">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text ">Bkash</span>
                    </label>
                    <input type="text" {...register("bkash")} defaultValue={paymetMethods?.[0].bkash} placeholder="Bkash Number" className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text ">Paypal</span>
                    </label>
                    <input type="text" {...register("paypal")} defaultValue={paymetMethods?.[0].paypal} placeholder="Paypal Mail" className="input input-bordered" required />
                </div>

                <div className="form-control gap-1">
                    <label className="label">
                        <span className="label-text ">Apple Pay</span>
                    </label>
                    <input type="text" {...register("applyNumber")} defaultValue={paymetMethods?.[0].applyNumber} placeholder="Apple Pay Number" className="input input-bordered" required />
                    <input type="text" {...register("appleMail")} defaultValue={paymetMethods?.[0].appleMail} placeholder="Apple Pay Mail" className="input input-bordered" required />
                </div>

                {/* <div className="form-control gap-1">
                    <label className="label">
                        <span className="label-text ">USDT</span>
                    </label>
                    <input type="email" placeholder="USDT img" className="input input-bordered" required />
                    <input type="text" placeholder="USDT address" className="input input-bordered" required />
                </div> */}

                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default PaymentAdminPage;