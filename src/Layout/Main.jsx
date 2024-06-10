import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import image from "../assets/icons/whatsap.png"

const Main = () => {
    return (
        <>
            <div className="z-10">
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>

            <div className="relative">
                <div className="fixed bottom-10 lg:bottom-20 right-5 md:right-14 lg:right-44 z-50 " >

                    <a href="https://wa.me/+8801786829816?text=Hello How can I help you?" target="_blank">
                        <div className="flex gap-1 justify-center items-center">
                            <img src={image} className="w-6 lg:w-10" alt="aaaa" />
                            <h1 className="text-base lg:text-xl text-red-500 font-semibold">HelpLine</h1>
                        </div>
                    </a >
                </div >
            </div>


        </>


    );
};

export default Main;