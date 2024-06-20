
const StepsCard = () => {
    return (
        <div>
            <div className="my-3 md:my-5">
                {/* <h1 className="text-center text-3xl my-3 font-bold">Steps to apply for visa</h1> */}
                <div className="divider divider-error text-center text-2xl md:text-3xl font-bold">Steps to apply for visa</div>
            </div>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-2 ">

                <div className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                    <div className=" items-center text-center">
                        <h2 className="font-medium md:font-bold  mb-2">1st - Language Proficiency Certificate</h2>
                        <p className='text-sm'>An English language test is one of the best-known and most commonly used language proficiency tests. The purpose of the test is to assess a test takers level in reading and writing English. You need at least a 5.5 IELTS band score for a working visa, and for a student or higher level, you need at least a 6.5 IELTS band score.</p>
                    </div>
                </div>

                <div className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                    <div className=" items-center text-center">
                        <h2 className="font-medium md:font-bold  mb-2">2nd - Educational Credentials Assessment(ECA)</h2>
                        <p className='text-sm'>The documents that you need to provide when you’re applying to immigrate to Canada depend on the program you’re applying to. However, a common document that is required for most federal economic immigration streams, including Express Entry, is an Educational Credential Assessment or ECA. The cost is about <span className='text-red-500'>CAN$200 </span> and it takes 48 hours for approval.</p>
                    </div>
                </div>

                <div className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                    <div className=" items-center text-center">
                        <h2 className="font-medium md:font-bold  mb-2">3rd - Job Experience Certificate</h2>
                        <p className='text-sm'>Job experience refers to the skills and knowledge gained through various roles in employment. It includes tasks handled, projects completed, and achievements in each position. Detailed in a resume or CV, job experience demonstrates a candidate qualifications and suitability for a new role, helping employers understand their practical abilities and work ethic.</p>
                    </div>
                </div>

                <div className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                    <div className=" items-center text-center">
                        <h2 className="font-medium md:font-bold  mb-2">4th - Curriculum vitae (CV)</h2>
                        <p className='text-sm'>A CV, or curriculum vitae, is a detailed document outlining an individuals education, work experience, skills, and achievements. It is used for academic, research, or high-level professional applications. Unlike a resume, a CV offers a comprehensive career overview, often spanning several pages. This thoroughness helps employers or institutions evaluate a candidates qualifications.</p>
                    </div>
                </div>

                <div className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                    <div className=" items-center text-center">
                        <h2 className="font-medium md:font-bold  mb-2">5th - Cover Letter</h2>
                        <p className='text-sm'>A cover letter accompanies a resume to provide more details about your skills and experience. It introduces you to potential employers and explains why you are a good fit for the job. It typically includes an introduction, a brief summary of your background, and a closing statement. A cover letter helps personalize your application and highlight your communication skills.</p>
                    </div>
                </div>

                <div className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                    <div className=" items-center text-center">
                        <h2 className="font-medium md:font-bold  mb-2">6th - Labour Market Impact Assessment (LMIA)</h2>
                        <p className='text-sm'>A Labour Market Impact Assessment (LMIA) is a document that an employer in Canada may need to get before hiring a foreign worker. A positive LMIA is sometimes called a confirmation letter. The LMIA application fee is <span className='text-red-500'>CAN$350 </span>. After applying for LMIA, we will verify it and approve it within 72 hours, depending on the documents.</p>
                    </div>
                </div>

                <div className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                    <div className=" items-center text-center">
                        <h2 className="font-medium md:font-bold  mb-2">7th - Work Permit Visa</h2>
                        <p className='text-sm'>Once an employer gets the LMIA, the worker can apply for a work permit. To apply, a worker needs to fill out the application form carefully and completely and pay the work permit fee of <span className='text-red-500'>CAN$465 </span>, the open work permit holder fee of <span className='text-red-500'>CAN$100 </span>, and the restore status of worker fee of <span className='text-red-500'>CAN$384 </span>, totaling <span className='text-red-500'>CAN$949 </span>. You will receive a biometric verification date. The processing time can take between 5 and 10 weeks, depending on specific circumstances.</p>
                    </div>
                </div>
                <div className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                    <div className=" items-center text-center">
                        <h2 className="font-medium md:font-bold  mb-2">8th - Biometrics</h2>
                        <p className='text-sm'>Biometrics include your fingerprints and photo. We collect your biometrics to confirm your identity and to help assess your application. Please bring all necessary documents on your biometric submission date, such as your passport, national identification card, ECA certificate, LMIA certificate, and education certificates. The biometric submission cost is CAN$85. Please pay this amount to your agent before the biometric date.</p>
                    </div>
                </div>

                <div className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                    <div className=" items-center text-center">
                        <h2 className="font-medium md:font-bold  mb-2">9th - <span className="text-xl text-red-600">Congratulations</span></h2>
                        <p className='text-sm'>After your biometric submission, we will verify your biometrics and all your documents. This process takes a maximum of 7 working days. After that, you will receive your passport with your <span className="text-white font-bold">Canada Work Permit Visa</span>. You can then buy a ticket and start a new journey in Canada. You are most welcome in Canada.</p>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default StepsCard;