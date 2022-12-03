import React, { useEffect, useState, useContext } from "react";
import Web3 from "web3";
import BlockchainContext from "../contexts/BlockchainContext";
function Homepage() {
  const [account, setAccounts] = useState("");
  const { web3, accounts, propNFTContract, morterContract, auctionContract } =
    useContext(BlockchainContext);
  useEffect(() => {
    console.log({
      web3,
      accounts,
      propNFTContract,
      morterContract,
      auctionContract,
    });
  }, []);
  return (
    <div className="root">
      <div className="font-karla text-body text-tiny">
        <div className="overflow-hidden">
          {/* <!-- offcanvas-mobile-menu end -->
          <!-- Header end --> */}

          <div className="relative">
            {/* <!-- Hero section start --> */}
            <h1>{account}</h1>
            <section className="bg-[#FFF6F0] relative before:absolute before:inset-0 before:content-[''] before:bg-[#060606] before:opacity-[50%]">
              <div className="lg:h-[720px] xl:h-[830px]">
                <img
                  className="w-full h-full min-h-[360px] md:min-h-[540px] object-cover"
                  src="assets/images/metaverseImages/metaverseImages/desert.jpg"
                  alt="hero "
                />
                <div className="absolute right-0 left-0 lg:top-[110px] xl:top-[155px] top-[50%] -translate-y-1/2 lg:translate-y-0">
                  <div className="container">
                    <div className="grid grid-cols-12">
                      <div className="col-span-12">
                        <div className="lg:max-w-[500px] xl:max-w-[600px] text-center ml-auto mr-auto lg:mb-[75px]">
                          <span className="text-base text-white block mb-5">
                            A new way to find Properties
                          </span>
                          <h1 className="font-lora text-white text-[36px] sm:text-[50px] md:text-[68px] lg:text-[50px] leading-tight xl:text-2xl title">
                            Buy, Sell, Mortgage Or Auction Luxury Properties
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Hero section end -->
  
              <!-- Addvanced search tab start --> */}

            <div className="container mt-[80px] md:mt-[120px] lg:mt-[0px] z-[2] pl-[60px] lg:pl-[50px] 2xl::pl-[0px] lg:absolute lg:left-0 lg:right-0 lg:top-[100%] lg:translate-y-[-396px]">
              <div className="grid grid-cols-12">
                <div className="col-span-12">
                  <div className="relative text-center"></div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Addvanced search tab end -->
  
          <!-- Brand section Start--> */}

          <section className="about-section lg:pt-[55px]">
            <div className="container">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-12 lg:col-span-6">
                  <span className="text-secondary text-tiny inline-block mb-2">
                    Why Choose us
                  </span>
                  <h2
                    style={{ color: "#11468F" }}
                    className="font-lora text-primary text-[24px] sm:text-[30px] leading-[1.277] xl:text-xl capitalize mb-5 lg:mb-16 font-medium max-w-[500px]"
                  >
                    We Provide Latest Properties for our valuable Clients.
                    <span className="text-secondary">.</span>
                  </h2>
                  <div className="scene" data-relative-input="true">
                    <img
                      data-depth="0.1"
                      src="assets/images/about/about7.png"
                      className=""
                      loading="lazy"
                      width="729"
                      height="663"
                      alt="about "
                    />
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 lg:pl-[70px]">
                  <p className="max-w-[448px] " style={{ fontWeight: "700" }}>
                    Huge number of propreties availabe here for buy, sell and
                    Rent. Also you find here co-living property so lots
                    opportunity you have to choose here and enjoy huge discount.{" "}
                  </p>

                  <div className="-mb-10 mt-12 xl:mt-[70px] 2xl:mt-[100px]">
                    <div className="flex flex-wrap mb-5 lg:mb-10">
                      <img
                        src="assets/images/icon/doller.png"
                        className="self-start mr-5"
                        loading="lazy"
                        width="50"
                        height="50"
                        alt="about "
                      />
                      <div className="flex-1">
                        <h3
                          style={{ color: "#11468F" }}
                          className="font-lora text-primary text-[22px] xl:text-lg capitalize mb-2"
                        >
                          Budget Friendly
                        </h3>
                        <p
                          className="max-w-[315px]"
                          style={{ fontWeight: "700" }}
                        >
                          Properties are most budget friendly so you have
                          opportunity to find the best one
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-5 lg:mb-10">
                      <img
                        src="assets/images/icon/location.png"
                        className="self-start mr-5"
                        loading="lazy"
                        width="50"
                        height="50"
                        alt="about "
                      />
                      <div className="flex-1">
                        <h3
                          style={{ color: "#11468F" }}
                          className="font-lora text-primary text-[22px] xl:text-lg capitalize mb-2"
                        >
                          Prime Location
                        </h3>
                        <p
                          className="max-w-[315px]"
                          style={{ fontWeight: "700" }}
                        >
                          Properties are most budget friendly so you have
                          opportunity to find the best one
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-5 lg:mb-10">
                      <img
                        src="assets/images/icon/trusted.png"
                        className="self-start mr-5"
                        loading="lazy"
                        width="50"
                        height="50"
                        alt="about"
                      />
                      <div className="flex-1">
                        <h3
                          style={{ color: "#11468F" }}
                          className="font-lora text-primary text-[22px] xl:text-lg capitalize mb-2"
                        >
                          Trusted by Thousand
                        </h3>
                        <p
                          className="max-w-[315px] secondary"
                          style={{ fontWeight: "700" }}
                        >
                          Properties are most budget friendly so you have
                          opportunity to find the best one
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Popular Properties end -->
  
  
          <!-- Featured Properties Start --> */}

          <section className="py-[80px] lg:p-[90px] bg-primary relative">
            <div className="container">
              <div className="grid grid-cols-1">
                <div className="col-span">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="w-full lg:w-auto">
                      <h3
                        className="font-lora text-white text-[24px] sm:text-[30px] xl:text-[36px] leading-[1.277] mb-[10px] "
                        style={{ color: "#11468F" }}
                      >
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
                          alt="her"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- News Letter section End -->*/}

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
    </div>
  );
}

export default Homepage;
