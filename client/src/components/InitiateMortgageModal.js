import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BlockchainContext from "../contexts/BlockchainContext";
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other} style={{ fontSize: "18px", fontWeight: "700" }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ marginLeft: "10px" }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon style={{ marginLeft: "10px" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function InitiateMortgage({ open, setOpen, data }) {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
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
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emiAmount;
    let rate_of_interest = "7.2"; //pa
    let roi =
      parseFloat(parseFloat(rate_of_interest).toFixed(2) / 12).toFixed(2) / 100;
    // P x R x (1+R)^N / [(1+R)^N-1]

    let numerator =
      parseFloat(amount) * roi * Math.pow(1 + roi, parseInt(months));
    let denominator = parseFloat(Math.pow(1 + roi, parseInt(months)) - 1);
    emiAmount = parseFloat(numerator / denominator);
    console.log(emiAmount, numerator, denominator);

    var mortgage_amt = parseFloat(amount) * Math.pow(10, 18);
    var emi = emiAmount * Math.pow(10, 18);
    var downPayment = parseFloat(data.propertyPrice).toFixed(2) - mortgage_amt;
    console.log(emi, numerator, denominator, mortgage_amt, emi, downPayment);
    try {
      await morterContract.methods
        .initiate_mortgage(
          data.nftId,
          mortgage_amt,
          parseInt(emi),
          parseInt(months)
        )
        .send({ from: accounts[0], value: parseInt(downPayment) });
      alert("Mortgage initiated successfully");
      window.location.reload();
    } catch (e) {
      console.log(JSON.stringify(e));
    }
    //uint property_id, uint mortgage_amt,uint _emi,uint interestMonths
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
        fullWidth={true}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Enter the Leverage You would like to have ...
        </BootstrapDialogTitle>
        <DialogContent>
          <h5
            style={{ color: "white", marginBottom: "7px" }}
            className="text-primary leading-none text-[15px] font-lora mb-[34px] font-medium"
          >
            Enter The Amount <span className="text-secondary">.</span>
          </h5>
          <input
            className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-primary border-opacity-60 rounded-[8px] pl-[40px] pr-[20px] py-[8px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] bg-white"
            type="text"
            placeholder="The leverage Amount in Ethers"
            value={amount}
            disabled={false}
            style={{ color: "black" }}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <br />
          <h5
            style={{ color: "white", marginBottom: "7px" }}
            className="text-primary leading-none text-[15px] font-lora  mb-[34px] font-medium"
          >
            Enter The Number of Months <span className="text-secondary">.</span>
          </h5>
          <input
            className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-primary border-opacity-60 rounded-[8px] pl-[40px] pr-[20px] py-[8px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] bg-white"
            type="text"
            placeholder="Number of months to repay the leveraged amount "
            value={months}
            style={{ color: "black" }}
            onChange={(e) => setMonths(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{ fontWeight: "700", backgroundColor: "#2192FF" }}
          >
            Request Leverage{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
