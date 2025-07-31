import React from "react";
import { Icon } from "@iconify/react";

export default function ContactInfo() {
  return (
    <div className="mt-20 flex flex-col items-center">
      <div className="text-center max-w-[644px]">
        <h1 className="font-semibold text-2xl md:text-3xl  xl:text-4xl">
          Get In Touch With Us
        </h1>
        <p className="text-sm md:text-base font-normal text-[#9F9F9F] pt-5 tracking-wide">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>
      <div className="p-10 md:p-20 flex flex-col lg:flex-row gap-20 w-full justify-center items-start">
        <div className="flex flex-col gap-10  ">
          {/* Contact Address */}
          <div className="flex  gap-5">
            <Icon icon="mdi:map-marker" className="text-xl md:text-4xl" />
            <div className="max-w-[212px]">
              <h1 className="font-medium text-xl md:text-xl ">Address</h1>
              <p className="text-sm md:text-base font-regular">
                236 5th SE Avenue, New York NY10000, United States
              </p>
            </div>
          </div>

          {/* Contact Phone */}
          <div className="flex  gap-5">
            <Icon icon="bxs:phone" className="text-xl md:text-4xl" />

            <div className="max-w-[212px]">
              <h1 className="font-medium md:text-2xl text-xl">Phone</h1>
              <p className="md:text-base text-sm font-regular">
                Mobile: +(84) 546-6789 Hotline: +(84) 456-6789
              </p>
            </div>
          </div>

          {/* Contact Time */}
          <div className="flex  gap-5">
            <Icon icon="bi:clock-fill" className="text-xl md:text-3xl" />

            <div className="max-w-[212px]">
              <h1 className="font-medium md:text-2xl text-xl">Address</h1>
              <p className="md:text-base text-sm font-regular">
                Monday-Friday: 9:00 - 22:00 Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[625px] ">
          <form>
            <div className="">
              <p className="text-base font-medium pb-3">Your name</p>
              <input
                placeholder="John Doe"
                className="h-[75px] w-full max-w-[423px] border border-[#9F9F9F] rounded-[10px] px-4"
                type="text"
              />
            </div>
            <div className="mt-8">
              <p className="text-base font-medium pb-3">Email address</p>
              <input
                placeholder="Abc@def.com"
                className="h-[75px] w-full max-w-[423px] border border-[#9F9F9F] rounded-[10px] px-4"
                type="email"
              />
            </div>

            <div className="mt-8 flex flex-col ">
              <p className="text-base font-medium pb-3">Subject</p>
              <input
                placeholder="This is an optional"
                className="h-[75px] w-full max-w-[423px] border border-[#9F9F9F] rounded-[10px] px-4"
                type="text"
              />
            </div>

            <div className="mt-8">
              <p className="text-base font-medium pb-3">Message</p>
              <textarea
                placeholder="Hi! i'd like to ask about"
                rows={6}
                className=" w-full max-w-[423px] border border-[#9F9F9F] rounded-[10px] p-4"
                type="text"
              />
            </div>
            <div className="flex ">
              <button className="w-full mt-4 md:mt-6 border border-black py-2 md:py-3 rounded-2xl text-sm md:text-base font-normal hover:bg-black hover:text-white transition-colors max-w-[200px] ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
