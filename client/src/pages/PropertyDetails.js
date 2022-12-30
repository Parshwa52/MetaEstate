import { Button } from "@mui/material";
import React, { useState } from "react";

import { useLocation,useNavigate } from "react-router-dom";
const PropertyDetails = () => {
  let navigate=useNavigate();
  let location = useLocation();
  const [data, setData] = useState(location.state.data);
  return (
    <div className="font-karla text-body text-tiny">
      <div className="overflow-hidden">
        <div className="offcanvas-overlay hidden fixed inset-0 bg-black opacity-50 z-50"></div>
        <div
          id="offcanvas-mobile-menu"
          className="offcanvas left-0 transform -translate-x-full fixed font-normal text-sm top-0 z-50 h-screen xs:w-[300px] lg:w-[380px] transition-all ease-in-out duration-300 bg-white"
        ></div>

        <section
          className="bg-no-repeat bg-center bg-cover bg-[#FFF6F0] h-[350px] lg:h-[513px] flex flex-wrap items-center relative before:absolute before:inset-0 before:content-[''] before:bg-[#000000] before:opacity-[70%]"
          style={{
            backgroundImage: "url('assets/images/breadcrumb/bg-1.png')",
          }}
        >
          <div className="container">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <div className="max-w-[600px]  mx-auto text-center text-white relative z-[1]">
                  <div className="mb-5">
                    <span
                      className="text-base block"
                      style={{ fontSize: "20px" }}
                    >
                      Our Properties
                    </span>
                  </div>
                  <h1
                    className="font-lora text-[36px] sm:text-[50px] md:text-[68px] lg:text-[50px] leading-tight xl:text-2xl font-medium"
                    style={{ fontFamily: "Georgia" }}
                  >
                    Properties Details
                  </h1>

                  <p
                    className="text-base mt-5 max-w-[500px] mx-auto text-center"
                    style={{ fontSize: "22px" }}
                  >
                    Huge number of propreties availabe here for buy and sell
                    also you can find here co-living property as you like
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="popular-properties py-[80px] lg:py-[120px]">
          <div className="container">
            <div className="grid grid-cols-12 mb-[-30px] gap-[30px] xl:gap-[50px]">
              <div className="col-span-12 md:col-span-6 lg:col-span-8 mb-[30px]">
                <h2
                  style={{ color: "#083AA9" }}
                  className="font-lora leading-tight text-[22px] md:text-[28px] lg:text-[36px] text-primary mb-[5px] font-medium"
                >
                  {data.name} {"\u00A0"}
                </h2>{" "}
                <img
                  src={data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  className="w-auto h-auto"
                  loading="lazy"
                  style={{ width: "100%" }}
                  alt="Elite Garden Resedence."
                  height="465"
                />
                <div className="mt-[45px] mb-[35px]">
                  <h2
                    style={{ color: "#083AA9" }}
                    className="font-lora leading-tight text-[22px] md:text-[28px] lg:text-[36px] text-primary mb-[5px] font-medium"
                  >
                    {data.metaverseName} {"\u00A0"}
                  </h2>
                  <h3 className="font-light text-[18px] text-secondary underline mb-[20px]">
                    {data.propertyLocation}
                  </h3>
                  <p style={{ color: "#B2B2B2" }}>{data.description} </p>
                </div>
                <h4
                  style={{ color: "#083AA9" }}
                  className="font-lora text-primary text-[24px] leading-[1.277] sm:text-[28px] capitalize mt-[50px] mb-[40px] font-medium"
                >
                  NFT USP's<span className="text-secondary">.</span>
                </h4>
                <ul
                  style={{ color: "#B2B2B2" }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-[15px] mx-[-15px] mt-[40px]"
                >
                  {data.usps.map((val, index) => {
                    return (
                      <li className="flex flex-wrap items-center mb-[25px]">
                        <img
                          className="mr-[15px]"
                          src="assets/images/about/check.png"
                          loading="lazy"
                          alt="icon"
                          width="20"
                          height="20"
                        />
                        <span>{val}</span>
                      </li>
                    );
                  })}
                </ul>
                <h5
                  style={{ color: "#083AA9" }}
                  className="font-lora text-primary text-[24px] sm:text-[28px] leading-[1.277] capitalize lg:mt-[25px] mb-[40px] font-medium"
                >
                  Video Sample<span className="text-secondary">.</span>
                </h5>

                <Button onClick={()=>navigate('/video',{state:{videoURL:data.video}})}>Check Video</Button>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                  <div className="text-center">
                    <img
                      src="assets/images/floor-plan/floor1.png"
                      alt="Floor Plan"
                    />
                    <p>Ground floor</p>
                  </div>

                  <div className="text-center">
                    <img
                      src="assets/images/floor-plan/floor3.png"
                      alt="Floor Plan"
                    />
                    <p>1st Floor</p>
                  </div>
                </div> */}
                <div className="grid grid-cols-12 mt-[10px]">
                  <div className="col-span-12">
                    <h2
                      style={{ color: "#083AA9" }}
                      className="font-lora text-primary text-[24px] sm:text-[28px] capitalize nt-[60px] lg:mt-[60px] font-medium"
                    >
                      Leave a Message<span className="text-secondary">.</span>
                    </h2>
                    <div className="mt-[60px]">
                      <form
                        action="#"
                        className="grid grid-cols-12 gap-x-[20px] gap-y-[30px]"
                      >
                        <div className="col-span-12 md:col-span-6">
                          <input
                            className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] "
                            type="text"
                            placeholder="First Name"
                          />
                        </div>

                        <div className="col-span-12 md:col-span-6">
                          <input
                            className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] "
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>

                        <div className="col-span-12 md:col-span-6">
                          <input
                            className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] "
                            type="text"
                            placeholder="Phone number"
                          />
                        </div>

                        <div className="col-span-12 md:col-span-6">
                          <input
                            className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] "
                            type="email"
                            placeholder="Email Address"
                          />
                        </div>

                        <div className="col-span-12">
                          <textarea
                            className="h-[196px] font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] resize-none"
                            name="textarea"
                            id="textarea"
                            cols="30"
                            rows="10"
                            placeholder="Message"
                          ></textarea>
                        </div>

                        <div className="col-span-12">
                          <button
                            type="submit"
                            className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[30px] py-[15px] capitalize font-medium text-white block text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
                          >
                            Contact us
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4 mb-[30px]">
                <aside className="mb-[-60px] asidebar">
                  <div className="mb-[60px]">
                    <h3
                      style={{ color: "#083AA9" }}
                      className="text-primary leading-none text-[24px] font-lora underline mb-[40px] font-medium"
                    >
                      Property Search <span className="text-secondary">.</span>
                    </h3>

                    <form action="#" className="relative">
                      <div className="relative mb-[25px] bg-white">
                        <input
                          className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-primary border-opacity-60 rounded-[8px] pl-[40px] pr-[20px] py-[8px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] bg-white"
                          type="text"
                          placeholder="Location"
                        />
                        <svg
                          className="absolute top-1/2 -translate-y-1/2 z-[1] left-[20px] pointer-events-none"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.39648 6.41666H8.60482"
                            stroke="#016450"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M7 8.02083V4.8125"
                            stroke="#016450"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M2.11231 4.9525C3.26148 -0.0991679 10.7456 -0.0933345 11.889 4.95833C12.5598 7.92167 10.7165 10.43 9.10064 11.9817C7.92814 13.1133 6.07314 13.1133 4.89481 11.9817C3.28481 10.43 1.44148 7.91583 2.11231 4.9525Z"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                          />
                        </svg>
                      </div>
                      <div className="relative mb-[25px] bg-white">
                        <svg
                          className="absolute top-1/2 -translate-y-1/2 z-[1] left-[20px] pointer-events-none"
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_928_754)">
                            <path
                              d="M4.64311 0H0V4.64311H4.64311V0ZM3.71437 3.71437H0.928741V0.928741H3.71437V3.71437Z"
                              fill="#0B2C3D"
                            />
                            <path
                              d="M8.35742 0V4.64311H13.0005V0H8.35742ZM12.0718 3.71437H9.28616V0.928741H12.0718V3.71437Z"
                              fill="#0B2C3D"
                            />
                            <path
                              d="M0 13H4.64311V8.35689H0V13ZM0.928741 9.28563H3.71437V12.0713H0.928741V9.28563Z"
                              fill="#0B2C3D"
                            />
                            <path
                              d="M8.35742 13H13.0005V8.35689H8.35742V13ZM9.28616 9.28563H12.0718V12.0713H9.28616V9.28563Z"
                              fill="#0B2C3D"
                            />
                            <path
                              d="M6.96437 0H6.03563V6.03563H0V6.96437H6.03563V13H6.96437V6.96437H13V6.03563H6.96437V0Z"
                              fill="#0B2C3D"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_928_754">
                              <rect width="13" height="13" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <select className="nice-select font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body borderborder-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary border-primary pl-[40px] pr-[20px] py-[8px] focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] bg-white appearance-none cursor-pointer">
                          <option value="0">Property Category</option>
                          <option value="1">Property</option>
                          <option value="2">Category</option>
                        </select>
                      </div>
                      <div className="relative mb-[25px] bg-white">
                        <svg
                          className="absolute top-1/2 -translate-y-1/2 z-[1] left-[20px] pointer-events-none"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.16602 12.8333H12.8327"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.7207 12.8333L1.74987 5.81583C1.74987 5.45999 1.91904 5.12169 2.19904 4.90002L6.28237 1.72085C6.70237 1.39418 7.29154 1.39418 7.71737 1.72085L11.8007 4.89418C12.0865 5.11585 12.2499 5.45416 12.2499 5.81583V12.8333"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.04232 6.41666H4.95898C4.47482 6.41666 4.08398 6.8075 4.08398 7.29166V12.8333H9.91732V7.29166C9.91732 6.8075 9.52648 6.41666 9.04232 6.41666Z"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.83398 9.47916V10.3542"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.125 4.375H7.875"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <select className="nice-select font-light w-full h-[45px] leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-primary border-opacity-60 rounded-[8px] pl-[40px] pr-[20px] py-[8px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] bg-white appearance-none cursor-pointer">
                          <option value="0">Property Type</option>
                          <option value="1">Property A</option>
                          <option value="2">Category B</option>
                        </select>
                      </div>
                      <div className="relative mb-[25px] bg-white">
                        <svg
                          className="absolute top-1/2 -translate-y-1/2 z-[1] left-[20px] pointer-events-none"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.78125 9.55323C5.78125 10.4132 6.44125 11.1066 7.26125 11.1066H8.93458C9.64792 11.1066 10.2279 10.4999 10.2279 9.75323C10.2279 8.9399 9.87458 8.65323 9.34792 8.46657L6.66125 7.53323C6.13458 7.34657 5.78125 7.0599 5.78125 6.24657C5.78125 5.4999 6.36125 4.89323 7.07458 4.89323H8.74792C9.56792 4.89323 10.2279 5.58657 10.2279 6.44657"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8 4V12"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.9987 14.6667C11.6806 14.6667 14.6654 11.6819 14.6654 8C14.6654 4.3181 11.6806 1.33333 7.9987 1.33333C4.3168 1.33333 1.33203 4.3181 1.33203 8C1.33203 11.6819 4.3168 14.6667 7.9987 14.6667Z"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <select className="nice-select font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-primary border-opacity-60 rounded-[8px] pl-[40px] pr-[20px] py-[8px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] bg-white appearance-none cursor-pointer">
                          <option selected value="0">
                            Price Range
                          </option>
                          <option value="1">1500 usd</option>
                          <option value="2">1600 usd</option>
                        </select>
                      </div>
                      <div className="relative mb-[25px] bg-white">
                        <svg
                          className="absolute top-1/2 -translate-y-1/2 z-[1] left-[20px] pointer-events-none"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.33268 4.66667H4.66602V9.33334H9.33268V4.66667Z"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.91602 12.8333C3.87852 12.8333 4.66602 12.0458 4.66602 11.0833V9.33333H2.91602C1.95352 9.33333 1.16602 10.1208 1.16602 11.0833C1.16602 12.0458 1.95352 12.8333 2.91602 12.8333Z"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.91602 4.66667H4.66602V2.91667C4.66602 1.95417 3.87852 1.16667 2.91602 1.16667C1.95352 1.16667 1.16602 1.95417 1.16602 2.91667C1.16602 3.87917 1.95352 4.66667 2.91602 4.66667Z"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.33398 4.66667H11.084C12.0465 4.66667 12.834 3.87917 12.834 2.91667C12.834 1.95417 12.0465 1.16667 11.084 1.16667C10.1215 1.16667 9.33398 1.95417 9.33398 2.91667V4.66667Z"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.084 12.8333C12.0465 12.8333 12.834 12.0458 12.834 11.0833C12.834 10.1208 12.0465 9.33333 11.084 9.33333H9.33398V11.0833C9.33398 12.0458 10.1215 12.8333 11.084 12.8333Z"
                            stroke="#0B2C3D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <select className="nice-select font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-primary border-opacity-60 rounded-[8px] pl-[40px] pr-[20px] py-[8px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] bg-white appearance-none cursor-pointer">
                          <option selected value="0">
                            Property Size
                          </option>
                          <option value="1">1500 squre fit</option>
                          <option value="2">1600 squre fit</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="block z-[1] before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:z-[-1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[30px] py-[12px] capitalize font-medium text-white text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:z-[-2] after:bg-primary after:rounded-md after:transition-all"
                      >
                        Search
                      </button>
                    </form>
                  </div>

                  <div className="mb-[60px]">
                    <h3 className="text-primary leading-none text-[24px] font-lora underline mb-[30px] font-medium">
                      Our Agents<span className="text-secondary">.</span>
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-x-[20px] mb-[-20px]">
                      {/* <!-- single team start --> */}
                      <div className="text-center group mb-[30px]">
                        <div className="relative z-[1] rounded-[6px_6px_0px_0px]">
                          <a
                            href="agent-details.html"
                            className="block relative before:absolute before:content-[''] before:inset-x-0 before:bottom-0 before:bg-[#016450] before:w-full before:h-[calc(100%_-_30px)] before:z-[-1] before:rounded-[6px_6px_0px_0px]"
                          >
                            <img
                              src="assets/images/team/person3.png"
                              className="w-full object-contain block mx-auto"
                              loading="lazy"
                              width="130"
                              height="154"
                              alt="Albert S. Smith"
                            />
                          </a>
                        </div>

                        <div className="bg-[#FFFDFC] drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)] rounded-[0px_0px_6px_6px] px-[10px] pt-[5px] pb-[15px] border-b-[6px] border-primary transition-all duration-700 group-hover:border-secondary">
                          <h3>
                            <a
                              href="agent-details.html"
                              className="font-lora text-[14px] text-primary hover:text-secondary"
                            >
                              Albert S. Smith
                            </a>
                          </h3>
                          <p className="font-light text-[12px] leading-none capitalize mt-[5px]">
                            Real Estate Agent
                          </p>
                        </div>
                      </div>
                      <div className="text-center group mb-[30px]">
                        <div className="relative z-[1] rounded-[6px_6px_0px_0px]">
                          <a
                            href="agent-details.html"
                            className="block relative before:absolute before:content-[''] before:inset-x-0 before:bottom-0 before:bg-[#016450] before:w-full before:h-[calc(100%_-_30px)] before:z-[-1] before:rounded-[6px_6px_0px_0px]"
                          >
                            <img
                              src="assets/images/team/person4.png"
                              className="w-full object-contain block mx-auto"
                              loading="lazy"
                              width="130"
                              height="154"
                              alt="Amelia Margaret"
                            />
                          </a>
                        </div>

                        <div className="bg-[#FFFDFC] drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)] rounded-[0px_0px_6px_6px] px-[10px] pt-[5px] pb-[15px] border-b-[6px] border-primary transition-all duration-700 group-hover:border-secondary">
                          <h3>
                            <a
                              href="agent-details.html"
                              className="font-lora text-[14px] text-primary hover:text-secondary"
                            >
                              Amelia Margaret
                            </a>
                          </h3>
                          <p className="font-light text-[12px] leading-none capitalize mt-[5px]">
                            Real Estate Broker
                          </p>
                        </div>
                      </div>

                      {/* <!-- single team end--> */}
                    </div>
                  </div>

                  <div className="mb-[60px]">
                    <h3
                      style={{ color: "#083AA9" }}
                      className="text-primary leading-none text-[24px] font-lora underline mb-[40px] font-medium"
                    >
                      Tags<span className="text-secondary">.</span>
                    </h3>
                    <ul
                      style={{ color: "#B2B2B2" }}
                      className="flex flex-wrap my-[-7px] mx-[-5px] font-light text-[12px]"
                    >
                      <li className="my-[7px] mx-[5px]">
                        <a
                          href="/#"
                          className="leading-none border border-[#E0E0E0] py-[8px] px-[10px] block rounded-[4px] hover:text-secondary"
                        >
                          Real Estate
                        </a>
                      </li>
                      <li className="my-[7px] mx-[5px]">
                        <a
                          href="/#"
                          className="leading-none border border-[#E0E0E0] py-[8px] px-[10px] block rounded-[4px] hover:text-secondary"
                        >
                          Appartment
                        </a>
                      </li>
                      <li className="my-[7px] mx-[5px]">
                        <a
                          href="/#"
                          className="leading-none border border-[#E0E0E0] py-[8px] px-[10px] block rounded-[4px] hover:text-secondary"
                        >
                          Sale Property
                        </a>
                      </li>
                      <li className="my-[7px] mx-[5px]">
                        <a
                          href="/#"
                          className="leading-none border border-[#E0E0E0] py-[8px] px-[10px] block rounded-[4px] hover:text-secondary"
                        >
                          Duplex
                        </a>
                      </li>
                      <li className="my-[7px] mx-[5px]">
                        <a
                          href="/#"
                          className="leading-none border border-[#E0E0E0] py-[8px] px-[10px] block rounded-[4px] hover:text-secondary"
                        >
                          Buy Property
                        </a>
                      </li>
                      <li className="my-[7px] mx-[5px]">
                        <a
                          href="/#"
                          className="leading-none border border-[#E0E0E0] py-[8px] px-[10px] block rounded-[4px] hover:text-secondary"
                        >
                          Houses
                        </a>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Popular Properties end -->

      <!-- News Letter section start --> */}
        <section className="py-[80px] lg:p-[90px] bg-primary relative">
          <div className="container">
            <div className="grid grid-cols-1">
              <div className="col-span">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="w-full lg:w-auto">
                    <h3 className="font-lora text-white text-[24px] sm:text-[30px] xl:text-[36px] leading-[1.277] mb-[10px]">
                      Are you a Home Owner?
                    </h3>
                    <p className="text-secondary leading-[1.5] tracking-[0.03em] mb-10">
                      Put your email address and get listed.
                    </p>
                    <form id="mc-form" action="#" className="relative w-full">
                      <input
                        id="mc-email"
                        className="font-light text-white leading-[1.75] opacity-100 border border-secondary w-full lg:w-[395px] xl:w-[495px] h-[60px] rounded-[10px] py-[15px] pl-[15px] pr-[15px] sm:pr-[135px] focus:border-white focus:outline-none border-opacity-60 placeholder:text-[#E2E2E2] bg-transparent"
                        type="text"
                        placeholder="Enter your email here..."
                      />
                      <button
                        id="mc-submit"
                        type="submit"
                        className="text-white font-medium text-[16px] leading-none tracking-[0.02em] bg-secondary py-[17px] px-[20px] mt-5 sm:mt-0 rounded-[10px] hover:bg-white hover:text-primary transition-all sm:absolute sm:right-[4px] sm:top-1/2 sm:-translate-y-1/2"
                      >
                        Get Listed
                      </button>
                    </form>
                    {/* <!-- mailchimp-alerts Start --> */}
                    <div className="mailchimp-alerts text-centre">
                      <div className="mailchimp-submitting"></div>
                      <div className="mailchimp-success text-green-400"></div>
                      <div className="mailchimp-error text-red-600"></div>
                    </div>
                    {/* <!-- mailchimp-alerts end --> */}
                  </div>
                  <div className="w-full hidden lg:block lg:w-auto mt-5 lg:mt-0">
                    <div className="relative mt-10 md:mt-0 lg:absolute lg:right-0 lg:bottom-0">
                      <img
                        className="hero_image lg:max-w-[550px] xl:max-w-[650px] 2xl:max-w-[714px]"
                        src="assets/images/newsletter/bg-1.png"
                        width="866"
                        height="879"
                        alt="hero"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- News Letter section End -->

      <!-- Footer Start --> */}
        <a
          id="scrollUp"
          className="w-12 h-12 rounded-full bg-primary text-white fixed right-5 bottom-16 flex flex-wrap items-center justify-center transition-all duration-300 z-10"
          href="/#"
          aria-label="scroll up"
        >
          <svg
            width="25"
            height="25"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M6.101 261.899L25.9 281.698c4.686 4.686 12.284 4.686 16.971 0L198 126.568V468c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12V126.568l155.13 155.13c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 35.515c-4.686-4.686-12.284-4.686-16.971 0L6.101 244.929c-4.687 4.686-4.687 12.284 0 16.97z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PropertyDetails;
