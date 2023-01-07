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

export default function DashboardAuctionModal({ open, setOpen, data }) {
  const [startAmount, setStartAmount] = useState("");
  const [duration, setDuration] = useState("");
  const {
    // web3,
    accounts,
    propNFTContract,
    // morterContract,
    auctionContract,
    propNFTContractAddress,
    // morterContractAddress,
    auctionContractAddress,
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

  const startAuction = async (e) => {
    e.preventDefault();
    try {
      console.log({ auctionContractAddress });
      console.log(data.nftId);
      await propNFTContract.methods
        .approveContract(auctionContractAddress, data.nftId)
        .send({
          from: accounts[0],
        })
        .then(async () => {
          let amountInWei = (
            parseInt(startAmount) * Math.pow(10, 18)
          ).toString();
          await auctionContract.methods
            .start(
              propNFTContractAddress,
              parseInt(data.nftId),
              amountInWei,
              parseInt(duration)
            )
            .send({
              from: accounts[0],
            });
          alert("Auction Started Successfully");
          window.location.reload();
        });
    } catch (e) {
      alert(e.message);
    }
  };

  const endAuction = async (e) => {
    e.preventDefault();
    try {
      await auctionContract.methods.end(parseInt(data.nftId)).send({
        from: accounts[0],
      });
      alert("Auction Ended Successfully");
    } catch (e) {
      alert(e.message);
    }
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
          Enter the Auction Details of your NFT
        </BootstrapDialogTitle>
        <DialogContent>
          <h5
            style={{ color: "white", marginBottom: "7px" }}
            className="text-primary leading-none text-[15px] font-lora mb-[34px] font-medium"
          >
            Enter Initial Bid Amount <span className="text-secondary">.</span>
          </h5>
          <input
            className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-primary border-opacity-60 rounded-[8px] pl-[40px] pr-[20px] py-[8px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] bg-white"
            type="text"
            placeholder="The Amount in MATIC"
            value={startAmount}
            disabled={false}
            style={{ color: "black" }}
            onChange={(e) => setStartAmount(e.target.value)}
          />
          <br />
          <br />
          <h5
            style={{ color: "white", marginBottom: "7px" }}
            className="text-primary leading-none text-[15px] font-lora  mb-[34px] font-medium"
          >
            Enter The duration of auction in seconds{" "}
            <span className="text-secondary">.</span>
          </h5>
          <input
            className="font-light w-full leading-[1.75] placeholder:opacity-100 placeholder:text-body border border-primary border-opacity-60 rounded-[8px] pl-[40px] pr-[20px] py-[8px] focus:border-secondary focus:border-opacity-60 focus:outline-none focus:drop-shadow-[0px_6px_15px_rgba(0,0,0,0.1)] bg-white"
            type="text"
            placeholder="Number of seconds in duration "
            value={duration}
            style={{ color: "black" }}
            onChange={(e) => setDuration(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={startAuction}
            variant="contained"
            style={{ fontWeight: "700", backgroundColor: "#2192FF" }}
          >
            Start Auction{" "}
          </Button>
          <Button
            onClick={endAuction}
            variant="contained"
            style={{ fontWeight: "700", backgroundColor: "#2192FF" }}
          >
            End Auction{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
