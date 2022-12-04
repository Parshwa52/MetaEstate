import React, { useEffect, useState, useContext } from "react";
import BlockchainContext from "../contexts/BlockchainContext";
//import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js';
import { NFTStorage, File } from "nft.storage";
import dotenv from "dotenv";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";

dotenv.config();
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
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [propertyDescription, setPropertyDescription] = useState("");
  const [coordinateX, setCoordinateX] = useState(0);
  const [coordinateY, setcoordinateY] = useState(0);
  const [propertyType, setPropertyType] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");

  // eslint-disable-next-line no-undef
  // const { provider, address } = useWeb3AuthContext();
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
  // Initialize the Smart Account

  // Init Smart account instance

  const makeManyTxs = async () => {
    const walletProvider = new web3.providers.Web3Provider(window.ethereum);

    // Initialize the Smart Account

    let options = {
      activeNetworkId: ChainId.POLYGON_MUMBAI,
      supportedNetworksIds: [
        ChainId.GOERLI,
        ChainId.POLYGON_MAINNET,
        ChainId.POLYGON_MUMBAI,
      ],
    };

    let smartAccount = new SmartAccount(walletProvider, options);
    smartAccount = await smartAccount.init();
    const txs = [];

    let tokenId = await propNFTContract.methods._tokenIds().call();
    //console.log({ morterContractAddress });
    //console.log({ tokenId });
    let currentTokenId = parseInt(tokenId) - 1;

    const interface1 = new ethers.utils.Interface([
      "function approveContract(address contractToApprove,uint tokenId)",
    ]);
    const data1 = interface1.encodeFunctionData("approveContract", [
      propNFTContractAddress.toString(),
      parseInt(currentTokenId),
    ]);

    const tx1 = {
      to: interface1,
      data: data1,
    };

    txs.push(tx1);

    var priceInWei = await web3.utils
      .toBN(web3.utils.toWei(propertyPrice.toString(), "ether"))
      .toString();

    const interface2 = new ethers.utils.Interface([
      "function listProperty(uint256 _price, uint256 tokenId)",
    ]);
    const data2 = interface2.encodeFunctionData("listProperty", [
      parseInt(priceInWei),
      parseInt(currentTokenId),
    ]);

    const tx2 = {
      to: interface2,
      data: data2,
    };

    txs.push(tx2);

    const response = await smartAccount.sendGaslessTransactionBatch({
      transactions: txs,
    });
    console.log(response);
    console.log(`Transaction sent: ${response.hash}`);
  };

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
      setMetaverseName(data.metaverseName);
      setPropertyTitle(data.name);
      setPropertyPrice(data.price);
      setPropertyDescription(data.description);
      setCoordinateX(data.coordinateX);
      setcoordinateY(data.coordinateY);
      setPropertyType(data.propertyType);
      setPropertyLocation(data.propertyLocation);
    }

    const listener = (accs) => {
      setCurrentAccount(accs[0]);
    };

    window.ethereum.on("accountsChanged", listener);
  }, []);

  const mintNFT = async () => {
    const apiKey = process.env.REACT_APP_NFT_STORAGE_API_KEY;
    //var url = 'https://api.nft.storage/upload';
    //var headers = {'Authorization': 'Bearer ' + apiKey};

    const client = new NFTStorage({ token: apiKey });
    console.log({ metaverseName });
    console.log({ propertyType });
    console.log({ propertyTitle });
    console.log({ propertyPrice });
    console.log({ propertyDescription });
    console.log({ coordinateX });
    console.log({ coordinateY });
    var priceInWei = await web3.utils
      .toBN(web3.utils.toWei(propertyPrice.toString(), "ether"))
      .toString();
    console.log({ priceInWei });

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(image);
    reader.onloadend = async () => {
      const res = Buffer(reader.result);
      var b = Buffer.from(res);
      let ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
      console.log({ res });
      console.log({ b });
      console.log({ ab });

      const imageblob = new Blob([ab], { type: "image/jpg" });

      const metadata = await client.store({
        name: propertyTitle,
        description: propertyDescription,
        image: imageblob,
        metaverseName: metaverseName,
        propertyType: propertyType,
        propertyPrice: priceInWei,
        coordinateX: coordinateX,
        coordinateY: coordinateY,
        creator: currentAccount,
        category: 100,
        propertyLocation: propertyLocation,
        usps: [
          "Virtual Property",
          "Secure",
          "Near to beach",
          "Near to shopping mall",
          "Inbuilt casino",
        ],
      });

      console.log(metadata.url);
      //console.log({ currentAccount });

      //First mint nft from propNFT
      //approve morter and auction contract for this nft
      //List the nft via morter list
      await propNFTContract.methods
        .mintandApproveNFT(accounts[0], metadata.url.toString())
        .send({
          from: currentAccount,
        })
        .then(async (result) => {
          console.log({ result });
          //console.log(propNFTContract.methods._tokenIds().call());
          var tokenId = await propNFTContract.methods._tokenIds().call();
          //console.log({ morterContractAddress });
          //console.log({ tokenId });
          var currentTokenId = parseInt(tokenId) - 1;
          //console.log({ currentTokenId });
          await propNFTContract.methods
            .approveContract(morterContractAddress, currentTokenId)
            .send({
              from: currentAccount,
            });

          return currentTokenId;
        })
        .then((tokenId) => {
          //console.log({ tokenId });
          morterContract.methods.listProperty(priceInWei, tokenId).send({
            from: currentAccount,
          });
        })
        .then(async (result) => {
          console.log({ result });
          //console.log(propNFTContract.methods._tokenIds().call());
          var tokenId = await propNFTContract.methods._tokenIds().call();
          //console.log({ morterContractAddress });
          //console.log({ tokenId });
          var currentTokenId = parseInt(tokenId) - 1;
          //console.log({ currentTokenId });
          await propNFTContract.methods
            .approveContract(morterContractAddress, currentTokenId)
            .send({
              from: currentAccount,
            });

          return currentTokenId;
        })
        .then((tokenId) => {
          //console.log({ tokenId });
          morterContract.methods.listProperty(priceInWei, tokenId).send({
            from: currentAccount,
          });
        });
    };
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      console.log("image set");
      console.log({ file });
    }
  };
  return (
    <div class="font-karla text-body text-tiny">
      <div class="overflow-hidden">
        <section
          class="bg-no-repeat bg-center bg-cover bg-[#FFF6F0] h-[350px] lg:h-[513px] flex flex-wrap items-center relative before:absolute before:inset-0 before:content-[''] before:bg-[#000000] before:opacity-[70%]"
          style={{
            backgroundImage:
              "url('assets/images/metaverseImages/metaverseImages/shoppingComplex.jpg')",
          }}
        >
          <div class="container">
            <div class="grid grid-cols-12">
              <div class="col-span-12">
                <div class="max-w-[700px]  mx-auto text-center text-white relative z-[1]">
                  <div class="mb-5">
                    <span class="text-base block">{currentAccount}</span>
                  </div>
                  <h1 class="font-lora text-[32px] sm:text-[50px] md:text-[68px] lg:text-[50px] leading-tight xl:text-2xl font-medium">
                    Add Property
                  </h1>
                  <p class="text-base mt-5 max-w-[500px] mx-auto text-center">
                    Huge number of propreties availabe here for buy and sell
                    also you can find here co-living property as you liked
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="pt-[80px] lg:pt-[120px] add-properties-form-select">
          <div class="container">
            <form action="#">
              <div class="grid grid-cols-12 gap-x-[30px]">
                <div class="mb-[45px] col-span-12 md:col-span-6">
                  <label
                    class="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                    for="property-title"
                  >
                    {" "}
                    Metaverse Name
                  </label>
                  <input
                    id="Location"
                    class="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                    type="text"
                    placeholder="Metaverse Name"
                    style={{ fontSize: "20px" }}
                    onChange={(e) => setMetaverseName(e.target.value)}
                    required
                    value={metaverseName}
                    disabled={isExisting ? true : false}
                  />
                </div>
                <div class="mb-[45px] col-span-12 md:col-span-6">
                  <label
                    class="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                    for="PropertyType1"
                  >
                    Property Type
                  </label>

                  <div class="mb-[45px] col-span-12 md:col-span-6">
                    <input
                      class="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
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
              <div class="grid grid-cols-12 gap-x-[30px]">
                <div class="mb-[45px] col-span-12 md:col-span-8">
                  <label
                    class="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                    for="property-title"
                  >
                    {" "}
                    Property Title
                  </label>
                  <input
                    id="property-title"
                    class="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                    type="text"
                    placeholder="Property Title"
                    style={{ fontSize: "20px" }}
                    onChange={(e) => setPropertyTitle(e.target.value)}
                    disabled={isExisting ? true : false}
                    value={propertyTitle}
                  />
                </div>

                <div class="mb-[45px] col-span-12 md:col-span-4">
                  <label
                    class="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                    for="Price"
                  >
                    Price(in ETH)
                  </label>
                  <input
                    id="property-price"
                    style={{ fontSize: "20px" }}
                    class=" w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                    type="text"
                    placeholder="Price(inETH)"
                    value={
                      isExisting
                        ? parseInt(propertyPrice) / Math.pow(10, 18)
                        : propertyPrice
                    }
                    onChange={(e) => setPropertyPrice(e.target.value)}
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-x-[30px]">
                <div class="mb-[45px] col-span-12">
                  <label
                    class="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                    for="textarea"
                  >
                    Property Description
                  </label>
                  <textarea
                    class="h-[196px] xl:h-[360px] font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] resize-none"
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

              <div class="grid grid-cols-12 gap-x-[30px]">
                <div class="col-span-12">
                  <label
                    class="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary"
                    for="Location"
                  >
                    Coordinates
                  </label>
                </div>

                <div class="mb-[45px] col-span-12 md:col-span-6">
                  <input
                    id="Location"
                    class="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                    type="text"
                    placeholder="Coordinate-X"
                    style={{ fontSize: "20px" }}
                    onChange={(e) => setCoordinateX(e.target.value)}
                    value={coordinateX}
                    disabled={isExisting ? true : false}
                  />
                </div>

                <div class="mb-[45px] col-span-12 md:col-span-6">
                  <input
                    class="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                    type="text"
                    placeholder="Coordinate-Y"
                    style={{ fontSize: "20px" }}
                    onChange={(e) => setcoordinateY(e.target.value)}
                    value={coordinateY}
                    disabled={isExisting ? true : false}
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-x-[30px]">
                <div class="mb-[45px] col-span-12">
                  <label class="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary">
                    Metaverse Hyperlink
                  </label>
                  <input
                    id="Location"
                    class="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-[#1B2D40] border-opacity-60 rounded-[8px] p-[15px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] h-[60px] "
                    type="text"
                    placeholder="Metaverse Hyperlink"
                    style={{ fontSize: "20px" }}
                    onChange={(e) => setPropertyLocation(e.target.value)}
                    value={propertyLocation}
                    disabled={isExisting ? true : false}
                  />
                </div>
              </div>

              <div class="grid grid-cols-12 gap-x-[30px]">
                <div class="mb-[45px] col-span-12">
                  <label class="mb-[20px] font-lora text-[20px] font-medium leading-none block text-primary">
                    Add Image
                  </label>
                  <div class="py-[35px] px-[15px] flex flex-wrap items-center justify-center text-center border border-[#1B2D40] border-opacity-60 rounded-[8px]">
                    <div class="relative">
                      <input
                        class="absolute inset-0 z-[0] opacity-0 w-full"
                        type="file"
                        name="Images"
                        id="Images"
                        onChange={handleImageChange}
                        disabled={isExisting ? true : false}
                      />
                      <label
                        for="Images"
                        class="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[30px] py-[12px] capitalize font-medium text-white text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all flex flex-wrap items-center justify-center cursor-pointer"
                      >
                        {" "}
                        <svg
                          class="mr-[5px]"
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
            </form>
          </div>
        </div>
        {/* <!-- create agency End--> */}

        <div align="center">
          <div class="container">
            <button
              type="submit"
              onClick={mintNFT}
              class="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[40px] py-[15px] capitalize font-medium text-white text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
            >
              Add Property
            </button>
          </div>
        </div>
        <br />

        {/* <!-- Footer End --> */}
        <a
          id="scrollUp"
          class="w-12 h-12 rounded-full bg-primary text-white fixed right-5 bottom-16 flex flex-wrap items-center justify-center transition-all duration-300 z-10"
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
