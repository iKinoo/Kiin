import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Course } from "@/domain/entities/Course";
import ScheduleCard from "./ScheduleCard";

type SliderProps = {
    schedules: Course[][];
    currentSlide: number;
};

export default function SimpleSlider({ schedules, currentSlide }: SliderProps) {

    const sliderRef = React.useRef<Slider>(null);

    React.useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(currentSlide);
        }
    }, [currentSlide]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,

    };

    return (
        <Slider {...settings} ref={sliderRef}>
            {schedules.map((schedule, index) => (
                
                <ScheduleCard key={index} course={schedule} isSelected={index === currentSlide}/>
            ))}
        </Slider>
    );
}
