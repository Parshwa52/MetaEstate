//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract propNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    constructor() ERC721("propNFT", "propNFT") {}

    function mintandApproveNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _tokenIds.increment();
        //approve(mortgagecontract,newItemId);
        //approve(auctionContract,newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function approveContract(address contractToApprove,uint tokenId)public
    {
        approve(contractToApprove,tokenId);
    }

    function transferFromOwnerToMortgager(address from, address to, uint tokenId)public
    {
        transferFrom(from,to,tokenId);
    }

    function transferFromMortgagerToTC(address from, address to, uint tokenId)public
    {
        transferFrom(from,to,tokenId);
    }

    function transferFromTCToMortgager(address from, address to, uint tokenId)public
    {
        transferFrom(from,to,tokenId);
    }
}