import React from "react";
import { useNavigate } from "react-router";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1600&q=80&auto=format&fit=crop",
      title: "Start Small",
      subtitle: "Build one tiny habit at a time.",
      cta: "Start Today",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1600&q=80&auto=format&fit=crop",
      title: "Track Progress",
      subtitle: "See your streak grow every day.",
      cta: "Track Now",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600&q=80&auto=format&fit=crop",
      title: "Stay Consistent",
      subtitle: "Small steps, big results.",
      cta: "Keep Going",
    },
  ];

  return (
    <div className="p-2">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="relative h-60 sm:h-80 md:h-96 lg:h-96">
              {/* Background image */}
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
              />

              {/* Dark overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/35"></div>

              {/* Content on top */}
              <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-10">
                <h3 className="text-white text-xl sm:text-2xl md:text-4xl font-semibold drop-shadow-md">
                  {s.title}
                </h3>
                <p className="text-white/90 mt-2 md:mt-4 text-sm sm:text-base md:text-lg max-w-xl">
                  {s.subtitle}
                </p>

                <div className="mt-4 md:mt-6">
                  <button
                    onClick={() => navigate("/auth/login")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white shadow-md text-sm md:text-base font-medium"
                  >
                    {s.cta}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
