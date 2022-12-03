import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./DashboardProjectStyles.css";
import Button from "@mui/material/Button";
import BlockchainContext from "../contexts/BlockchainContext";
import { useNavigate } from "react-router-dom";

export default function DashboardProjects({ data }) {
  let navigate = useNavigate();
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

  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          border: "3px solid black",
          borderRadius: "20px",
          width: "15rem",
          backgroundColor: "#f2f2f2",
        }}
      >
        <img
          src={data.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
          className="card-img-top"
          alt="..."
          style={{
            borderRadius: "20px",
            height: "12rem",
            position: "relative",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <h5
              className="card-title "
              style={{
                margin: "7px",
                fontWeight: "900",
                fontFamily: "Georgia",
                color: "black",
              }}
            >
              {data.name}{" "}
            </h5>
          </Typography>
          <Typography>
            <span
              className=""
              style={{
                fontWeight: "500",
                fontSize: "18px",
                marginLeft: "7px",
                fontFamily: "Georgia",
              }}
            >
              <Button
                variant="contained"
                style={{ marginRight: "10px" }}
                onClick={() =>
                  navigate("/add-property", {
                    state: { isExisting: true, data: data },
                  })
                }
                className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white hidden sm:block  relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
              >
                Sell
              </Button>{" "}
              <Button className="button01" variant="contained">
                Auction
              </Button>
            </span>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
