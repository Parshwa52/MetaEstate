import React, { useState, useEffect , useContext} from "react";
import { useNavigate } from "react-router-dom";
import InitiateMortgage from "./InitiateMortgageModal";
import InvestMoneyModal from "./InvestMoneyModal";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EnterAuctionModal from "./EnterAuctionModal";
import BlockchainContext from "../contexts/BlockchainContext";
const PropertyCard = ({ data }) => {
  console.log({ data });
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
  const [mortgageModal, setMortgageModal] = useState(false);
  const [investMoneyModal, setInvestMoneyModal] = useState(false);
  const [enterAuctionModal, setEnterAuctionModal] = useState(false);

  const [auctionStatus, setAuctionStatus] = useState(true);

  const handleClickOpenMortgageModal = () => {
    setMortgageModal(!mortgageModal);
  };
  const handleClickOpenInvestMoneyModal = () => {
    setInvestMoneyModal(!investMoneyModal);
  };

  const handleClickOpenAuctionModal = () => {
    setEnterAuctionModal(!enterAuctionModal);
  };
  const getAuctionStatus = () => {
    //call to the Auction contract allAuctions function
    let aucStatus;
    //setAuctionStatus(auctionStatus)
  };

  useEffect(() => {
    getAuctionStatus();
  }, [setMortgageModal]);
  let navigate = useNavigate();

  const buyDirect=async(e)=>{
    e.preventDefault();
    if(data.owner.toString().toLowerCase()===accounts[0].toLowerCase())
    {
      alert("You are already the owner");
      return;
    }
    //5% of tc
    var payToTC= parseFloat(0.05 * parseInt(data.propertyPrice));
    var payToSeller = parseInt(data.propertyPrice);
    var totalValuetoSend = payToSeller+payToTC;
    try {
      await morterContract.methods.direct_buy_property(data.nftId,payToSeller,payToTC).send({
      from:accounts[0],
      value:totalValuetoSend.toString()
    });
    alert("Property purchased successfully");
    window.location.reload();
    } catch (error) {
      alert(error.message);
      console.log(JSON.stringify(error));
      return
    }

  }

    
  

  // const { landtype, category, image } = data;
  return (
    <>
      <div className="swiper-slide">
        <div
          style={{ borderRadius: "30px" }}
          className="overflow-hidden rounded-md drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] bg-[#EEEEEE] text-center transition-all duration-300 hover:-translate-y-[10px]"
        >
          <div className="relative">
            <img
              src={data.image.replace("ipfs://","https://ipfs.io/ipfs/")}
              className="w-full h-full"
              loading="lazy"
              width="370"
              height="266"
              alt="Duplex de Villa."
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/property-details", { state: { data } })}
            />
          </div>

          <div className="py-[20px] px-[20px] text-left">
            <h3
              onClick={() => navigate("/property-details", { state: { data } })}
              style={{ cursor: "pointer", fontFamily: "Georgia" }}
              className="font-lora leading-tight text-[22px] xl:text-[26px] text-primary hover:text-secondary transition-all font-medium"
            >
              {data.propertyType}
            </h3>
            <h4>
              <a
                href="property-details"
                className="font-light text-[14px] leading-[1.75] underline"
              >
                {data.propertyLocation}{" "}
              </a>
            </h4>
            {/* <h4>
              <a
                href="property-details"
                className="font-light text-[14px] leading-[1.75] underline"
              >
                {data.category}
              </a>
            </h4> */}
            {mortgageModal && (
              <InitiateMortgage
                open={mortgageModal}
                setOpen={handleClickOpenMortgageModal}
                data={data}
              />
            )}
            {investMoneyModal && (
              <InvestMoneyModal
                open={investMoneyModal}
                setOpen={handleClickOpenInvestMoneyModal}
                data={data}

              />
            )}
            {enterAuctionModal && (
              <EnterAuctionModal
                open={enterAuctionModal}
                setOpen={handleClickOpenAuctionModal}
              />
            )}

            {data.auctionStarted ? (
              <button onClick={handleClickOpenAuctionModal} className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white hidden sm:block  relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all">
                Enter the Auction
              </button>
            ) : parseInt(data.status) === 100 ? (
              <div style={{ textAlign: "center" }}>
                <button

                  onClick={buyDirect}
                  style={{
                    display: "inline-block",
                    marginRight: "1rem",
                  }}
                  className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white hidden sm:block  relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
                >
                  Buy Direct
                </button>
                <button
                  className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white hidden sm:block  relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
                  style={{ display: "inline-block" }}
                  onClick={handleClickOpenMortgageModal}
                >
                  Initiate Mortgage
                </button>
              </div>
            ) : parseInt(data.status) === 200 ? (
              <button
                onClick={handleClickOpenInvestMoneyModal}
                className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white hidden sm:block  relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
              >
                Invest Risk Free
              </button>
            ) : parseInt(data.status) === 300 ? (
              <button className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white hidden sm:block  relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all">
                Initiate Final Trade
              </button>
            ) : parseInt(data.status) === 400 ? (
              <button className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white hidden sm:block  relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all">
                Pay EMI
              </button>):null}
            <br />
            <span style={{ fontSize: "18px", fontWeight: "500" }}>
              Created on: 4 December, 2022
            </span>
            <ul className="flex flex-wrap items-center   mt-[10px] mb-[15px] pb-[10px] border-b border-[#E0E0E0]">
              <li
                style={{ fontSize: "16px", margin: "0 10px" }}
                className="flex flex-wrap items-center pr-[25px] sm:pr-[5px] md:pr-[25px] border-r border-[#E0DEDE]"
              >
                <svg
                  className="mr-[5px]"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  style={{ fontSize: "16px" }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.8125 9.68709V4.31285C12.111 4.23634 12.384 4.0822 12.6037 3.86607C12.8234 3.64994 12.982 3.37951 13.0634 3.08226C13.1448 2.78501 13.1461 2.47151 13.0671 2.1736C12.9882 1.87569 12.8318 1.60398 12.6139 1.38605C12.396 1.16812 12.1243 1.01174 11.8263 0.932792C11.5284 0.85384 11.2149 0.855126 10.9177 0.936521C10.6204 1.01792 10.35 1.17652 10.1339 1.39623C9.91774 1.61593 9.7636 1.88892 9.68709 2.18747H4.31285C4.23634 1.88892 4.0822 1.61593 3.86607 1.39623C3.64994 1.17652 3.37951 1.01792 3.08226 0.936521C2.78501 0.855126 2.47151 0.85384 2.1736 0.932792C1.87569 1.01174 1.60398 1.16812 1.38605 1.38605C1.16812 1.60398 1.01174 1.87569 0.932792 2.1736C0.85384 2.47151 0.855126 2.78501 0.936521 3.08226C1.01792 3.37951 1.17652 3.64994 1.39623 3.86607C1.61593 4.0822 1.88892 4.23634 2.18747 4.31285V9.68709C1.88892 9.7636 1.61593 9.91774 1.39623 10.1339C1.17652 10.35 1.01792 10.6204 0.936521 10.9177C0.855126 11.2149 0.85384 11.5284 0.932792 11.8263C1.01174 12.1243 1.16812 12.396 1.38605 12.6139C1.60398 12.8318 1.87569 12.9882 2.1736 13.0671C2.47151 13.1461 2.78501 13.1448 3.08226 13.0634C3.37951 12.982 3.64994 12.8234 3.86607 12.6037C4.0822 12.384 4.23634 12.111 4.31285 11.8125H9.68709C9.7636 12.111 9.91774 12.384 10.1339 12.6037C10.35 12.8234 10.6204 12.982 10.9177 13.0634C11.2149 13.1448 11.5284 13.1461 11.8263 13.0671C12.1243 12.9882 12.396 12.8318 12.6139 12.6139C12.8318 12.396 12.9882 12.1243 13.0671 11.8263C13.1461 11.5284 13.1448 11.2149 13.0634 10.9177C12.982 10.6204 12.8234 10.35 12.6037 10.1339C12.384 9.91774 12.111 9.7636 11.8125 9.68709ZM11.375 1.74997C11.548 1.74997 11.7172 1.80129 11.8611 1.89744C12.005 1.99358 12.1171 2.13024 12.1834 2.29012C12.2496 2.45001 12.2669 2.62594 12.2332 2.79568C12.1994 2.96541 12.1161 3.12132 11.9937 3.24369C11.8713 3.36606 11.7154 3.4494 11.5457 3.48316C11.3759 3.51692 11.2 3.49959 11.0401 3.43337C10.8802 3.36714 10.7436 3.25499 10.6474 3.11109C10.5513 2.9672 10.5 2.79803 10.5 2.62497C10.5002 2.39298 10.5925 2.17055 10.7565 2.00651C10.9206 1.84246 11.143 1.7502 11.375 1.74997ZM1.74997 2.62497C1.74997 2.45191 1.80129 2.28274 1.89744 2.13885C1.99358 1.99495 2.13024 1.8828 2.29012 1.81658C2.45001 1.75035 2.62594 1.73302 2.79568 1.76678C2.96541 1.80055 3.12132 1.88388 3.24369 2.00625C3.36606 2.12862 3.4494 2.28453 3.48316 2.45427C3.51692 2.624 3.49959 2.79993 3.43337 2.95982C3.36714 3.1197 3.25499 3.25636 3.11109 3.35251C2.9672 3.44865 2.79803 3.49997 2.62497 3.49997C2.39298 3.49974 2.17055 3.40748 2.00651 3.24343C1.84246 3.07939 1.7502 2.85696 1.74997 2.62497ZM2.62497 12.25C2.45191 12.25 2.28274 12.1987 2.13885 12.1025C1.99495 12.0064 1.8828 11.8697 1.81658 11.7098C1.75035 11.5499 1.73302 11.374 1.76678 11.2043C1.80055 11.0345 1.88388 10.8786 2.00625 10.7563C2.12862 10.6339 2.28453 10.5505 2.45427 10.5168C2.624 10.483 2.79993 10.5003 2.95982 10.5666C3.1197 10.6328 3.25636 10.745 3.35251 10.8888C3.44865 11.0327 3.49997 11.2019 3.49997 11.375C3.49974 11.607 3.40748 11.8294 3.24343 11.9934C3.07939 12.1575 2.85696 12.2497 2.62497 12.25ZM9.68709 10.9375H4.31285C4.23448 10.6367 4.07729 10.3622 3.8575 10.1424C3.63771 9.92265 3.36326 9.76546 3.06247 9.68709V4.31285C3.36324 4.23444 3.63766 4.07724 3.85745 3.85745C4.07724 3.63766 4.23444 3.36324 4.31285 3.06247H9.68709C9.76546 3.36326 9.92265 3.63771 10.1424 3.8575C10.3622 4.07729 10.6367 4.23448 10.9375 4.31285V9.68709C10.6367 9.76542 10.3622 9.92259 10.1424 10.1424C9.92259 10.3622 9.76542 10.6367 9.68709 10.9375ZM11.375 12.25C11.2019 12.25 11.0327 12.1987 10.8888 12.1025C10.745 12.0064 10.6328 11.8697 10.5666 11.7098C10.5003 11.5499 10.483 11.374 10.5168 11.2043C10.5505 11.0345 10.6339 10.8786 10.7563 10.7563C10.8786 10.6339 11.0345 10.5505 11.2043 10.5168C11.374 10.483 11.5499 10.5003 11.7098 10.5666C11.8697 10.6328 12.0064 10.745 12.1025 10.8888C12.1987 11.0327 12.25 11.2019 12.25 11.375C12.2496 11.6069 12.1573 11.8293 11.9933 11.9933C11.8293 12.1573 11.6069 12.2496 11.375 12.25Z" />
                </svg>

                <span>1230 Sq.fit</span>
              </li>
              <li
                style={{ fontSize: "16px", margin: "0 10px" }}
                className="flex flex-wrap items-center pr-[25px] sm:pr-[5px] md:pr-[25px] border-r border-[#E0DEDE]"
              >
                <PermIdentityIcon />
                {data.creator.toString()[0]}
                {data.creator.toString()[1]}
                {data.creator.toString()[2]}
                {data.creator.toString()[3]}
                {data.creator.toString()[4]}
                {data.creator.toString()[5]}.....
                {data.creator.toString().slice(-4)}
              </li>
              <li
                style={{ fontSize: "16px", margin: "0 10px" }}
                className="flex flex-wrap items-center pr-[25px] sm:pr-[10px] md:pr-[25px] border-r border-[#E0DEDE]"
              >
                <HomeIcon />
                {data.nftContract.toString()[0]}
                {data.nftContract.toString()[1]}
                {data.nftContract.toString()[2]}
                {data.nftContract.toString()[3]}
                {data.nftContract[4]}
                {data.nftContract[5]}.....
                {data.nftContract.slice(-4)}
              </li>
              <li className="flex flex-wrap items-center">
                [{data.coordinateX}]{"\u00A0"}:{"\u00A0"}[
                {data.coordinateY}]
              </li>
            </ul>
            <ul>
              <li className="flex flex-wrap items-center justify-between">
                <span className="font-lora text-base text-primary leading-none font-medium">
                  Price: {parseFloat(parseInt(data.propertyPrice)/Math.pow(10,18))} <i className="fab fa-ethereum"></i>{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
