import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import BlockchainContext from "../contexts/BlockchainContext";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  color: "Green",
  fontFamily: "Georgia",
  fontWeight: "700",
}));

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

export default function InvestMoneyModal({ open, setOpen, data }) {
  const [amount, setAmount] = useState("");
  const {
    // web3,
    accounts,
    // propNFTContract,
    morterContract,
    // auctionContract,
    // propNFTContractAddress,
    // morterContractAddress,
    // auctionContractAddress,
  } = useContext(BlockchainContext);
  // const {
  //   web3,
  //   accounts,
  //   propNFTContract,
  //   morterContract,
  //   auctionContract,
  //   propNFTContractAddress,
  //   morterContractAddress,
  //   auctionContractAddress,
  // } = useContext(BlockchainContext);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalAmount = parseFloat(amount) * Math.pow(10, 18);
    if (parseInt(data.mortgageamt) < finalAmount) {
      alert("Please check maximum investment allowed");
      return;
    }
    try {
      await morterContract.methods
        .riskfreeinvest(parseInt(data.nftId), parseInt(finalAmount))
        .send({ from: accounts[0], value: parseInt(finalAmount) });
      alert("Your investment has been made successfully");
      window.location.reload();
    } catch (e) {
      alert(e.message);
      return;
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
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
          Enter The Investment you would like to make ...
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
          <Div>{"The investors are guaranteed annual interest of 3%"}</Div>
          <br />
          <Div>
            {`The maximum possible investment is : ${
              parseInt(data.mortgageamt) / Math.pow(10, 18)
            }   `}
            <i className="fab fa-ethereum"></i>
          </Div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            style={{ fontWeight: "700", backgroundColor: "#2192FF" }}
            variant="contained"
          >
            Make an Investment{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
