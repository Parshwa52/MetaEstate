import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Web3 from "web3";
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
      alert("User denied access");
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




  return (
    <div>


      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />

      </Routes>

      <Footer />
    </div>
  );
};

export default App;
