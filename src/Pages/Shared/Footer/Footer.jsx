
import flag from '../../../assets/flag.jpg'
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (

        <footer >
            <div className="footer p-10 bg-white text-black">
                <aside>
                    <img src={flag} className='w-20'></img>
                    <p className='font-bold' >Immigration, Refugees and Citizenship Canada (IRCC)</p>
                    <p>Consulate General of Bangladesh</p>
                    <p>Atria- II, 2235 Sheppard Ave E Suite# 1505, Toronto, ON M2J 5B5, Canada</p>
                </aside>
                <nav>
                    <h6 className="text-2xl font-semibold">Contact</h6>
                    <div className="grid grid-flow-col gap-4">
                        <div className='flex gap-1 justify-center items-center '>
                            <FaWhatsapp className='text-2xl text-green-600'></FaWhatsapp>
                            <p className='font-bold'>+12345786487, +12345786487</p>
                        </div>
                    </div>
                    <div className="grid grid-flow-col gap-4">
                        <div className='flex gap-1 justify-center items-center '>
                            <p className='text-xl font-bold'>imo</p>
                            <p className='font-bold'>+12345786487, +12345786487</p>
                        </div>
                    </div>
                </nav>
            </div>
            <p className='footer-center p-4 bg-slate-300 text-base-content'>Copyright © 2024 - All right reserved by Government of Canada</p>
        </footer>
    );
};

export default Footer;