//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTSwap is ReentrancyGuard {
    struct ListedToken {
        address owner;
        address contractAddr;
        uint256 tokenId;
        string description;
    }

    ListedToken[] public listedTokens;

    mapping(address => uint256[]) public ownerTokens;

    // For convenience
    mapping(address => mapping(uint256 => uint256))
        public tokenIndexInOwnerTokens;

    struct Offer {
        address offerer;
        uint256 requestedIndex;
        uint256 offeredIndex;
        int256 exchangeValue;
        uint256 expires;
    }

    Offer[] public offers;

    event TokenListed(
        address indexed contractAddr,
        uint256 indexed tokenId,
        string description
    );
    event TokenUnlisted(address indexed contractAddr, uint256 indexed tokenId);
    event OfferMade(
        address requestedContractAddr,
        uint256 requestedTokenId,
        address offeredContractAddr,
        uint256 offeredTokenId,
        int256 exchangeValue,
        uint256 expires
    );
    event OfferTaken(
        address takenContractAddr,
        uint256 takenTokenId,
        address givenContractAddr,
        uint256 givenTokenId,
        int256 exchangeValue
    );
    event OfferCancelled(
        address requestedContractAddr,
        uint256 requestedTokenId,
        address offeredContractAddr,
        uint256 offeredTokenId,
        int256 exchangeValue,
        uint256 expires
    );

    constructor() {
        // This is for starting listed tokens id's from 1, since listed token id 0 have a special meaning (see below)

        listedTokens[0] = ListedToken({
            owner: address(0),
            contractAddr: address(0),
            tokenId: 0,
            description: ""
        });
    }

    function escrowToken(
        address _contractAddr,
        uint256 _tokenId,
        string calldata _description
    ) external returns (uint256) {
        listedTokens.push(
            ListedToken({
                owner: msg.sender,
                contractAddr: _contractAddr,
                tokenId: _tokenId,
                description: _description
            })
        );

        uint256 listedTokenIndex = listedTokens.length;

        ownerTokens[msg.sender].push(listedTokenIndex - 1);
        uint256 ownerTokenIndex = ownerTokens[msg.sender].length;

        tokenIndexInOwnerTokens[_contractAddr][_tokenId] = ownerTokenIndex - 1;

        // This requires the token to be approved which should be handled by the UI
        IERC721(_contractAddr).transferFrom(
            msg.sender,
            address(this),
            _tokenId
        );

        emit TokenListed(_contractAddr, _tokenId, _description);

        return listedTokenIndex - 1;
    }

    function withdrawToken(uint256 _listedTokenIndex) external nonReentrant {
        ListedToken storage withdrawnListedToken = listedTokens[
            _listedTokenIndex
        ];
        require(
            withdrawnListedToken.owner == msg.sender,
            "Sender is not allowed"
        );

        if (
            tokenIndexInOwnerTokens[withdrawnListedToken.contractAddr][
                withdrawnListedToken.tokenId
            ] != ownerTokens[msg.sender].length - 1
        ) {
            uint256 movedListedTokenIndex = ownerTokens[msg.sender][
                ownerTokens[msg.sender].length - 1
            ];

            ownerTokens[msg.sender][
                tokenIndexInOwnerTokens[withdrawnListedToken.contractAddr][
                    withdrawnListedToken.tokenId
                ]
            ] = movedListedTokenIndex;

            // Update moved token's index in owner tokens
            ListedToken storage movedListedToken = listedTokens[
                movedListedTokenIndex
            ];
            tokenIndexInOwnerTokens[movedListedToken.contractAddr][
                movedListedToken.tokenId
            ] = tokenIndexInOwnerTokens[withdrawnListedToken.contractAddr][
                withdrawnListedToken.tokenId
            ];
        }

        ownerTokens[msg.sender].pop();
        delete tokenIndexInOwnerTokens[withdrawnListedToken.contractAddr][
            withdrawnListedToken.tokenId
        ];

        IERC721(withdrawnListedToken.contractAddr).safeTransferFrom(
            address(this),
            msg.sender,
            withdrawnListedToken.tokenId
        );

        emit TokenUnlisted(
            withdrawnListedToken.contractAddr,
            withdrawnListedToken.tokenId
        );

        delete listedTokens[_listedTokenIndex];
    }

    // Makes an offer for the token listed at _requestedIndex for the token listed at _offeredIndex
    function makeOffer(
        uint256 _requestedIndex,
        uint256 _offeredIndex,
        int256 _exchangeValue,
        uint256 _expiresIn
    ) external payable returns (uint256) {
        // exchangeValue is the amount of funds which is offered part of the deal. Can be positive or negative.
        // If it's positive, the exact amount must have been send with this transaction
        require(
            _exchangeValue <= 0 || msg.value == uint256(_exchangeValue),
            "Exchange value is <= 0 and msg.value is not equal to it"
        );

        require(
            _exchangeValue >= 0 || msg.value == 0,
            "Exchange value is positive and message value is not zero"
        );

        require(_expiresIn > 0, "Expire time must be greater than 0");

        ListedToken storage requestedToken = listedTokens[_requestedIndex];

        // Can not make offers to non-listed token
        require(
            requestedToken.owner != address(0),
            "Cannot make offers to a non-listed token"
        );

        ListedToken storage offeredToken = listedTokens[_offeredIndex];

        require(offeredToken.owner == msg.sender);

        offers.push(
            Offer({
                offerer: msg.sender,
                requestedIndex: _requestedIndex,
                offeredIndex: _offeredIndex,
                exchangeValue: _exchangeValue,
                expires: block.number + _expiresIn
            })
        );
        uint256 index = offers.length;

        emit OfferMade(
            requestedToken.contractAddr,
            requestedToken.tokenId,
            offeredToken.contractAddr,
            offeredToken.tokenId,
            _exchangeValue,
            block.number + _expiresIn
        );

        return index - 1;
    }

    // Makes an offer for the token listed at _requestedIndex with the sent funds (without offering a token in return)
    function makeOfferWithFunds(uint256 _requestedIndex, uint256 _expiresIn)
        external
        payable
        returns (uint256)
    {
        require(_expiresIn > 0, "Expire time must be greater than 0");

        ListedToken storage requestedToken = listedTokens[_requestedIndex];

        // Can not make offers to delisted token
        require(
            requestedToken.owner != address(0),
            "Cannot make offers to a delisted token"
        );

        offers.push(
            Offer({
                offerer: msg.sender,
                requestedIndex: _requestedIndex,
                offeredIndex: 0, // 0 means no token is offered (listed token id's start from 1, see constructor)
                exchangeValue: int256(msg.value), // Exchange value is equal to the amount sent
                expires: block.number + _expiresIn
            })
        );

        uint256 index = offers.length;

        emit OfferMade(
            requestedToken.contractAddr,
            requestedToken.tokenId,
            address(0),
            0,
            int256(msg.value),
            block.number + _expiresIn
        );

        return index - 1;
    }

    function takeOffer(uint256 _offerId) external payable {
        Offer storage offer = offers[_offerId];
        require(offer.expires > block.number, "Offer already expired");

        // Negative exchangeValue means offerer wants to receive funds in part of the deal
        // In that case the exact amount of funds must have been send
        require(
            offer.exchangeValue >= 0 ||
                msg.value == uint256(-offer.exchangeValue)
        );

        // If exchangeValue is greater than or equal to 0, no funds accepted
        require(
            offer.exchangeValue < 0 || msg.value == 0,
            "Exchange value is not >= 0 and msg.value is not 0"
        );

        ListedToken storage givenToken = listedTokens[offer.requestedIndex];
        require(
            givenToken.owner == msg.sender,
            "Address not accepted to take offer"
        );

        givenToken.owner = offer.offerer;

        uint256 givenTokenIndex = tokenIndexInOwnerTokens[
            givenToken.contractAddr
        ][givenToken.tokenId];

        ListedToken storage takenToken = listedTokens[offer.offeredIndex];

        // If this is a "cash-only" offer
        if (takenToken.owner == address(0)) {
            // We are actually checking if null
            uint256 toBeMovedTokenIndex = ownerTokens[msg.sender].length - 1;

            if (givenTokenIndex != toBeMovedTokenIndex) {
                ownerTokens[msg.sender][givenTokenIndex] = ownerTokens[
                    msg.sender
                ][toBeMovedTokenIndex];

                ListedToken storage toBeMovedToken = listedTokens[
                    ownerTokens[msg.sender][toBeMovedTokenIndex]
                ];
                tokenIndexInOwnerTokens[toBeMovedToken.contractAddr][
                    toBeMovedToken.tokenId
                ] = givenTokenIndex;
            }

            ownerTokens[msg.sender].pop();

            ownerTokens[offer.offerer].push(offer.requestedIndex);

            uint256 newIndex = ownerTokens[offer.offerer].length - 1;

            tokenIndexInOwnerTokens[givenToken.contractAddr][
                givenToken.tokenId
            ] = newIndex;

            payable(msg.sender).transfer(uint256(offer.exchangeValue));

            emit OfferTaken(
                address(0),
                0,
                givenToken.contractAddr,
                givenToken.tokenId,
                offer.exchangeValue
            );
        } else {
            // Cash only offer
            takenToken.owner = msg.sender;

            uint256 takenTokenIndex = tokenIndexInOwnerTokens[
                takenToken.contractAddr
            ][takenToken.tokenId];

            uint256 temp = ownerTokens[msg.sender][givenTokenIndex];
            ownerTokens[msg.sender][givenTokenIndex] = ownerTokens[
                offer.offerer
            ][takenTokenIndex];
            ownerTokens[offer.offerer][takenTokenIndex] = temp;

            temp = tokenIndexInOwnerTokens[givenToken.contractAddr][
                givenToken.tokenId
            ];
            tokenIndexInOwnerTokens[givenToken.contractAddr][
                givenToken.tokenId
            ] = tokenIndexInOwnerTokens[takenToken.contractAddr][
                takenToken.tokenId
            ];
            tokenIndexInOwnerTokens[takenToken.contractAddr][
                takenToken.tokenId
            ] = temp;

            // Transfer exchange value if required. If the value is 0, no funds are transferred
            if (offer.exchangeValue > 0) {
                // We have positive value, meaning offerer pays
                payable(msg.sender).transfer(uint256(offer.exchangeValue));
            } else if (offer.exchangeValue < 0) {
                // We have negative value, meaning offerer receives
                payable(offer.offerer).transfer(uint256(-offer.exchangeValue));
            }

            emit OfferTaken(
                takenToken.contractAddr,
                takenToken.tokenId,
                givenToken.contractAddr,
                givenToken.tokenId,
                offer.exchangeValue
            );
        }

        // Remove offer since it's taken
        delete offers[_offerId];
    }

    // This does not remove the approval of the token
    function cancelOffer(uint256 _offerId) external {
        Offer storage offer = offers[_offerId];
        require(offer.offerer == msg.sender, "Address not accepted to cancel");

        // Refund to offerer if exchangeValue is greater than 0, which means offerer sent it when making the offer
        if (offer.exchangeValue > 0) {
            payable(offer.offerer).transfer(uint256(offer.exchangeValue));
        }

        ListedToken storage requestedToken = listedTokens[offer.requestedIndex];
        ListedToken storage offeredToken = listedTokens[offer.offeredIndex];

        emit OfferCancelled(
            requestedToken.contractAddr,
            requestedToken.tokenId,
            offeredToken.contractAddr,
            offeredToken.tokenId,
            offer.exchangeValue,
            offer.expires
        );

        delete offers[_offerId];
    }
}
