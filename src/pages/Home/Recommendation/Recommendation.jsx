/* eslint-disable react/prop-types */

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useRecommendation from '../../../hooks/useRecommendation';

const Recommendation = () => {
    const [recommendation] = useRecommendation();

    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full cursor-pointer`}
                style={{ ...style }}
                onClick={onClick}
            >
                Prev
            </div>
        );
    };

    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full cursor-pointer`}
                style={{ ...style }}
                onClick={onClick}
            >
                Next
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="my-10">
            <h2 className="text-3xl font-semibold text-center mb-6">Our Recommendation</h2>
            <Slider {...settings}>
                {recommendation.map((item) => (
                    <div
                        key={item._id}
                        className="h-[500px] flex items-center justify-center"
                        
                    >   
                        
                        
                        <img className='absolute' src={item.image} alt="" />
                        <div className="relative z-10 text-center text-white top-[20%]">
                            <h1 className="text-2xl lg:text-4xl font-bold mb-2">{item.title}</h1>
                            <p className="mb-4">{item.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Recommendation;
