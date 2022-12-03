import React, { useState, useEffect, useContext, useMemo } from "react";
import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";
// import { propertyCollection } from "./propertyMetaData";
import BlockchainContext from "../contexts/BlockchainContext";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const PropertyListing = () => {
  const {
    web3,
    accounts,
    propNFTContract,
    morterContract,
    auctionContract,
    propNFTContractAddress,
    morterContractAddress,
    auctionContractAddress,
  } = useContext(BlockchainContext);
  let navigate = useNavigate();
  const [sportList, setSportList] = useState([]);
  const [tradingCompany, setTradingCompany] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  useEffect(() => {
    //console.log({ web3, accounts, propNFTContract, morterContract, auctionContract, propNFTContractAddress, morterContractAddress, auctionContractAddress });
    if (morterContract) fetchData();

    // get all data from covalent about all NFTs

    //var allproperties=[];
  }, [accounts]);

  useEffect(() => {
    //setSportList(propertyCollection);
  }, [sportList]);

  // console.log({ web3, accounts, propNFTContract, morterContract, auctionContract, propNFTContractAddress, morterContractAddress, auctionContractAddress });

  const fetchData = async () => {
    console.log({ morterContract });
    const totalPropertyCount = await morterContract.methods
      .propertycounter()
      .call();

    const tc = await morterContract.methods
    .tc()
    .call();
    setTradingCompany(tc);
    var totalPropertyCountInt = parseInt(totalPropertyCount);
    const networkId = await web3.eth.net.getId();
    var allproperties = [];
    var myHeaders = new Headers();
    //console.log(process.env.REACT_APP_COVALENT_API_KEY);
    const COVALENT_KEY = process.env.REACT_APP_COVALENT_API_KEY;
    console.log({ COVALENT_KEY });
    var authenticationHeader = authenticateUser(COVALENT_KEY, "");
    console.log({ authenticationHeader });
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authenticationHeader);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    for (var i = 0; i < totalPropertyCount; i++) {
      var result;
      var res;
      try {
        result = await fetch(
          `https://api.covalenthq.com/v1/${networkId}/tokens/${propNFTContractAddress}/nft_metadata/${i}/`,
          requestOptions
        ).then((response) => response.text());
        var resultJSON = await JSON.parse(result);
        console.log({ resultJSON });
        var metadataURI = resultJSON.data.items[0].nft_data[0].token_url;
        console.log({ metadataURI });
        var ipfsLocation = metadataURI.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );
        var currProperty = await axios.get(ipfsLocation);
        var currentPropertyData = currProperty.data;

        //get property data from morter contract
        var propertyData = await morterContract.methods.allproperties(i).call();
        var auctionData = await auctionContract.methods.allAuctions(i).call();
        console.log({ propertyData });
        console.log({ auctionData });
        console.log({ currentPropertyData });
        currentPropertyData["nftContract"] = propNFTContractAddress;
        currentPropertyData["nftId"] = i;
        let finalPropertyData = Object.assign(
          propertyData,
          auctionData,
          currentPropertyData
        );
        allproperties.push(finalPropertyData);
      } catch (error) {
        console.log("error", error);
      }
    }
    setSportList(allproperties);
    console.log({ allproperties });
    console.log(JSON.stringify(allproperties));
  };

  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (selectedCategory===0) {
      return sportList.filter((item) => parseInt(item.status) === 100 || parseInt(item.status)===200);
    }
    else if(selectedCategory===100)
    {
      return sportList.filter((item) => parseInt(item.status) === selectedCategory);
    }
    else if(selectedCategory===200)
    {
      return sportList.filter((item) => parseInt(item.status) === selectedCategory);
    }
    else if(selectedCategory===300)
    {
      if(accounts[0].toLowerCase()===tradingCompany.toLowerCase())
      {
        return sportList.filter((item) => parseInt(item.status) === selectedCategory);
      }
    }
    else if(selectedCategory===400)
    {
      return sportList.filter((item) =>
       
        item.mortgager.toLowerCase() === accounts[0].toLowerCase()
      );
    }
    return [];
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [selectedCategory, sportList]);

  console.log({sportList,filteredList,selectedCategory});

  function handleCategoryChange(event) {
    setSelectedCategory(parseInt(event.target.value));
  }

  function authenticateUser(user, password) {
    var token = user + ":" + password;
    // Base64 Encoding -> btoa
    var hash = btoa(token);

    return "Basic " + hash;
  }

  return (
    <div>
      <div className="font-karla text-body text-tiny">
        <div className="overflow-hidden">
          <section
            className="bg-no-repeat bg-center bg-cover bg-[#E9F1FF] h-[350px] lg:h-[513px] flex flex-wrap items-center relative before:absolute before:inset-0 before:content-[''] before:bg-[#000000] before:opacity-[70%]"
            style={{
              backgroundImage: "url('assets/images/breadcrumb/bg-1.png')",
            }}
          >
            <div className="container">
              <div className="grid grid-cols-12">
                <div className="col-span-12">
                  <div className="max-w-[600px]  mx-auto text-center text-white relative z-[1]">
                    <div className="mb-5">
                      <span className="text-base block">Our Properties</span>
                    </div>
                    <h1
                      className="font-lora text-[36px] sm:text-[50px] md:text-[68px] lg:text-[50px] leading-tight xl:text-2xl font-medium"
                      style={{ fontFamily: "Georgia" }}
                    >
                      Properties
                    </h1>

                    <p
                      className="text-base mt-5 max-w-[500px] mx-auto text-center"
                      style={{ fontSize: "22px" }}
                    >
                      Huge number of propreties availabe here for buy and sell
                      also you can find here co-living property as you like
                    </p>
                    <button
                      style={{ marginTop: "1rem", marginLeft: "15rem" }}
                      className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white hidden sm:block text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
                      onClick={() => navigate("/add-property")}
                    >
                      Add Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Hero section end -->

        <!-- Popular Properties start --> */}
          <section className="popular-properties py-[80px] lg:py-[120px]">
            <div className="container">
              <div className="filter-container">
                <div
                  style={{
                    marginRight: "1rem",
                    fontSize: "19px",
                    fontWeight: "500",
                    color: "#1C658C",
                  }}
                >
                  Filter by Category:
                </div>
                <div>
                  <select
                    style={{
                      width: "10rem",
                      borderRadius: "10px",
                      height: "2.5rem",
                    }}
                    name="category-list"
                    id="category-list"
                    onChange={handleCategoryChange}
                  >
                    <option value="0">All</option>
                    <option value="100">Properties listed for sell</option>
                    <option value="200">Mortgage Initiated NFTs</option>
                    <option value="300">Risk Free Investors Invested</option>
                    <option value="400">View your leveraged properties</option>
                  </select>
                </div>
              </div>
              <br />
              <br />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                {filteredList.map((element, index) => (
                  <PropertyCard data={element} key={index} />
                ))}{" "}
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
                          alt="hero "
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
    </div>
  );
};

export default PropertyListing;
