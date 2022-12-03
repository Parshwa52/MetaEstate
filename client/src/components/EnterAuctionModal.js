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
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}



const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
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
  const [allBids, setAllBids] = useState([]);

  const { web3, accounts, morterContract, auctionContract } =
    useContext(BlockchainContext);

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
    console.log(bidAmount);

    try {
      await morterContract.methods.bid(data.nftId).send({
        from: accounts[0],
        value: parseInt(parseFloat(bidAmount) * Math.pow(10, 18)),
      });
      alert("Bid Submitted Successfully");
      window.location.reload();
    } catch (e) {
      alert(e.message);
      return;
    }
  };

  const getAuctionData = async () => {
    const response = await auctionContract.getPastEvents("Bid", {
      fromBlock: 0,
      filter: { project_id: data.nftId },
    });
    console.log(response);
    setAllBids(response);
  };

  useEffect(() => {
    getAuctionData();
    // eslint-disable-next-line
  }, []);

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
        <p>{data.highestBid}</p>
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
            placeholder="Your Bid in Ethers"
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
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
            count={rows.length}
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
