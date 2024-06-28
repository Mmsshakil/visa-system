
import flag from '../../../assets/flag.jpg';
import { IoCallOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

const Footer = () => {
    return (

        <footer >
            <div className="footer p-10 bg-white text-black mt-5 justify-center items-center gap-5 md:gap-20">
                <aside>
                    <img src={flag} className='w-20'></img>
                    <p className='font-bold' >Immigration, Refugees and Citizenship Canada (IRCC)</p>
                    <p>325 Milner Ave 2nd Floor, Scarborough, ON M1B 5N1, Canada</p>
                    <div className='flex justify-center items-center gap-1 font-semibold'>
                        <IoCallOutline></IoCallOutline>
                        <p>Phone: +1 (843)396-7587</p>
                    </div>
                    <div className='flex justify-center items-center gap-1 font-semibold'>
                        <FaWhatsapp></FaWhatsapp>
                        <p>WhatsApp: +1 (501)229-0016</p>
                    </div>
                    <div className='flex justify-center items-center gap-1 font-semibold'>
                        <IoMailOutline></IoMailOutline>
                        <p>Email: canadaworkvisa0@gmail.com</p>
                    </div>
                </aside>
                <nav>

                    <div className='w-full'><iframe width="300" height="300" src="https://maps.google.com/maps?width=100%25&amp;height=350&amp;hl=en&amp;q=325%20Milner%20Ave,%20Scarborough,%20ON%20M1B%205N1,%20Canada+(Immigration,%20Refugees%20and%20Citizenship%20Canada%20(IRCC))&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps vehicle tracker</a></iframe></div>
                </nav>
            </div>
            <p className='footer-center py-4 bg-slate-300 text-xs md:text-base'>Copyright © 2024 - All right reserved by Government of Canada</p>
        </footer>
    );
};

export default Footer;