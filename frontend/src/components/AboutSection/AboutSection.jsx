import React from "react";
import mayaSofaThreeSeater from "../../assets/img/mayaSofaThreeSeater.png";

export default function AboutSection() {
  return (
    <div className="mt-20 px-5 md:px-10 lg:px-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative bg-[#F8F3E6] rounded-3xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F3E6] via-transparent to-[#F8F3E6] z-10"></div>
        <img
          src={mayaSofaThreeSeater}
          alt="Luxury three-seater sofa in a modern living room"
          className="w-full h-[350px] md:h-[500px] object-cover object-center"
        />
      </div>

      {/* Content Section */}
      <div className="mt-20 mb-28 flex flex-col lg:flex-row items-start gap-16">
        {/* Left Text Content */}
        <div className="flex-1">
          <div className="border-l-4 border-[#D1A570] pl-6 mb-8">
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#3A3A3A] mb-4">
              Crafting Comfort, Style & Elegance
            </h2>
            <p className=" text-base not-[]:md:text-lg text-[#5A5A5A]">
              Since 2010, we've been transforming houses into homes
            </p>
          </div>

          <div className="space-y-6 text-[#5A5A5A] leading-relaxed">
            <p className="text-base md:text-lg">
              At Emmorcerce, we believe that your home should reflect your
              unique personality and provide a comfortable haven for everyday
              life. Our curated collection of sofas, chairs, and furnishings
              combines craftsmanship with timeless design to create spaces that
              feel personal, cozy, and truly yours.
            </p>

            <p className="text-base md:text-lg">
              From handcrafted wooden chairs to modular sofas that blend
              function with fashion, we bring you quality furniture that fits
              seamlessly into modern lifestyles. Whether you're furnishing your
              first apartment or elevating your living room, our goal is to help
              you love every corner of your home.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-0.5 w-16 bg-[#D1A570]"></div>
            <span className="text-[#D1A570] font-medium">Our Promise</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex-1 space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-md border border-[#F0E9D9] hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF5E5] flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#3A3A3A]">
                Sustainable Materials
              </h3>
            </div>
            <p className="text-[#5A5A5A] pl-16  text-sm md:text-base">
              We partner with responsible suppliers to source FSC-certified wood
              and OEKO-TEX® certified fabrics, ensuring every piece meets our
              strict environmental standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-[#F0E9D9] hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF5E5] flex items-center justify-center">
                <span className="text-2xl">✋</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#3A3A3A]">
                Artisan Craftsmanship
              </h3>
            </div>
            <p className="text-[#5A5A5A] pl-16  text-sm md:text-base">
              Our furniture is handcrafted by master artisans with decades of
              experience, combining traditional techniques with modern design
              for heirloom-quality pieces.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-[#F0E9D9] hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF5E5] flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#3A3A3A]">
                Customer First
              </h3>
            </div>
            <p className="text-[#5A5A5A] pl-16 text-sm md:text-base">
              From personalized design consultations to our 10-year warranty,
              we're committed to your complete satisfaction at every step of
              your furniture journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
