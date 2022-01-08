pragma solidity ^0.8.9;

contract RatingContract {
    
    // For storing the ratings and reviews for each product
    struct ProductReview {
        uint points;
        uint count;
        Rating[] reviewList;
    }
    
    // maps the pId (product Id) to the ProductReview object corresponding to that product
    // products are uniquely identified by pId (product ID)
    mapping(uint => ProductReview) productReviewMap;
    
    // For storing the user reviews for each product
    struct Rating {
        uint id;
        string cId;
        uint8 star;
        string review;
    }
    
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
    function createRating(uint pId, string memory _cId, uint8 _star, string memory _review) public {
        productReviewMap[pId].count+=1;
        productReviewMap[pId].points+=_star;
        productReviewMap[pId].reviewList.push(Rating(productReviewMap[pId].count, _cId, _star, _review));
    
    }
    
}