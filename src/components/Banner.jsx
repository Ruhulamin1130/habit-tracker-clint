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
      title: "Start Small, Dream Big",
      subtitle: "Build meaningful habits one step at a time.",
      cta: "Get Started",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1600&q=80&auto=format&fit=crop",
      title: "Track Your Progress",
      subtitle: "Visualize your streaks and stay motivated every day.",
      cta: "Track Now",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600&q=80&auto=format&fit=crop",
      title: "Stay Consistent",
      subtitle: "Small actions repeated daily lead to big transformations.",
      cta: "Continue Journey",
    },
  ];

  return (
    <div className="p-2 md:p-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="rounded-3xl overflow-hidden shadow-2xl"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="relative h-[60vh] md:h-[80vh] w-full">
              {/* Background image */}
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/80 via-rose-500/50 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white">
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                  {s.title}
                </h1>
                <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg max-w-2xl">
                  {s.subtitle}
                </p>

                <div className="mt-6">
                  <button
                    onClick={() => navigate("/auth/login")}
                    className="px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition text-white border border-white/30 shadow-lg"
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
