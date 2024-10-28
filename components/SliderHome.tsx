"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules"; // Add Autoplay and Navigation
import Image from "next/image";

const img = "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Home.jpg?format=webp&w=1500&dpr=1.3";
const img1 = "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_6_dYCXJsS.jpg?format=webp&w=1500&dpr=1.3";
const img2 = "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_banner_copy_1_copy.jpg?format=webp&w=1500&dpr=1.3";
const img3 = "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_banner_copy_10.jpg?format=webp&w=1500&dpr=1.3";

const SliderHome = () => {
  return (
    <Swiper
      direction={"vertical"} // Change to horizontal if preferred
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3000, // Delay between slides (3 seconds)
        disableOnInteraction: false, // Continue autoplay after user interaction
      }}
      loop={true}
      // navigation={true} // Enable navigation arrows
      modules={[Pagination, Autoplay]} // Add Autoplay and Navigation modules
      className="h-[500px] w-full"
    >
      <SwiperSlide className="h-full w-full p-1">
        <Image
          src={img}
          alt="Slide 1"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={img1}
          alt="Slide 2"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={img2}
          alt="Slide 3"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={img3}
          alt="Slide 4"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SliderHome;
