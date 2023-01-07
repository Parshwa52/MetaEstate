import React, { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DashboardProjects from "../components/DashboardProjects";
import PersonalInfo from "../components/Personalinfo";
import BlockchainContext from "../contexts/BlockchainContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const [myprojects, Setmyprojects] = useState([]);
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

  const fetchData = async () => {
    const totalPropertyCount = await morterContract.methods
      .propertycounter()
      .call();

    var allproperties = [];

    const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
    for (var i = 0; i < totalPropertyCount; i++) {
      var result;
      try {
        result = await fetch(
          `https://polygon-mumbai.g.alchemy.com/nft/v2/${ALCHEMY_KEY}/getNFTMetadata?contractAddress=${propNFTContractAddress}&tokenId=${i}&tokenType=ERC721`
        ).then((response) => response.text());
      } catch (error) {
        console.log("error", error);
      }
      var resultJSON = await JSON.parse(result);
      var currentPropertyData = resultJSON.metadata;

      //get property data from morter contract
      var propertyData = await morterContract.methods.allproperties(i).call();
      var auctionData = await auctionContract.methods.allAuctions(i).call();
      console.log({ resultJSON, propertyData, totalPropertyCount });

      if (propertyData.owner.toLowerCase() === accounts[0].toLowerCase()) {
        console.log(propertyData);
        console.log(auctionData);
        console.log(currentPropertyData);
        currentPropertyData["nftContract"] = propNFTContractAddress;
        currentPropertyData["nftId"] = i;
        let finalPropertyData = Object.assign(
          propertyData,
          auctionData,
          currentPropertyData
        );
        allproperties.push(finalPropertyData);
      }
      console.log(allproperties);
    }
    Setmyprojects(allproperties);
  };

  useEffect(() => {
    if (morterContract) fetchData();
  }, [accounts]);
  return (
    <>
      <section
        className="bg-no-repeat bg-center bg-cover bg-[#E9F1FF] h-[350px] lg:h-[513px] flex flex-wrap items-center relative before:absolute before:inset-0 before:content-[''] before:bg-[#000000] before:opacity-[70%]"
        style={{
          backgroundImage: "url('assets/images/page-title-bg.jpg')",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="max-w-[600px]  mx-auto text-center text-white relative z-[1]">
                <div className="mb-5">
                  <span className="text-base block">Our Properties</span>
                </div>
                <h1
                  className="font-lora text-[36px] sm:text-[50px] md:text-[68px] lg:text-[50px] leading-tight xl:text-2xl font-medium"
                  style={{ fontFamily: "Georgia" }}
                >
                  Properties
                </h1>

                <p
                  className="text-base mt-5 max-w-[500px] mx-auto text-center"
                  style={{ fontSize: "22px" }}
                >
                  Huge number of propreties availabe here for buy and sell also
                  you can find here co-living property as you like
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Container
          maxWidth="lg"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Item
                  style={{ borderRadius: "20px", border: "3px solid white" }}
                >
                  <Grid container spacing={3}>
                    {myprojects &&
                      myprojects.map((data, key) => (
                        <Grid item xs={4} key={key}>
                          <DashboardProjects data={data} key={key} />
                        </Grid>
                      ))}{" "}
                  </Grid>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item
                  style={{ borderRadius: "20px", border: "3px solid white" }}
                >
                  <PersonalInfo />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>
    </>
  );
}
