import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import BlockchainContext from "../contexts/BlockchainContext";

const columns = [
  { id: "bidderAddress", label: "Bidder Address", minWidth: 170 },
  { id: "bidAmount", label: "Bid Amount (in MATIC) ", minWidth: 100 },
];

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

export default function EnterAuctionModal({ open, setOpen, data }) {
  const [bidAmount, setBidAmount] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allBids, setAllBids] = useState([
    {
      bidderAddress: "0x3EDbD652014Bca7a62f1a8bF9bE970585b6a11Dd",
      bidAmount: "1",
    },
    {
      bidderAddress: "0xd0B02D303334dB49002aa5aAa93b9103cc285c62",
      bidAmount: "2",
    },
  ]);

  const {
    // web3,
    accounts,
    //morterContract,
    auctionContract,
  } = useContext(BlockchainContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      parseFloat(data.highestBid / Math.pow(10, 18)) >= parseFloat(bidAmount)
    ) {
      alert("Enter a bid amount great than the highest bid");
      return;
    }
    console.log(bidAmount);
    console.log(parseInt(parseFloat(bidAmount) * Math.pow(10, 18)));
    console.log(data.nftId);
    try {
      await auctionContract.methods.bid(data.nftId).send({
        from: accounts[0],
        value: parseInt(parseFloat(bidAmount) * Math.pow(10, 18)).toString(),
      });
      alert("Bid Submitted Successfully");
      window.location.reload();
    } catch (e) {
      alert(e.message);
      return;
    }
  };

  const getAuctionData = async () => {
    // let events = await auctionContract.allEvents({
    //   fromBlock: 0,
    //   toBlock: "latest",
    // });
    // console.log(events);
    // const options = {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: 1,
    //     jsonrpc: "2.0",
    //     method: "eth_getFilterLogs",
    //     params: [data.nftId],
    //   }),
    // };

    // fetch(
    //   "https://polygon-mumbai.g.alchemy.com/v2/MK5PjLnWBkouYRAT1TCz9oXIIPN6pzqC",
    //   options
    // )
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));
    // let blockNumber = (await web3.eth.getBlockNumber()) - 999;
    let response = await auctionContract.getPastEvents(
      "Bid",
      {},
      function (err, events) {
        console.log(events);
      }
    );

    console.log(response);
    if (response.length > 0) setAllBids(response);
  };

  useEffect(() => {
    getAuctionData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {}, [allBids]);

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
          Participate in Bidding to buy your favourite NFTs{" "}
        </BootstrapDialogTitle>
        {/* <p>{data.highestBid}</p> */}
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
            placeholder="Your Bid in MATIC"
            value={bidAmount}
            disabled={false}
            style={{ color: "black" }}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{ fontWeight: "700", backgroundColor: "#2192FF" }}
          >
            Submit the Bid{" "}
          </Button>
        </DialogActions>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allBids
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, idx) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allBids.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Dialog>
    </div>
  );
}
