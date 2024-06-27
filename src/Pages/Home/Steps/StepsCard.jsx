import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StepsCard = () => {
    const [selectedId, setSelectedId] = useState(null);

    const steps = [
        {
            id: 1,
            title: "1st - Language Proficiency Certificate",
            content: "An English language test is one of the best-known and most commonly used language proficiency tests. The purpose of the test is to assess a test takers level in reading and writing English. You need at least a 5.5 IELTS band score for a working visa, and for a student or higher level, you need at least a 6.5 IELTS band score."
        },
        {
            id: 2,
            title: "2nd - Educational Credentials Assessment(ECA)",
            content: "The documents that you need to provide when you’re applying to immigrate to Canada depend on the program you’re applying to. However, a common document that is required for most federal economic immigration streams, including Express Entry, is an Educational Credential Assessment or ECA. The cost is about CAN$200 and it takes 48 hours for approval."
        },
        {
            id: 3,
            title: "3rd - Job Experience Certificate",
            content: "Job experience refers to the skills and knowledge gained through various roles in employment. It includes tasks handled, projects completed, and achievements in each position. Detailed in a resume or CV, job experience demonstrates a candidate qualifications and suitability for a new role, helping employers understand their practical abilities and work ethic."
        },
        {
            id: 4,
            title: "4th - Curriculum vitae (CV)",
            content: "A CV, or curriculum vitae, is a detailed document outlining an individuals education, work experience, skills, and achievements. It is used for academic, research, or high-level professional applications. Unlike a resume, a CV offers a comprehensive career overview, often spanning several pages. This thoroughness helps employers or institutions evaluate a candidates qualifications."
        },
        {
            id: 5,
            title: "5th - Cover Letter",
            content: "A cover letter accompanies a resume to provide more details about your skills and experience. It introduces you to potential employers and explains why you are a good fit for the job. It typically includes an introduction, a brief summary of your background, and a closing statement. A cover letter helps personalize your application and highlight your communication skills."
        },
        {
            id: 6,
            title: "6th - Labour Market Impact Assessment (LMIA)",
            content: "A Labour Market Impact Assessment (LMIA) is a document that an employer in Canada may need to get before hiring a foreign worker. A positive LMIA is sometimes called a confirmation letter. The LMIA application fee is CAN$350. After applying for LMIA, we will verify it and approve it within 72 hours, depending on the documents."
        },
        {
            id: 7,
            title: "7th - Work Permit Visa",
            content: "Once an employer gets the LMIA, the worker can apply for a work permit. To apply, a worker needs to fill out the application form carefully and completely and pay the work permit fee of CAN$465, the open work permit holder fee of CAN$100, and the restore status of worker fee of CAN$384, totaling CAN$949. You will receive a biometric verification date. The processing time can take between 5 and 10 weeks, depending on specific circumstances."
        },
        {
            id: 8,
            title: "8th - Biometrics",
            content: "Biometrics include your fingerprints and photo. We collect your biometrics to confirm your identity and to help assess your application. Please bring all necessary documents on your biometric submission date, such as your passport, national identification card, ECA certificate, LMIA certificate, and education certificates. The biometric submission cost is CAN$85. Please pay this amount to your agent before the biometric date."
        },
        {
            id: 9,
            title: "9th - Congratulations",
            content: "After your biometric submission, we will verify your biometrics and all your documents. This process takes a maximum of 7 working days. After that, you will receive your passport with your Canada Work Permit Visa. You can then buy a ticket and start a new journey in Canada. You are most welcome in Canada."
        }
        // Add the rest of the steps similarly...
    ];

    return (
        <div>
            <div className="my-3 md:my-5">
                <div className="divider divider-error text-center text-2xl md:text-3xl font-bold">Steps to apply for visa</div>
            </div>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-2">
                {steps.map(step => (
                    <motion.div
                        key={step.id}
                        layoutId={step.id}
                        onClick={() => setSelectedId(step.id)}
                        className="bg-neutral h-auto md:h-60 p-5 text-neutral-content flex items-center text-center justify-center rounded-lg cursor-pointer"
                    >
                        <div className="items-center text-center">
                            <h2 className="font-medium md:font-bold mb-2">{step.title}</h2>
                            <p className='text-sm'>{step.content}</p>
                        </div>

                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        layoutId={selectedId}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    >
                        <motion.div
                            className="bg-white p-5 rounded-lg max-w-md mx-auto"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <h2 className="font-medium md:font-bold mb-2 text-red-600">
                                {steps.find(step => step.id === selectedId).title}
                            </h2>
                            <p className='text-sm font-bold'>
                                {steps.find(step => step.id === selectedId).content}
                            </p>
                            <motion.button
                                className="mt-5 bg-red-500 text-white py-2 px-4 rounded"
                                onClick={() => setSelectedId(null)}
                            >
                                Close
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StepsCard;
