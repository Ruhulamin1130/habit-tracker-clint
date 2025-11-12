import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    name: "Love Funny",
    text: "This app changed my productivity game! I can finally stick to my habits.",
  },
  {
    id: 2,
    name: "Jane Doe",
    text: "I feel more focused and less stressed thanks to habit tracking.",
  },
  {
    id: 3,
    name: "John Smith",
    text: "The visual analytics keeps me motivated every day.",
  },
  {
    id: 4,
    name: "Alex Johnson",
    text: "I love the progress tracking. It’s simple and effective!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-pink-500">
        What Our Users Say
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl border border-pink-300 p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300">
              <FaUserCircle className="text-pink-500 text-5xl mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                "{item.text}"
              </p>
              <h4 className="mt-4 font-semibold text-gray-800 dark:text-white">
                – {item.name}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
