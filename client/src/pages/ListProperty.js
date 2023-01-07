import React, { useEffect, useState, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import BlockchainContext from "../contexts/BlockchainContext";
import dotenv from "dotenv";
import { useLocation, Navigate } from "react-router-dom";
import axios from "axios";
dotenv.config();
require("dotenv").config();

const ListProperty = () => {
  let location = useLocation();
  let isExisting = location.state ? location.state.isExisting : false;
  let data = location.state ? location.state.data : null;

  const [image, setImage] = useState();
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
  const [currentAccount, setCurrentAccount] = useState("");
  const [metaverseName, setMetaverseName] = useState("");
  const [propertyTitle, setPropertyTitle] = useState("");
  const [propertyPrice, setPropertyPrice] = useState("0");
  const [propertyDescription, setPropertyDescription] = useState("");
  const [coordinateX, setCoordinateX] = useState(0);
  const [coordinateY, setcoordinateY] = useState(0);
  const [propertyType, setPropertyType] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [videoBlob, setVideoBlob] = useState("");

  useEffect(() => {
    console.log("from add property", data, isExisting);

    console.log({
      web3,
      accounts,
      propNFTContract,
      morterContract,
      auctionContract,
      propNFTContractAddress,
      morterContractAddress,
      auctionContractAddress,
    });
    const init = async () => {
      const accountsNow = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accountsNow[0]);
    };
    init();

    if (isExisting) {
      console.log(typeof data.price, data.price);
      setMetaverseName(data.metaverseName);
      setPropertyTitle(data.name);
      setPropertyPrice((parseInt(data.price) / Math.pow(10, 18)).toString());
      setPropertyDescription(data.description);
      setCoordinateX(data.coordinateX);
      setcoordinateY(data.coordinateY);
      setPropertyType(data.propertyType);
      setPropertyLocation(data.propertyLocation);
    }

    const listener = (accs) => {
      setCurrentAccount(accs[0]);
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", listener);
    // eslint-disable-next-line
  }, []);

  const uploadFileToIPFS = async (fileBlob) => {
    const apiKey = process.env.REACT_APP_NFT_STORAGE_API_KEY;

    var config = {
      method: "post",
      url: "https://api.nft.storage/upload",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "image/jpeg",
      },
      data: fileBlob,
    };

    const fileUploadResponse = await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });

    return fileUploadResponse;
  };

  const mintNFT = async () => {
    // console.log(videoBlob);
    // console.log(metaverseName);
    // console.log(propertyType);
    // console.log(propertyTitle);
    // console.log(propertyPrice);
    // console.log(propertyDescription);
    // console.log(coordinateX);
    // console.log(coordinateY);
    let priceInWei = await web3.utils
      .toWei(propertyPrice.toString(), "ether")
      .toString();

    console.log(
      priceInWei,
      web3.utils.toWei(propertyPrice.toString(), "ether").toString()
    );
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(image);
    reader.onloadend = async () => {
      const res = Buffer(reader.result);
      var b = Buffer.from(res);
      let ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
      console.log(res);
      console.log(b);
      console.log(ab);

      const imageblob = new Blob([ab], { type: "image/jpg" });
      // Upload image to IPFS
      const imageUploadResponse = await uploadFileToIPFS(imageblob);
      console.log({ imageUploadResponse });
      const imageIPFS = imageUploadResponse["value"]["cid"];
      const imageLink = `https://alchemy.mypinata.cloud/ipfs/${imageIPFS}/`;

      //upload video to ipfs
      let videoLink;
      if (videoBlob) {
        const videoUploadResponse = await uploadFileToIPFS(videoBlob);
        console.log({ videoUploadResponse });
        const videoIPFS = videoUploadResponse["value"]["cid"];
        videoLink = `https://alchemy.mypinata.cloud/ipfs/${videoIPFS}/`;
      }
      const metadata = {
        name: propertyTitle,
        description: propertyDescription,
        image: imageLink,
        metaverseName: metaverseName,
        propertyType: propertyType,
        propertyPrice: priceInWei,
        coordinateX: coordinateX,
        coordinateY: coordinateY,
        creator: currentAccount,
        propertyLocation: propertyLocation,
        video: videoLink,
        usps: [
          "Virtual Property",
          "Secure",
          "Near to beach",
          "Near to shopping mall",
          "Inbuilt casino",
        ],
      };

      //upload metadata to IPFS
      const metadataUploadResponse = await uploadFileToIPFS(
        JSON.stringify(metadata)
      );
      // console.log({ metadataUploadResponse });
      const metadataIPFS = metadataUploadResponse["value"]["cid"];
      const metadataLink = `ipfs://${metadataIPFS}/`;

      //First mint nft from propNFT
      //approve morter and auction contract for this nft
      //List the nft via morter list

      await propNFTContract.methods
        .mintandApproveNFT(accounts[0], metadataLink.toString())
        .send({
          from: currentAccount,
        })
        .then(async (result) => {
          // console.log({ result });
          var tokenId = await propNFTContract.methods._tokenIds().call();
          var currentTokenId = parseInt(tokenId) - 1;
          await propNFTContract.methods
            .approveContract(morterContractAddress, currentTokenId)
            .send({
              from: currentAccount,
            });

          return currentTokenId;
        })
        .then((tokenId) => {
          //console.log({ tokenId });
          console.log(priceInWei);
          morterContract.methods.listProperty(priceInWei, tokenId).send({
            from: currentAccount,
          });
        });
    };
  };

  const captureVideoFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    var blob = new Blob([file], { type: "video/mp4" });
    setVideoBlob(blob);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      console.log("image set");
    }
  };

  // console.log(process.env.REACT_APP_TRADING_COMPANY_1, accounts);
  // if (accounts.length == 0) return <CircularProgress size={70} />;

  // if (
  //   !isExisting &&
  //   process.env.REACT_APP_TRADING_COMPANY_1.toLowerCase() !==
  //     accounts[0].toLowerCase() &&
  //   process.env.REACT_APP_TRADING_COMPANY_2.toLowerCase() !==
  //     accounts[0].toLowerCase()
  // )
  //   return <Navigate to="/" />;
  console.log(
    "price",
    propertyPrice,
    isExisting
      ? (parseInt(propertyPrice) / Math.pow(10, 18)).toString()
      : propertyPrice.toString()
  );

  return (
    <div className="font-karla text-body text-tiny">
      <div className="overflow-hidden">
        <section
          className="bg-no-repeat bg-center bg-cover bg-[#FFF6F0] h-[350px] lg:h-[513px] flex flex-wrap items-center relative before:absolute before:inset-0 before:content-[''] before:bg-[#000000] before:opacity-[70%]"
          style={{
            backgroundImage:
              "url('assets/images/metaverseImages/metaverseImages/shoppingComplex.jpg')",
          }}
        >
          <div className="container">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <div className="max-w-[700px]  mx-auto text-center text-white relative z-[1]">
                  <h1 className="font-lora text-[32px] sm:text-[50px] md:text-[68px] lg:text-[50px] leading-tight xl:text-2xl font-medium">
                    Add Property
                  </h1>
                  <p className="text-base mt-5 max-w-[500px] mx-auto text-center">
                    Huge number of propreties availabe here for buy and sell
                    also you can find here co-living property as you liked
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {accounts.length === 0 ? (
          <CircularProgress size={70} />
        ) : !isExisting &&
          process.env.REACT_APP_TRADING_COMPANY_1.toLowerCase() !==
            accounts[0].toLowerCase() &&
          process.env.REACT_APP_TRADING_COMPANY_2.toLowerCase() !==
            accounts[0].toLowerCase() ? (
          <Navigate to="/" />
        ) : (
          <div className="pt-[80px] lg:pt-[120px] add-properties-form-select">
            <div className="container">
              <form action="#">
                <div className="grid grid-cols-12 gap-x-[30px]">
                  <div className="mb-[45px] col-span-12 md:col-span-6">
                    <label
                      className="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                      htmlFor="property-title"
                      style={{ color: "#11468F" }}
                    >
                      {" "}
                      Metaverse Name
                    </label>
                    <input
                      id="Location"
                      className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                      type="text"
                      placeholder="Metaverse Name"
                      style={{ fontSize: "20px" }}
                      onChange={(e) => setMetaverseName(e.target.value)}
                      required
                      value={metaverseName}
                      disabled={isExisting ? true : false}
                    />
                  </div>
                  <div className="mb-[45px] col-span-12 md:col-span-6">
                    <label
                      className="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                      htmlFor="PropertyType1"
                      style={{ color: "#11468F" }}
                    >
                      Property Type
                    </label>

                    <div className="mb-[45px] col-span-12 md:col-span-6">
                      <input
                        className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                        type="text"
                        placeholder="Property Type"
                        style={{ fontSize: "20px" }}
                        onChange={(e) => setPropertyType(e.target.value)}
                        disabled={isExisting ? true : false}
                        value={propertyType}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-x-[30px]">
                  <div className="mb-[45px] col-span-12 md:col-span-8">
                    <label
                      className="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                      htmlFor="property-title"
                      style={{ color: "#11468F" }}
                    >
                      {" "}
                      Property Title
                    </label>
                    <input
                      id="property-title"
                      className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                      type="text"
                      placeholder="Property Title"
                      style={{ fontSize: "20px" }}
                      onChange={(e) => setPropertyTitle(e.target.value)}
                      disabled={isExisting ? true : false}
                      value={propertyTitle}
                    />
                  </div>

                  <div className="mb-[45px] col-span-12 md:col-span-4">
                    <label
                      className="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                      htmlFor="Price"
                      style={{ color: "#11468F" }}
                    >
                      Price(in MATIC)
                      <br />
                      <span style={{ color: "red" }}>
                        (0 if you want to list as a drop NFT)
                      </span>
                    </label>
                    <input
                      id="property-price"
                      style={{ fontSize: "20px" }}
                      className=" w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                      type="text"
                      placeholder="NFT Price"
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-x-[30px]">
                  <div className="mb-[45px] col-span-12">
                    <label
                      className="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                      htmlFor="textarea"
                      style={{ color: "#11468F" }}
                    >
                      Property Description
                    </label>
                    <textarea
                      className="h-[196px] xl:h-[360px] font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] resize-none"
                      name="textarea"
                      id="textarea"
                      cols="30"
                      rows="10"
                      placeholder="Write you description here"
                      style={{ fontSize: "20px" }}
                      onChange={(e) => setPropertyDescription(e.target.value)}
                      disabled={isExisting ? true : false}
                      value={propertyDescription}
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-x-[30px]">
                  <div className="col-span-12">
                    <label
                      className="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                      htmlFor="Location"
                      style={{ color: "#11468F" }}
                    >
                      Coordinates
                    </label>
                  </div>

                  <div className="mb-[45px] col-span-12 md:col-span-6">
                    <input
                      id="Location"
                      className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                      type="text"
                      placeholder="Coordinate-X"
                      style={{ fontSize: "20px" }}
                      onChange={(e) => setCoordinateX(e.target.value)}
                      value={coordinateX}
                      disabled={isExisting ? true : false}
                    />
                  </div>

                  <div className="mb-[45px] col-span-12 md:col-span-6">
                    <input
                      className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                      type="text"
                      placeholder="Coordinate-Y"
                      style={{ fontSize: "20px" }}
                      onChange={(e) => setcoordinateY(e.target.value)}
                      value={coordinateY}
                      disabled={isExisting ? true : false}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-x-[30px]">
                  <div className="mb-[45px] col-span-12">
                    <label
                      style={{ color: "#11468F" }}
                      className="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                    >
                      Metaverse Hyperlink
                    </label>
                    <input
                      id="Location"
                      className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                      type="text"
                      placeholder="Metaverse Hyperlink"
                      style={{ fontSize: "20px" }}
                      onChange={(e) => setPropertyLocation(e.target.value)}
                      value={propertyLocation}
                      disabled={isExisting ? true : false}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-x-[30px]">
                  <div className="mb-[45px] col-span-12">
                    <label
                      style={{ color: "#11468F" }}
                      className="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                    >
                      Add Image
                    </label>
                    <div
                      style={{ border: "2px solid white" }}
                      className="py-[35px] px-[15px] flex flex-wrap items-center justify-center text-center border border-[#1B2D40] border-opacity-60 rounded-[8px]"
                    >
                      <div className="relative">
                        <input
                          className="absolute inset-0 z-[0] opacity-0 w-full"
                          type="file"
                          name="Images"
                          id="Images"
                          onChange={handleImageChange}
                          disabled={isExisting ? true : false}
                        />
                        <label
                          htmlFor="Images"
                          className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[30px] py-[12px] capitalize font-medium text-white text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all flex flex-wrap items-center justify-center cursor-pointer"
                        >
                          {" "}
                          <svg
                            className="mr-[5px]"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.5853 8.39666C21.4868 8.25357 21.3542 8.1373 21.1995 8.05834C21.0448 7.97938 20.8729 7.94023 20.6992 7.94444H6.82698C6.53428 7.95684 6.25076 8.05025 6.00799 8.21425C5.76523 8.37825 5.57275 8.60641 5.45198 8.87333C5.44998 8.90181 5.44998 8.9304 5.45198 8.95888L3.66753 15.2778V4.27777H7.63365L9.22865 6.47166C9.28554 6.54951 9.36004 6.6128 9.44607 6.65635C9.53211 6.69989 9.62722 6.72246 9.72365 6.72221H19.5564C19.5564 6.39806 19.4277 6.08718 19.1984 5.85797C18.9692 5.62876 18.6584 5.49999 18.3342 5.49999H10.0353L8.62365 3.55666C8.50987 3.40095 8.36085 3.27438 8.18879 3.18728C8.01673 3.10019 7.8265 3.05505 7.63365 3.05555H3.66753C3.34338 3.05555 3.0325 3.18432 2.80329 3.41353C2.57408 3.64274 2.44531 3.95361 2.44531 4.27777V18.1439C2.45485 18.3638 2.55062 18.5711 2.71189 18.721C2.87316 18.8708 3.08695 18.9511 3.30698 18.9444H18.542C18.6783 18.9499 18.8126 18.9095 18.9234 18.8297C19.0341 18.75 19.115 18.6355 19.1531 18.5044L21.7136 9.27666C21.7614 9.12999 21.7747 8.97428 21.7524 8.82164C21.7302 8.66901 21.673 8.52357 21.5853 8.39666ZM18.0592 17.7222H4.21753L6.58865 9.28277C6.64651 9.20822 6.72869 9.15632 6.82087 9.1361H20.467L18.0592 17.7222Z"
                              fill="#FAFAFA"
                            />
                          </svg>{" "}
                          Add Image
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-x-[30px]">
                  <div className="mb-[45px] col-span-12">
                    <label
                      style={{ color: "#11468F" }}
                      className="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                    >
                      Add Video
                    </label>
                    <div
                      style={{ border: "2px solid white" }}
                      className="py-[35px] px-[15px] flex flex-wrap items-center justify-center text-center border border-[#1B2D40] border-opacity-60 rounded-[8px]"
                    >
                      <div className="relative">
                        <input
                          className="absolute inset-0 z-[0] opacity-0 w-full"
                          type="file"
                          name="Videos"
                          id="Videos"
                          onChange={captureVideoFile}
                          disabled={isExisting ? true : false}
                        />
                        <label
                          htmlFor="Videos"
                          className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[30px] py-[12px] capitalize font-medium text-white text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all flex flex-wrap items-center justify-center cursor-pointer"
                        >
                          {" "}
                          <svg
                            className="mr-[5px]"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.5853 8.39666C21.4868 8.25357 21.3542 8.1373 21.1995 8.05834C21.0448 7.97938 20.8729 7.94023 20.6992 7.94444H6.82698C6.53428 7.95684 6.25076 8.05025 6.00799 8.21425C5.76523 8.37825 5.57275 8.60641 5.45198 8.87333C5.44998 8.90181 5.44998 8.9304 5.45198 8.95888L3.66753 15.2778V4.27777H7.63365L9.22865 6.47166C9.28554 6.54951 9.36004 6.6128 9.44607 6.65635C9.53211 6.69989 9.62722 6.72246 9.72365 6.72221H19.5564C19.5564 6.39806 19.4277 6.08718 19.1984 5.85797C18.9692 5.62876 18.6584 5.49999 18.3342 5.49999H10.0353L8.62365 3.55666C8.50987 3.40095 8.36085 3.27438 8.18879 3.18728C8.01673 3.10019 7.8265 3.05505 7.63365 3.05555H3.66753C3.34338 3.05555 3.0325 3.18432 2.80329 3.41353C2.57408 3.64274 2.44531 3.95361 2.44531 4.27777V18.1439C2.45485 18.3638 2.55062 18.5711 2.71189 18.721C2.87316 18.8708 3.08695 18.9511 3.30698 18.9444H18.542C18.6783 18.9499 18.8126 18.9095 18.9234 18.8297C19.0341 18.75 19.115 18.6355 19.1531 18.5044L21.7136 9.27666C21.7614 9.12999 21.7747 8.97428 21.7524 8.82164C21.7302 8.66901 21.673 8.52357 21.5853 8.39666ZM18.0592 17.7222H4.21753L6.58865 9.28277C6.64651 9.20822 6.72869 9.15632 6.82087 9.1361H20.467L18.0592 17.7222Z"
                              fill="#FAFAFA"
                            />
                          </svg>{" "}
                          Add Video
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* <!-- create agency End--> */}
        <div align="center">
          <div className="container">
            <button
              type="submit"
              onClick={mintNFT}
              className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[40px] py-[15px] capitalize font-medium text-white text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
            >
              {isExisting ? <>Sell property</> : <>Add Property</>}
            </button>
          </div>
        </div>
        <br />

        {/* <!-- Footer End --> */}
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

export default ListProperty;
