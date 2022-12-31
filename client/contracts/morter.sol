// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
pragma experimental ABIEncoderV2;

import "./propNFT.sol";

contract morter {
    propNFT nftContract;
    address public tc;

    constructor(propNFT _nftcontract) {
        nftContract = _nftcontract;
        tc = msg.sender;
    }

    struct House_property {
        uint256 property_id;
        uint256 price;
        uint256 status;
        address owner;
        address mortgager;
        uint256 mortgageamt;
        uint256 downpayment;
        uint256 capital_to_be_raised;
        uint256 emi_to_be_paid;
        address[] risk_free_investors;
        uint256[] riskFreeInvestorPayment;
        uint256[] riskFreeInvestorInvestment;
        bool firstEmiDone;
        uint256 totalInterestMonths;
        uint256 interestMonthsLeft;
        uint256 nftTokenId;
        uint256 lastEMItimestamp;
    }

    uint256 public propertycounter = 0;

    mapping(uint256 => House_property) public allproperties;

    uint256[] public droppedProperties;

    mapping(uint256 => bool) public dropStatus;

    event dropCollected(address indexed owner, uint indexed nftId,string time);

    function listProperty(uint256 _price, uint256 tokenId) public {
        // will be called by property lister
        House_property memory prop;
        prop.property_id = tokenId;
        prop.price = _price;
        prop.status = 100;
        prop.owner = msg.sender;
        prop.mortgager = address(0);
        prop.mortgageamt = 0;
        prop.capital_to_be_raised = 0;
        prop.nftTokenId = tokenId;
        prop.firstEmiDone = false;
        allproperties[prop.property_id] = prop;
        propertycounter += 1;
        if (_price == 0) {
            droppedProperties.push(tokenId);
            dropStatus[tokenId] = false;
        }
        //nftContract.approveContract(address(this),tokenId);
    }

    //status
    //0 not listed
    //100) newly listed
    //200) mortgage initiated
    //300) risk free investors invested
    //400) final trade done

    function direct_buy_property(
        uint256 property_id,
        uint256 payToSeller,
        uint256 payToTC
    ) public payable {
        //5% commission to TC for direct buying
        //will be called by buyer
        require(allproperties[property_id].status == 100);
        require(allproperties[property_id].price != 0);
        House_property memory prop = allproperties[property_id];
        payable(prop.owner).transfer(payToSeller);
        payable(tc).transfer(payToTC);
        nftContract.transferFromOwnerToMortgager(
            prop.owner,
            msg.sender,
            prop.nftTokenId
        );
        prop.owner = msg.sender;
        prop.status = 0;
        allproperties[property_id] = prop;
    }

    function initiate_mortgage(
        uint256 property_id,
        uint256 mortgage_amt,
        uint256 _emi,
        uint256 interestMonths
    ) public payable {
        //will be called by person who needs house on loan
        require(allproperties[property_id].status == 100);
        require(allproperties[property_id].price != 0);
        require(allproperties[property_id].price > mortgage_amt);
        require(allproperties[property_id].mortgager == address(0));
        require(
            msg.value == allproperties[property_id].price - mortgage_amt,
            "downpayment"
        );
        House_property memory prop = allproperties[property_id];
        prop.mortgager = msg.sender;
        prop.mortgageamt = mortgage_amt;
        prop.downpayment = allproperties[property_id].price - mortgage_amt;
        prop.status = 200;
        prop.capital_to_be_raised = prop.mortgageamt;
        prop.emi_to_be_paid = _emi;
        prop.interestMonthsLeft = interestMonths;
        prop.totalInterestMonths = interestMonths;
        allproperties[property_id] = prop;
    }

    function riskfreeinvest(uint256 property_id, uint256 rf_amount)
        public
        payable
    {
        //will be called by risk free investors everytime they want to invest
        require(rf_amount != 0);
        require(allproperties[property_id].status == 200);
        require(allproperties[property_id].capital_to_be_raised >= rf_amount);
        require(msg.value == rf_amount);
        House_property storage prop = allproperties[property_id];
        prop.capital_to_be_raised = prop.capital_to_be_raised - rf_amount;
        if (prop.capital_to_be_raised == 0) {
            prop.status = 300;
        }
        address[] storage allriskfreeinvestors = prop.risk_free_investors;
        allriskfreeinvestors.push(msg.sender);
        prop.riskFreeInvestorInvestment.push(rf_amount);
        uint256 returnForRFI = tryMul(2, rf_amount); //0.2% fixed returns
        uint256 payToRiskFreeInvestor = tryDiv(returnForRFI, 1000);
        prop.riskFreeInvestorPayment.push(payToRiskFreeInvestor);
        allproperties[property_id] = prop;
    }

    function trade(uint256 property_id) public payable {
        //will be called by trading company to finalise trade
        require(msg.sender == tc);
        require(allproperties[property_id].status == 300);
        House_property memory prop = allproperties[property_id];
        require(msg.value == prop.price - prop.downpayment);
        //prop owner gets his/her price and exits
        payable(prop.owner).transfer(prop.price);
        //here prop.owner is original seller and contract has approval for transfer
        nftContract.transferFromMortgagerToTC(prop.owner, tc, prop.nftTokenId);
        prop.owner = prop.mortgager;
        prop.status = 400;
        allproperties[property_id] = prop;
    }

    function payEmi(uint256 property_id, uint256 penaltyAmount) public payable {
        //will be called by mortgager to pay EMI
        House_property storage prop = allproperties[property_id];
        require(prop.status == 400);
        require(prop.interestMonthsLeft > 0);
        require(msg.sender == prop.mortgager);
        // here penaltyAmount is the total amount after adding 2 emis and penalty
        if (penaltyAmount == 0) require(msg.value == prop.emi_to_be_paid);
        else require(msg.value == penaltyAmount);

        //first emi flag
        if (prop.firstEmiDone == false) {
            prop.firstEmiDone = true;
        }

        // transfer returns to risk free investors
        address[] storage allriskfreeinvestors = prop.risk_free_investors;
        uint256 count_of_rf_investors = allriskfreeinvestors.length;
        uint256 totalRiskFreePayment = 0;
        for (uint256 i = 0; i < count_of_rf_investors; i++) {
            payable(allriskfreeinvestors[i]).transfer(
                prop.riskFreeInvestorPayment[i]
            );
            totalRiskFreePayment += prop.riskFreeInvestorPayment[i];
        }

        //pay rest of amount to trading company
        uint256 payToTC = 0;
        if (penaltyAmount == 0) {
            payToTC = prop.emi_to_be_paid - totalRiskFreePayment;
            prop.interestMonthsLeft = prop.interestMonthsLeft - 1;
        } else {
            payToTC = penaltyAmount - totalRiskFreePayment;
            prop.interestMonthsLeft = prop.interestMonthsLeft - 2;
        }

        payable(tc).transfer(payToTC);

        //store last emi timestamp
        prop.lastEMItimestamp = block.timestamp;

        // If last emi successfully paid then,
        if (prop.interestMonthsLeft == 0) {
            //nft transferred to mortgager
            nftContract.transferFromTCToMortgager(
                tc,
                prop.mortgager,
                prop.nftTokenId
            );

            // transfer investment to risk free investors
            address[] storage allriskfreeinvestors1 = prop.risk_free_investors;
            uint256 count_of_rf_investors1 = allriskfreeinvestors1.length;
            for (uint256 i = 0; i < count_of_rf_investors1; i++) {
                payable(allriskfreeinvestors1[i]).transfer(
                    prop.riskFreeInvestorInvestment[i]
                );
            }

            // reset attributes of property so that it can be sold again
            prop.price = 0;
            prop.status = 0;
            prop.mortgager = address(0);
            prop.mortgageamt = 0;
            prop.downpayment = 0;
            prop.capital_to_be_raised = 0;
            delete prop.risk_free_investors;
            delete prop.riskFreeInvestorPayment;
            delete prop.riskFreeInvestorInvestment;
            prop.firstEmiDone = false;
            prop.lastEMItimestamp = 0;
        }

        allproperties[property_id] = prop;
    }

    function snatchNFT(uint256 property_id) public payable {
        House_property storage prop = allproperties[property_id];
        require(msg.sender == tc);
        require(msg.value == prop.price);
        uint256 no_of_months_emi_paid = prop.totalInterestMonths -
            prop.interestMonthsLeft;
        uint256 totalEMIPaid = tryMul(
            no_of_months_emi_paid,
            prop.emi_to_be_paid
        );
        uint256 totalEMItoBePaid = tryMul(
            prop.totalInterestMonths,
            prop.emi_to_be_paid
        );
        // If mortgager defaults then, calculate his liabilities
        uint256 actualLiability = totalEMItoBePaid - totalEMIPaid;
        uint256 buyerExitAmount = prop.price - actualLiability;

        // trading company snatches the property and sends remaining amount to mortgager and mortgager exits
        payable(prop.mortgager).transfer(buyerExitAmount);

        // transfer investment to risk free investors
        address[] storage allriskfreeinvestors = prop.risk_free_investors;
        uint256 count_of_rf_investors = allriskfreeinvestors.length;
        for (uint256 i = 0; i < count_of_rf_investors; i++) {
            payable(allriskfreeinvestors[i]).transfer(
                prop.riskFreeInvestorInvestment[i]
            );
        }

        // reset attributes of property so that it can be sold again
        prop.price = 0;
        prop.status = 0;
        prop.owner = tc;
        prop.mortgager = address(0);
        prop.mortgageamt = 0;
        prop.downpayment = 0;
        prop.capital_to_be_raised = 0;
        delete prop.risk_free_investors;
        delete prop.riskFreeInvestorPayment;
        delete prop.riskFreeInvestorInvestment;
        prop.firstEmiDone = false;
        prop.lastEMItimestamp = 0;

        allproperties[property_id] = prop;
    }

    function getDropProperty(uint256 property_id,string memory time) public {
        House_property storage prop = allproperties[property_id];
        require(prop.price == 0);
        nftContract.transferFromOwnerToMortgager(
            prop.owner,
            msg.sender,
            prop.nftTokenId
        );
        dropStatus[property_id] = true;
        prop.owner = msg.sender;
        prop.status = 0;
        allproperties[property_id] = prop;
        emit dropCollected(msg.sender,property_id,time);
    }

    function getAllDroppedProperties() public view returns (uint256[] memory) {
        return droppedProperties;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getHouseDetails(uint256 property_id)
        public
        view
        returns (House_property memory)
    {
        return allproperties[property_id];
    }

    function getAddresses(uint256 property_id)
        public
        view
        returns (address[] memory)
    {
        return allproperties[property_id].risk_free_investors;
    }

    function getRiskFreeInvestorInvestment(uint256 property_id)
        public
        view
        returns (uint256[] memory)
    {
        return allproperties[property_id].riskFreeInvestorInvestment;
    }

    function getRiskFreeInvestorPayment(uint256 property_id)
        public
        view
        returns (uint256[] memory)
    {
        return allproperties[property_id].riskFreeInvestorPayment;
    }

    function tryMul(uint256 a, uint256 b) internal pure returns (uint256) {
        unchecked {
            if (a == 0) return (0);
            uint256 c = a * b;
            if (c / a != b) return (0);
            return (c);
        }
    }

    function tryDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        unchecked {
            if (b == 0) return (0);
            return (a / b);
        }
    }

    function depositEther() public payable {
        require(msg.sender == tc);
    }

    function withdrawEther() public payable {
        require(msg.sender == tc);
        payable(tc).transfer(address(this).balance);
    }
}
