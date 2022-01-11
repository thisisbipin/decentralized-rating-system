// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract MetaBT is ERC20 {
    constructor() ERC20("Meta Basket Token", "MetaBT") {
        _mint(
            msg.sender,
            1000000000000000000000000000000000000 * 1000000000000000000
        );
    }
}

contract RatingContract is MetaBT {
    address payable private owner; //The deployer of the contract(store owner)
    mapping(uint256 => uint256) productPrice; // number of wei for each pId
    uint256 private constant rewardTokens = (100 * (1000000000000000000));

    constructor() {
        owner = payable(address(msg.sender));
    }

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function can only be called by the owner"
        );
        _;
    }

    // For storing the ratings and reviews for each product
    struct ProductReview {
        uint256 points;
        uint256 count;
        mapping(address => bool) validateUser;
        Rating[] reviewList;
    }

    // maps the pId (product Id) to the ProductReview object corresponding to that product
    // products are uniquely identified by pId (product ID)
    mapping(uint256 => ProductReview) productReviewMap;

    // For storing the user reviews for each product
    //added time, removed cid
    struct Rating {
        string name;
        uint256 time;
        uint8 star;
        string review;
    }

    //------------------------ Ratings section ---------------------------------

    // Returns the total points the product has received from users
    function getPoints(uint256 pId) public view returns (uint256) {
        return productReviewMap[pId].points;
    }

    // Returns the total count of users who had rated the product
    function getCount(uint256 pId) public view returns (uint256) {
        return productReviewMap[pId].count;
    }

    // Returns the user reviews list for the product
    function getReviewList(uint256 pId) public view returns (Rating[] memory) {
        return productReviewMap[pId].reviewList;
    }

    // minting tokens for the sender as a reward
    function transferMetaB(address to, uint256 rewardT) private {
        _transfer(owner, to, rewardT);
    }

    // Function for users to give rating for a product
    function createRating(
        uint256 pId,
        string memory name,
        uint8 _star,
        string memory _review
    ) public {
        require(
            productReviewMap[pId].validateUser[address(msg.sender)] == true,
            "Your not allowed to rate"
        );
        productReviewMap[pId].validateUser[msg.sender] = false;
        productReviewMap[pId].count += 1;
        productReviewMap[pId].points += _star;
        productReviewMap[pId].reviewList.push(
            Rating(name, block.timestamp, _star, _review)
        );
        transferMetaB(msg.sender, rewardTokens);
    }

    //------------------------------------------------------------------------

    //--------------------------- Buy Product section --------------------------------

    // Function to buy a product and initiate authentication of buyers
    function buyProduct(uint256 pId) public payable {
        require(productPrice[pId] == msg.value, "Please pay the correct price");
        productReviewMap[pId].validateUser[address(msg.sender)] = true;
    }

    //--------------------------------------------------------------------------

    //--------------------------- Owner's section ----------------------------------------

    //implemented owner authentication
    function addOrEditPrice(uint256 pId, uint256 priceWei) public restricted {
        productPrice[pId] = priceWei;
    }

    //To withdraw all contract's balance to the owner
    function withDraw() public restricted {
        owner.transfer(address(this).balance);
    }

    // Owner can mint new tokens
    function mint(uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint new tokens");
        _mint(msg.sender, amount);
    }

    //--------------------------------------------------------------------------
}
