import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../pages/dashboard.css";

const DashboardProjectCard = ({ data }) => {
  console.log(data);
  return (
    <div
      className="col-6"
      style={{
        marginBottom: "15px",
      }}
    >
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
          src={data.logo}
          className="card-img-top"
          alt="logo"
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
              {data.title}
            </h5>
          </Typography>
          <Typography>
            <button style={{ marginRight: "10px" }}>Sell</button>
            <button>Auction</button>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardProjectCard;
