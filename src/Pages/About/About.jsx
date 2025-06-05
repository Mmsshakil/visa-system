import { BsPatchCheckFill } from "react-icons/bs";

const About = () => {
    return (
        <div className="max-w-3xl mx-auto my-7 md:my-10 px-3">
            <div className="">
                <h1 className="font-bold text-lg md:text-2xl text-red-600 mb-3 text-center md:text-left">Why Workers Should Move to Canada?</h1>
                <p className="font-semibold text-center md:text-left">
                    Workers may need to go to Canada for various reasons, including the short visa processing time, better employment opportunities, and higher salaries. Canada is known for its efficient immigration process, enabling workers to start their new jobs quickly. The country boasts a strong economy with a diverse job market, offering numerous opportunities across various sectors. High salaries and competitive benefits make Canada an attractive destination for skilled workers. Additionally, Canada provides a welcoming and multicultural environment, allowing workers to integrate into a diverse society while enjoying benefits such as quality healthcare, education, and social services. Moving to Canada can offer long-term career growth, stability, and an improved quality of life for themselves and their families.
                </p>
            </div>

            <div className="px-10 md:px-5">
                <h1 className="font-bold text-2xl text-red-600 mb-3 mt-10">Visa application process</h1>
                <div>
                    <h1 className="text-lg font-semibold text-black">Basic Registration</h1>
                    <ol className="list-decimal">
                        <li>Enter your basic information.</li>
                        <li>For contact, enter your email and phone number.</li>
                        <li>Upload your photo.</li>
                        <li>Set a strong password.</li>
                        <li>Click the registration button.</li>
                    </ol>
                </div>


                <div className="my-5">
                    <h1 className="text-lg font-semibold text-black">ECA Application</h1>
                    <ol className="list-decimal">
                        <li>Enter your all education result details.</li>
                        <li>If you don&apos;t have any education details, you can skip this enter field.</li>
                        <li>You must upload your passport and national ID photo.</li>
                        <li>If you have them, please upload your latest education and IELTS certificate.</li>
                        <li>Select a payment method, pay <span className="text-red-600 font-bold">$200</span>, and enter the transaction ID.</li>
                        <li>Finally, click the Apply button.</li>
                        <li>Please wait 48 hours or two days for approval.</li>
                    </ol>
                </div>

                <div className="my-5">
                    <h1 className="text-lg font-semibold text-black">LMIA / Job Application</h1>
                    <ol className="list-decimal">
                        <li>Enter all your personal information.</li>
                        <li>Carefully select your company and job position.</li>
                        <li>You must upload photo of your CV and cover letter.</li>
                        <li>If you have them, please upload your latest education and IELTS certificate.</li>
                        <li>Select a payment method, pay <span className="text-red-600 font-bold">$350</span>, and enter the transaction ID.</li>
                        <li>Finally, click the Apply button.</li>
                        <li>Please wait 72 hours or three days for approval.</li>
                    </ol>
                </div>

                <div className="my-5">
                    <h1 className="text-lg font-semibold text-black">Visa Application</h1>
                    <ol className="list-decimal">
                        <li>Carefully check all your information.</li>
                        <li>If you have any incorrect information or mistakes, please contact your agent.</li>
                        <li>If everything is okay, then upload a photo of your ECA and LMIA confirmation.</li>
                        <li>If you have them, please upload your latest education and IELTS certificate.</li>
                        <li>Select a payment method, pay <span className="text-red-600 font-bold">$949</span>, and enter the transaction ID.</li>
                        <li>Click the Apply button.</li>
                        <li>After verifying all documents, you will receive the biometric submission date and visa confirmation letter.</li>
                        <li>This visa application process takes a maximum of 5-10 weeks.</li>
                    </ol>
                </div>

                <div className="my-5">
                    <h1 className="text-lg font-semibold text-black">Biometric Submission</h1>
                    <ol className="list-decimal">
                        <li>Bring all your original documents to the biometric submission office.</li>
                        <li>Here, you need to submit an iris scan, face scan, and fingerprint.</li>
                        <li>Please attend the visa office on the specified date.</li>
                        <li>Please bring four passport-sized photos of yourself.</li>
                        <li>You need to wait one to two weeks for the confirmation email and passport collection date.</li>
                        <li>After biometric verification, you will receive your medical test date, and on this date, you need to submit your passport also for the visa.</li>
                    </ol>
                </div>

                <div className="my-5">
                    <h1 className="text-lg font-semibold text-black">Medical Test</h1>
                    <ol className="list-decimal">
                        <li>Ensure you have authentic identification documents: Passport, National Identification Document.</li>
                        <li>Bring eyeglasses if you use them.</li>
                        <li>Gather any previous medical reports.</li>
                        <li>Prepare to answer a detailed medical history questionnaire.</li>
                        <li>Undergo checks for weight, height, hearing, vision, blood pressure, pulse, heartbeat, lungs, abdomen, limbs, and skin.</li>
                        <li>After passing the medical test, the embassy will provide a passport collection date along with your work permit visa.</li>
                    </ol>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-black">Passport Collection</h1>
                    <ol className="list-decimal">
                        <li>Collect the passport from the embassy on the specified date and time.</li>
                        <li>If all documents are correct and processed properly, you will receive the visa.</li>
                        <li>The visa will be valid for 2 years, and you can also extend it after this period.</li>
                        <li>Congratulations! Take a flight and enjoy your life in Canada.</li>
                    </ol>
                </div>


            </div>

            <div className="px-10 md:px-5">
                <h1 className="font-bold text-xs md:text-lg text-red-600 mb-3 text-center md:text-left">N.B. : If you need more information or assistance, you can contact a verified lawyer.</h1>
                <h1 className="font-bold text-lg md:text-2xl text-red-600 my-5 text-center md:text-left">List of Lawyers</h1>
                <ol className="list-decimal flex flex-col gap-5 font-medium">
                    <li>
                        <div className="text-sm md:text-base">
                            <div className="flex items-center gap-2 font-bold text-base">
                                <h1>Adv. Sahajan Choudhary</h1>
                                <BsPatchCheckFill className="text-blue-600"></BsPatchCheckFill>
                            </div>
                            {/* <h1 className="flex gap-1"><a href="https://wa.me/+15086189521?text=I need help for Visa?" target="_blank">
                                <h1>Whats App:</h1>
                            </a> +15086189521</h1> */}
                            <h1>imo: +15797012958</h1>
                            <h1>Email: advsahjahancanada@gmail.com</h1>
                        </div>
                    </li>

                    <li>
                        <div className="text-sm md:text-base">
                            <div className="flex items-center gap-2 font-bold text-base">
                                <h1>Adv. Mithun Ahmed</h1>
                                <BsPatchCheckFill className="text-blue-600"></BsPatchCheckFill>
                            </div>
                            {/* <h1 className="flex gap-1"><a href="https://wa.me/+14125705252?text=I need help for Visa?" target="_blank">
                                <h1>Whats App:</h1>
                            </a> +14125705252</h1> */}
                            <h1>imo: +12894748944</h1>
                            <h1>Email: advmithunahmed@gmail.com</h1>
                        </div>
                    </li>

                    <li>
                        <div className="text-sm md:text-base">
                            <div className="flex items-center gap-2 font-bold text-base">
                                <h1>Barr. Badol Rahman</h1>
                                <BsPatchCheckFill className="text-blue-600"></BsPatchCheckFill>
                            </div>
                            {/* <h1 className="flex gap-1"><a href="https://wa.me/+14692671366?text=I need help for Visa?" target="_blank">
                                <h1>Whats App:</h1>
                            </a> +14692671366</h1> */}
                            <h1>imo: +12094906947</h1>
                            <h1>Email: advbadolrahman@gmail.com</h1>
                        </div>
                    </li>

                    <li>
                        <div className="text-sm md:text-base">
                            <div className="flex items-center gap-2 font-bold text-base">
                                <h1>Adv. Saddam Hosain</h1>
                                <BsPatchCheckFill className="text-blue-600"></BsPatchCheckFill>
                            </div>
                            {/* <h1 className="flex gap-1"><a href="https://wa.me/+14125705252?text=I need help for Visa?" target="_blank">
                                <h1>Whats App:</h1>
                            </a> +14125705252</h1> */}
                            <h1>imo: +16398274395</h1>
                            <h1>Email: advsaddamhosain@gmail.com</h1>
                        </div>
                    </li>
                   
                


                </ol>
            </div>


        </div>
    );
};

export default About;