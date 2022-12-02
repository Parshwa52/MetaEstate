// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

interface IERC721_contract {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function transferFrom(
        address,
        address,
        uint256
    ) external;

    function approveContract(address, uint256) external;
}

contract Auction {
    struct auctionDetails {
        uint256 nftId;
        bool auctionStarted;
        bool auctionEnded;
        IERC721_contract nft;
        address payable seller;
        uint256 duration;
        uint256 endAt;
        address highestBidder;
        uint256 highestBid;
    }

    //auctionDetails[] public auctions;

    mapping(uint256 => auctionDetails) public allAuctions;
    uint256 public auctioncounter = 0;

    event Start(
        uint256 indexed nftId,
        address indexed seller,
        uint256 indexed startTimeStamp,
        uint256 time
    );
    event Bid(
        uint256 indexed nftId,
        address indexed bidder,
        uint256 amount,
        IERC721_contract nft
    );
    event End(address winner, uint256 amount);

    function start(
        IERC721_contract _nft,
        uint256 _nftId,
        uint256 _startingBid,
        uint256 time
    ) external {
        require(
            allAuctions[_nftId].auctionStarted == false,
            "auction should not have already started for this NFT"
        );
        auctionDetails memory auction;
        auction.nftId = _nftId;
        auction.auctionStarted = true;
        auction.auctionEnded = false;
        auction.nft = _nft;
        auction.seller = payable(msg.sender);
        auction.duration = time * (1 seconds);
        auction.endAt = block.timestamp + auction.duration;
        auction.highestBid = _startingBid;

        auction.nft.transferFrom(msg.sender, address(this), auction.nftId);
        allAuctions[_nftId] = auction;
        auctioncounter += 1;
        emit Start(_nftId, msg.sender, block.timestamp, auction.duration);
    }

    function bid(uint256 _nftId) external payable {
        require(
            allAuctions[_nftId].auctionStarted == true,
            "auction should have already started for this NFT"
        );
        require(block.timestamp < allAuctions[_nftId].endAt, "ended");
        require(msg.value > allAuctions[_nftId].highestBid, "value < highest");
        require(
            msg.sender != allAuctions[_nftId].seller,
            "seller not allowed to bid"
        );

        if (allAuctions[_nftId].highestBidder != address(0)) {
            payable(allAuctions[_nftId].highestBidder).transfer(
                allAuctions[_nftId].highestBid
            );
        }

        allAuctions[_nftId].highestBidder = msg.sender;
        allAuctions[_nftId].highestBid = msg.value;

        emit Bid(
            allAuctions[_nftId].nftId,
            msg.sender,
            msg.value,
            allAuctions[_nftId].nft
        );
    }

    function end(uint256 _nftId) external {
        require(allAuctions[_nftId].auctionStarted == true);
        require(block.timestamp >= allAuctions[_nftId].endAt);
        require(allAuctions[_nftId].auctionEnded == false);
        require(msg.sender == allAuctions[_nftId].seller);

        allAuctions[_nftId].auctionEnded = true;
        allAuctions[_nftId].auctionStarted = false;

        if (allAuctions[_nftId].highestBidder != address(0)) {
            allAuctions[_nftId].nft.safeTransferFrom(
                address(this),
                allAuctions[_nftId].highestBidder,
                allAuctions[_nftId].nftId
            );
            allAuctions[_nftId].seller.transfer(allAuctions[_nftId].highestBid);
        } else {
            allAuctions[_nftId].nft.safeTransferFrom(
                address(this),
                allAuctions[_nftId].seller,
                allAuctions[_nftId].nftId
            );
        }

        emit End(
            allAuctions[_nftId].highestBidder,
            allAuctions[_nftId].highestBid
        );
    }
}
