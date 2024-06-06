

import bannerPic1 from '../../../assets/Banners/bannerPic (1).jpg'
import bannerPic2 from '../../../assets/Banners/bannerPic (2).jpg'
import bannerPic3 from '../../../assets/Banners/bannerPic (3).jpg'
import bannerPic4 from '../../../assets/Banners/bannerPic (4).jpg'
import bannerPic5 from '../../../assets/Banners/bannerPic (5).jpg'
import bannerPic6 from '../../../assets/Banners/bannerPic (6).jpg'
import bannerPic7 from '../../../assets/Banners/bannerPic (7).jpg'


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
        <Carousel width="100%" height="700px">
            <div>
                <img src={bannerPic1} />
            </div>
            <div>
                <img src={bannerPic2} />
            </div>
            <div>
                <img src={bannerPic3} />
            </div>
            <div>
                <img src={bannerPic4} />
            </div>
            <div>
                <img src={bannerPic5} />
            </div>
            <div>
                <img src={bannerPic6} />
            </div>
            <div>
                <img src={bannerPic7} />
            </div>

        </Carousel>
    );
};

export default Banner;