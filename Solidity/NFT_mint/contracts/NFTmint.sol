//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMint is ERC721URIStorage {
    address immutable contractOwnerAddress;

    struct TokenData {
        uint256 price;
        uint256 royaltyToYou;
        uint256 royaltyToCause;
        address userWallet;
    }

    mapping(uint256 => TokenData) public tokenData; // Data of NFT

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdTracker;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        contractOwnerAddress = msg.sender;
    }

    // The function to mint the NFT
    function mintNFT(
        string memory _tokenURI,
        uint256 _price,
        uint256 _royaltyToYou,
        uint256 _royaltyToCause,
        address _userWallet
    ) external {
        // get token id
        uint256 tokenId = _tokenIdTracker.current();

        // mint for person that called function
        _safeMint(msg.sender, tokenId);

        // set token uri based on parameter passed
        _setTokenURI(tokenId, _tokenURI);

        // set the price of NFT
        tokenData[tokenId].price = _price;

        // set the royalty of NFT
        tokenData[tokenId].royaltyToYou = _royaltyToYou;
        tokenData[tokenId].royaltyToCause = _royaltyToCause;
        tokenData[tokenId].userWallet = _userWallet;

        // increments token id count
        _tokenIdTracker.increment();
    }

    // The function to total count of token
    function fetchTokenCount() public view returns (uint256) {
        return _tokenIdTracker.current();
    }

    // The function to approve NFT
    function approveNFT(uint256 _tokenId, address _marketplaceAddress)
        external
    {
        address owner = ownerOf(_tokenId);
        require(owner == msg.sender, "The caller is not owner of this NFT.");

        // Approve the NFT
        approve(_marketplaceAddress, _tokenId);
    }
}
