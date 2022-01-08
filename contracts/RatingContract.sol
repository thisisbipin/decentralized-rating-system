pragma solidity ^0.8.9;

contract RatingContract {

    mapping(uint => uint) productPrice; // number of wei for each pId

    uint curPendingBuyers = 0;
    uint constant rewardInWei = 4200000000000000;

    address payable private owner; //The deployer of the contract(store owner)

    constructor() {
        owner = payable(address(msg.sender));
    }

    //owner access modifier
    modifier restricted() {
        require(msg.sender == owner,"This function can only be called by the owner");
        _;
    }

    // For storing the ratings and reviews for each product
    struct ProductReview {
        uint points;
        uint count;
        mapping(address => bool) validateUser;
        Rating[] reviewList;
    }

    // maps the pId (product Id) to the ProductReview object corresponding to that product
    // products are uniquely identified by pId (product ID)    
    mapping(uint => ProductReview) productReviewMap;
    
    // For storing the user reviews for each product
        //added time, removed cid
    struct Rating {
        string name;
        uint time;
        uint8 star;
        string review;
    }
    
    //------------------------ Ratings section ---------------------------------
    // Returns the total points the product has received from users
    function getPoints(uint pId) public view returns (uint) {
        return productReviewMap[pId].points;
    }
    
    // Returns the total count of users who had rated the product
    function getCount(uint pId) public view returns (uint) {
        return productReviewMap[pId].count;
    }
    
    // Returns the user reviews list for the product  
    function getReviewList(uint pId) public view returns (Rating[] memory) {
        return productReviewMap[pId].reviewList;
    }
    
    // Function for users to give rating for a product
    function createRating(uint pId, string memory name, uint8 _star, string memory _review) public {
        require(productReviewMap[pId].validateUser[address(msg.sender)]==true,"You are not allowed to rate");
        productReviewMap[pId].validateUser[msg.sender]=false;
        productReviewMap[pId].count+=1;
        productReviewMap[pId].points+=_star;
        productReviewMap[pId].reviewList.push(Rating(name,block.timestamp, _star, _review));
        payable(msg.sender).transfer(rewardInWei);
        curPendingBuyers--;   
    }

    //------------------------------------------------------------------------


    //--------------------------- Buy Product section --------------------------------
    // Function to buy a product and initiate authentication of buyers
    function buyProduct(uint pId) public payable {
        require(productPrice[pId]==msg.value,"Please pay the correct price");
        productReviewMap[pId].validateUser[address(msg.sender)] = true;
        curPendingBuyers++;
        
    }

    //--------------------------- Owner section --------------------------------

    //implemented owner authentication
    function addOrEditPrice(uint pId,uint priceWei) public restricted {
        productPrice[pId] = priceWei;
    }

    //To withdraw all contract's balance to the owner
    function withDraw() public restricted {
        owner.transfer(address(this).balance - (rewardInWei*curPendingBuyers));
    }

    //--------------------------------------------------------------------------
    
}