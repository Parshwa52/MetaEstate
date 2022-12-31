import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import ListProperty from "./pages/ListProperty";
import PropertyDetails from "./pages/PropertyDetails";
import PropertyListing from "./pages/PropertyListing";
import PropertyMarketplace from "./pages/PropertyMarketplace";
import Web3 from "web3";
import propNFT from "./abis/propNFT.json";
import morter from "./abis/morter.json";
import auction from "./abis/Auction.json";
import BlockchainContext from "./contexts/BlockchainContext";
import { Livepeer } from "./components/livepeer";
import dotenv from "dotenv";
require("dotenv").config();

const getWeb3 = async () => {
  let tempWeb3 = undefined;
  if (window.ethereum) {
    tempWeb3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      //await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      //const accounts = await window.web3.eth.getAccounts();
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    tempWeb3 = new Web3(window.web3.currentProvider);
    // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
  return tempWeb3;
};

const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [propNFTContract, setpropNFTContract] = useState();
  const [morterContract, setMorterContract] = useState();
  const [auctionContract, setAuctionContract] = useState();
  const [propNFTContractAddress, setpropNFTContractAddress] = useState();
  const [morterContractAddress, setMorterContractAddress] = useState();
  const [auctionContractAddress, setAuctionContractAddress] = useState();
  useEffect(() => {
    const init = async () => {
      // load web3
      const web3 = await getWeb3();
      console.log("WEB3-----------");
      console.log({ web3 });
      // loadBlockchainData
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("ACCOUNTS-----------");
      console.log({ accounts });
      const networkId = await web3.eth.net.getId();
      console.log("NetworkId-----------");
      console.log({ networkId });

      const listener = (accs) => {
        setAccounts(accs);
      };

      let _propNFTContract;
      let _morterContract;
      let _auctionContract;

      window.ethereum.on("accountsChanged", listener);
      //Importing the propNFT Contract
      var networkdata = propNFT.networks[networkId];
      console.log("propNFT=", networkdata);
      if (networkdata) {
        const abi = propNFT.abi;
        setpropNFTContractAddress(networkdata.address);
        //console.log(freelance.abi);
        _propNFTContract = new web3.eth.Contract(abi, networkdata.address);
      }

      //Importing the morter Contract
      var networkdata = morter.networks[networkId];
      console.log("morter=", networkdata);
      if (networkdata) {
        const abi = morter.abi;
        setMorterContractAddress(networkdata.address);
        //console.log(freelance.abi);
        _morterContract = new web3.eth.Contract(abi, networkdata.address);
      }

      //Importing the auction Contract
      var networkdata = auction.networks[networkId];
      console.log("auction=", networkdata);
      if (networkdata) {
        const abi = auction.abi;
        setAuctionContractAddress(networkdata.address);
        //console.log(freelance.abi);
        _auctionContract = new web3.eth.Contract(abi, networkdata.address);
      }

      // saving this to states
      setWeb3(web3);
      setAccounts(accounts);
      setpropNFTContract(_propNFTContract);
      setMorterContract(_morterContract);
      setAuctionContract(_auctionContract);
      // console.log(tempWeb3, tempAccounts, freelancecon);
    };

    init();
  }, []);

  return (
    <div>
      <BlockchainContext.Provider
        value={{
          web3,
          accounts,
          propNFTContract,
          morterContract,
          auctionContract,
          propNFTContractAddress,
          morterContractAddress,
          auctionContractAddress,
        }}
      >
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/listings" element={<PropertyListing />} />
          <Route exact path="/add-property" element={<ListProperty />} />
          <Route exact path="/property-details" element={<PropertyDetails />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/video" element={<Livepeer />} />
          <Route
            exact
            path="/PropertyMarketplace"
            element={<PropertyMarketplace />}
          />
        </Routes>
      </BlockchainContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
