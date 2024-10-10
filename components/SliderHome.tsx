"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

const img = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Home.jpg?format=webp&w=1500&dpr=1.3'
const img1 = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_6_dYCXJsS.jpg?format=webp&w=1500&dpr=1.3'
const img2 = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_banner_copy_1_copy.jpg?format=webp&w=1500&dpr=1.3'
const img3 = 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_banner_copy_10.jpg?format=webp&w=1500&dpr=1.3'
const SliderHome = () => {
  return (
    <>
      <Swiper
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        autoplay={true}
        loop={true}
        navigation={true}
        modules={[Pagination]}
        className="h-[500px] w-full"
      >
        <SwiperSlide className='h-full w-full p-1'>
          <img src={img} alt='k' height={200} width={200} className=' w-full h-full ' />
        </SwiperSlide>
        <SwiperSlide><img src={img1} alt='k' height={200} width={200} className=' w-full h-full ' /></SwiperSlide>
        <SwiperSlide><img src={img} alt='k' height={200} width={200} className=' w-full h-full ' /></SwiperSlide>
        <SwiperSlide><img src={img2} alt='k' height={200} width={200} className=' w-full h-full ' /></SwiperSlide>
        <SwiperSlide><img src={img1} alt='k' height={200} width={200} className=' w-full h-full ' /></SwiperSlide>
        <SwiperSlide><img src={img3} alt='k' height={200} width={200} className=' w-full h-full ' />6</SwiperSlide>

      </Swiper>
    </>
  )
}

export default SliderHome