import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "./Banner.css";

import ph1 from "../../../assets/Matrimony1.avif";
import ph2 from "../../../assets/Matrimony2.avif";
import ph3 from "../../../assets/Matrimony3.avif";
import ph4 from "../../../assets/Matrimony4.avif";
import ph5 from "../../../assets/Matrimony5.avif";
import ph6 from "../../../assets/Matrimony6.avif";

const Banner = () => {
  return (
    /* bg-gradient-to-r from-red-400 via-pink-400 to-pink-500 */
    <div className="p-6 rounded-lg border bg-slate-100 ">
      {/* Banner Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          Find the Partner of Your Dreams
        </h1>
        <p className="text-lg md:text-lg">
          We make it easy for you to connect with your perfect match.
        </p>
      </div>

      {/* Swiper Component */}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {[ph1, ph2, ph3, ph4, ph5, ph6].map((photo, index) => (
          <SwiperSlide key={index}>
            <div className="group">
              <img
                src={photo}
                alt={`Matrimony ${index + 1}`}
                className="rounded-lg shadow-lg transform group-hover:scale-105 group-hover:shadow-2xl transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  View Profile
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
