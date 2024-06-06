

import first from '../../../assets/Steps/first.png'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
// import { Pagination } from 'swiper/modules';

const Steps = () => {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                // modules={[Pagination]}
                className="mySwiper"
            >
                {/* <SwiperSlide>
                    <img src={first} alt="step image" />
                </SwiperSlide> */}

                <SwiperSlide>
                    <div className="bg-neutral h-auto md:h-60 p-2 md:p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                        <div className=" items-center text-center">
                            <h2 className="font-medium md:font-bold  mb-2">1st - Language Proficiency Certificate</h2>
                            <p className='text-sm'>An English language test is one of the best-known and most commonly used language proficiency tests. The purpose of the test is to assess a test takers level in reading and writing English. You need at least a 5.5 IELTS band score for a working visa, and for a student or higher level, you need at least a 6.5 IELTS band score.</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="bg-neutral h-auto md:h-60 p-2 md:p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                        <div className=" items-center text-center">
                            <h2 className="font-medium md:font-bold  mb-2">2nd - Educational Credentials Assessment(ECA)</h2>
                            <p className='text-sm'>The documents that you need to provide when you’re applying to immigrate to Canada depend on the program you’re applying to. However, a common document that is required for most federal economic immigration streams, including Express Entry, is an Educational Credential Assessment or ECA. The cost is about <span className='text-red-500'>CAN$200 </span>plus the cost to have it delivered.</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="bg-neutral h-auto md:h-60 p-2 md:p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                        <div className=" items-center text-center">
                            <h2 className="font-medium md:font-bold  mb-2">3rd - Job Experience Certificate</h2>
                            <p className='text-sm'>Job experience refers to the skills and knowledge gained through various roles in employment. It includes tasks handled, projects completed, and achievements in each position. Detailed in a resume or CV, job experience demonstrates a candidate qualifications and suitability for a new role, helping employers understand their practical abilities and work ethic.</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="bg-neutral h-auto md:h-60 p-2 md:p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                        <div className=" items-center text-center">
                            <h2 className="font-medium md:font-bold  mb-2">4th - Curriculum vitae (CV)</h2>
                            <p className='text-sm'>A CV, or curriculum vitae, is a detailed document outlining an individuals education, work experience, skills, and achievements. It is used for academic, research, or high-level professional applications. Unlike a resume, a CV offers a comprehensive career overview, often spanning several pages. This thoroughness helps employers or institutions evaluate a candidates qualifications.</p>
                        </div>
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div className="bg-neutral h-auto md:h-60 p-2 md:p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                        <div className=" items-center text-center">
                            <h2 className="font-medium md:font-bold  mb-2">5th - Cover Letter</h2>
                            <p className='text-sm'>A cover letter accompanies a resume to provide more details about your skills and experience. It introduces you to potential employers and explains why you are a good fit for the job. It typically includes an introduction, a brief summary of your background, and a closing statement. A cover letter helps personalize your application and highlight your communication skills.</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="bg-neutral h-auto md:h-60 p-2 md:p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                        <div className=" items-center text-center">
                            <h2 className="font-medium md:font-bold  mb-2">6th - Labour Market Impact Assessment (LMIA)</h2>
                            <p className='text-sm'>A Labour Market Impact Assessment (LMIA) is a document that an employer in Canada may need to get before hiring a foreign worker. A positive LMIA will show that there is a need for a foreign worker to fill the job. It will also show that no Canadian worker or permanent resident is available to do the job. A positive LMIA is sometimes called a confirmation letter.</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="bg-neutral h-auto md:h-60 p-2 md:p-5 text-neutral-content flex items-center text-center justify-center  rounded-lg ">
                        <div className=" items-center text-center">
                            <h2 className="font-medium md:font-bold  mb-2">7th - Work Permit Visa</h2>
                            <p className='text-sm'>Once an employer gets the LMIA, the worker can apply for a work permit. To apply, a worker needs to fill out the application form carefully and completely and pay the work permit fee of <span className='text-red-500'>CAN$465 </span>, the open work permit holder fee of <span className='text-red-500'>CAN$100 </span>, and the restore status of worker fee of <span className='text-red-500'>CAN$384 </span>, totaling <span className='text-red-500'>CAN$949 </span>. It can take between 5-36 weeks to process depending on specific circumstances.</p>
                        </div>
                    </div>
                </SwiperSlide>




            </Swiper>
        </>
    );
};

export default Steps;