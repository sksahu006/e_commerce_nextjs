"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules"; // Add Autoplay and Navigation
import Image from "next/image";

// Array of image URLs
const images = [
  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Home.jpg?format=webp&w=1500&dpr=1.3",
  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_6_dYCXJsS.jpg?format=webp&w=1500&dpr=1.3",
  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_banner_copy_1_copy.jpg?format=webp&w=1500&dpr=1.3",
  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_banner_copy_10.jpg?format=webp&w=1500&dpr=1.3",
];

// Slider Component
const SliderHome = () => {
  return (
    <div className="h-[200px] sm:h-[300px] md:h-[500px]">
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
        modules={[Pagination, Autoplay, Navigation]} // Add Navigation module if needed
        className="h-full w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="h-full w-full relative">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-contain md:object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderHome;