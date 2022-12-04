# 🚀🔥💰MetaEstate🥇😎🚀

##🥇🤖An aggregator for metaverse real estate.💰🔥

## Problem Statement

MetaEstate is like AMAZON for metaverse companies. MetaEstate is an aggregator which handles real estate transactions of metaverse properties. In next 5 years, 100s of companies will make their own metaverses. Each company needs to have its properties in metaverse get sold at higher price and as quick as possible. Then, they have to make inhouse tool for property marketting and transactions. Also, inhouse tool wont have any great traction. MetaEstate Marketplace solves all this problems faced by metaverse companies.

Each property is unique and so that considered as NFT. Each property has unique identity, and some properties like metaverse it belongs to, title, location, coordinates, image etc.

## Solution

1. Initially, any metaverse company after completing their property map and fixing price, will list their unique property as NFT on our marketplace using their seller accounts

2)The NFT is created using nft.storage facility provided by Filecoin. Now, these NFTs are listed on marketplace along with NFTs from other companies.

3. Now, buyers will visit and can either direct Buy complete property or can take loan and pay via EMI.

4. Here, our USP is, we are allowing risk free investors to invest in this mortgage transaction and get a fixed return.

4)E.g. A wants to sell property for 100 ETH. B takes loan by paying downpayment of 30 ETH and rest 70 ETH as loan. Now, multiple risk free investors invest to make a total sum of 70 ETH. Now, we as trading company make this transaction valid by adding liquidity by providing 70ETH to contract.
Contract Balance = 30+70+70 = 170 ETH

5)Now, seller exits by taking 70 ETH from contract and its nft gets transferred to trading company which is us. Now, buyer will pay emi to contract along with interest.

6)Here, some amount distributed to risk free investors and rest to trading company.

7)After last EMI, buyer gets his NFT from contract and becomes owner.

8)We have also provided auction facility to companies if they want to auction their propNFT where higher bid gets the property.

Technology and Challenges

We integrated various tech stack like Polygon, Filecoin, Covalent etc.

1. We deployed our Defi dapp on Polygon Mumbai testnet.
2. Then, we used nft.storage from filecoin to make metaverse property NFTs.
3. We used Covalent NFT API for querying NFT data.

Challenges we faced were:

1. Deciding edge cases and smart contract was very challenging.
2. We had to consider multiple scenarios and make contract accordingly.
3. While integrated frontend with solidity, we faced lots of errors.

Sponsors and their Technology uses

1. Filecoin
   We have used the NFT.Storage utility from Filecoin to mint virtual real estate Metaverse properties as NFTs. We also use the distributed file system to fetch the complex (nested) JSON details for specific NFTs.

2. Polygon

The deployment of all our Smart Contracts were done on the polygon mumbai testnet. With its gas optimzation and transaction speed we also integrated key DEFI components(Buy, Sell, Re-sell, Auction, Lending, Borrowing) necessary for trade of virtual real estate Metaverse.
The user experience for carrying the trade of NFTs was also made seamless not only for the customers visiting the platform but also for the different metaverse platforms who initially list their properties by exposing them to a large audience.

3. The Graph

The Graph was used to deploy contract specific sub graphs related to the DAPP. The Graph Data was used to fetch and filter the list of indexed events emitted from the contracts. The event data for Auction was used to show how the auction statistical information like current highest bid associated information. The Graph data also helped us in recommending the potential ideal price for selling a NFT by having a lookup over all the previous NFT transfers.

4. Livepeer

The Livepeer SDK was used to show customers the demo video of metaverse. The video was uploaded to IPFS storage and using Livepeer SDK, the video was shown using Livepeer video player. The video streaming process became very smooth for end users.

5. Covalent

The Covalent NFT API used to retrieve the NFT external metadata for propNFT contract. The covalent API had fast response for NFTs which helped to render the page fast.

Deployed Contracts on Polygon Mumbai:

Contract Address:
propNFT: 0x7b339aA646Cf1cEa73C62C218723217056ecA780
Morter: 0x868F2E53fFda9dCD0F0e59509c1328bfE052550A
Auction: 0xA7f846Ec9C8Bd00C0C7661A83EE26cC80b6B6B34
