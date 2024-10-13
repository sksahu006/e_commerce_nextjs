import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/Featuredproduct";
import NewArrivals from "@/components/NewArrivals";
import SliderHome from "@/components/SliderHome";
import Marquee from 'react-fast-marquee';
export default function Home() {
  return (
    <div className="mt-20 flex flex-col gap-3">
      <section>
        <SliderHome />
      </section>
      <section>
        <NewArrivals />
      </section>
      <div className=' bg-[#ffc719] p-2 '>

                <Marquee speed={50} gradient={false} >
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className='font-thunder-lc text-3xl ml-3 mr-3 uppercase'>
                            the town troops
                        </div>
                    ))}
                </Marquee>
            </div>
      <section>
        <FeaturedProducts />
      </section>
      <section>
        <CategorySection/>
      </section>


    </div>
  );
}
