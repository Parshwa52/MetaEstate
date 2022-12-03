import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

export default function PersonalInfo() {
  const [details, setDetails] = useState({
    wallet_address: "address",
    profile_img: null,
    email: "",
    fname: "",
    lname: "",
    website: "",
    description: "",
  });
  useEffect(() => { }, [details]);

  const SubmitDetails = () => { };
  return (
    <>
      <Avatar
        alt="Remy Sharp"
        style={{ margin: "0px", padding: "0px", lineHeight: "0" }}
        variant="square"
        sx={{ width: 126, height: 126 }}
      />
      <input type="file" />
      <br />
      <br />

      <input
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          border: "0px",
          color: "black",
          height: "3rem",
          width: "15rem",
        }}
        value={details.fname}
        onChange={(e) => setDetails({ ...details, fname: e.target.value })}
        placeholder="Enter the First Name"
      />
      <br />
      <br />

      <input
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          border: "0px",
          color: "black",
          height: "3rem",
          width: "15rem",
        }}
        value={details.lname}
        onChange={(e) => setDetails({ ...details, lname: e.target.value })}
        placeholder="Enter last name"
      />
      <br />
      <br />

      <input
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          border: "0px",
          color: "black",
          height: "3rem",
          width: "15rem",
        }}
        value={details.description}
        onChange={(e) =>
          setDetails({ ...details, description: e.target.value })
        }
        placeholder="Describe Yourself"
      />
      <br />
      <br />

      <input
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          border: "0px",
          color: "black",
          height: "3rem",
          width: "15rem",
        }}
        value={details.website}
        onChange={(e) => setDetails({ ...details, website: e.target.value })}
        placeholder="Your website"
      />
      <br />
      <br />

      <input
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          border: "0px",
          color: "black",
          height: "3rem",
          width: "15rem",
        }}
        value={details.fname}
        onChange={(e) => setDetails({ ...details, fname: e.target.value })}
        placeholder="Enter Name"
      />
      <br />
      <br />

      <input
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          border: "0px",
          color: "black",
          height: "3rem",
          width: "15rem",
        }}
        value={details.email}
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
        placeholder="Contact information(email)"
      />
      <br />
      <br />
      <Button variant="contained" onClick={SubmitDetails}>
        Confirm Your Details
      </Button>
    </>
  );
}
