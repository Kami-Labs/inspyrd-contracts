//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTAuction {
    mapping(address => mapping(uint256 => Auction)) public nftAuctions;
    mapping(address => uint256) failedTransferCredits;

    struct Auction {
        //map token ID to
        uint32 bidIncreaseRate;
        uint32 auctionBidPeriod; //Increments the length of time the auction is open in which a new bid can be made after each bid.
        uint64 auctionEnd;
        uint128 minPrice;
        uint128 buyNowPrice;
        uint128 nftHighestBid;
        address nftHighestBidder;
        address nftSeller;
        address nftRecipient; //The bidder can specify a recipient for the NFT if their bid is successful.
        address ERC20Token; // The seller can specify an ERC20 token that can be used to bid or purchase the NFT.
        address[] feeRecipients;
        uint32[] feePercentages;
    }
    /*
     * Default values that are used if not specified by the NFT seller.
     */
    uint32 public defaultBidIncreasePercentage;
    uint32 public minimumBidPercentage;
    uint32 public maximumMinPricePercentage;
    uint32 public defaultAuctionBidPeriod;

    event NftAuctionCreated(
        address nftContractAddress,
        uint256 tokenId,
        address nftSeller,
        address erc20Token,
        uint128 minPrice,
        uint128 buyNowPrice,
        uint32 auctionBidPeriod,
        uint32 bidIncreaseRate,
        address[] feeRecipients,
        uint32[] feePercentages
    );

    event BidMade(
        address nftContractAddress,
        uint256 tokenId,
        address bidder,
        uint256 ethAmount,
        address erc20Token,
        uint256 tokenAmount
    );

    event AuctionPeriodUpdated(
        address nftContractAddress,
        uint256 tokenId,
        uint64 auctionEndPeriod
    );

    event NFTTransferredAndSellerPaid(
        address nftContractAddress,
        uint256 tokenId,
        address nftSeller,
        uint128 nftHighestBid,
        address nftHighestBidder,
        address nftRecipient
    );

    event AuctionSettled(
        address nftContractAddress,
        uint256 tokenId,
        address auctionSettler
    );

    event AuctionWithdrawn(
        address nftContractAddress,
        uint256 tokenId,
        address nftOwner
    );

    event BidWithdrawn(
        address nftContractAddress,
        uint256 tokenId,
        address highestBidder
    );

    event HighestBidTaken(address nftContractAddress, uint256 tokenId);

    modifier auctionIsValid(address _nftContractAddress, uint256 _tokenId) {
        require(
            nftAuctions[_nftContractAddress][_tokenId].nftSeller != msg.sender,
            "Auction already started by owner"
        );

        if (
            nftAuctions[_nftContractAddress][_tokenId].nftSeller != address(0)
        ) {
            require(
                msg.sender == IERC721(_nftContractAddress).ownerOf(_tokenId),
                "Sender doesn't own NFT"
            );

            _resetAuction(_nftContractAddress, _tokenId);
        }
        _;
    }

    modifier auctionOngoing(address _nftContractAddress, uint256 _tokenId) {
        require(
            _isAuctionOngoing(_nftContractAddress, _tokenId),
            "Auction has ended"
        );
        _;
    }

    modifier priceGreaterThanZero(uint256 _price) {
        require(_price > 0, "Price cannot be 0");
        _;
    }

    modifier minPriceDoesNotExceedLimit(
        uint128 _buyNowPrice,
        uint128 _minPrice
    ) {
        require(
            _buyNowPrice == 0 ||
                _getPortionOfBid(_buyNowPrice, maximumMinPricePercentage) >=
                _minPrice,
            "MinPrice > 80% of buyNowPrice"
        );
        _;
    }

    modifier notNftSeller(address _nftContractAddress, uint256 _tokenId) {
        require(
            msg.sender != nftAuctions[_nftContractAddress][_tokenId].nftSeller,
            "Owner cannot bid on own NFT"
        );
        _;
    }
    modifier onlyNftSeller(address _nftContractAddress, uint256 _tokenId) {
        require(
            msg.sender == nftAuctions[_nftContractAddress][_tokenId].nftSeller,
            "Only nft seller"
        );
        _;
    }
    // The bid amount was either equal the buyNowPrice or it must be higher than the previous

    modifier isFundEnough(
        address _nftContractAddress,
        uint256 _tokenId,
        uint128 _tokenAmount
    ) {
        require(
            _isFundEnough(_nftContractAddress, _tokenId, _tokenAmount),
            "Not enough funds to bid on NFT"
        );
        _;
    }

    modifier minimumBidNotMade(address _nftContractAddress, uint256 _tokenId) {
        require(
            !_isMinimumBidMade(_nftContractAddress, _tokenId),
            "The auction has a valid bid made"
        );
        _;
    }

    modifier paymentAccepted(
        address _nftContractAddress,
        uint256 _tokenId,
        address _erc20Token,
        uint128 _tokenAmount
    ) {
        require(
            _isPaymentAccepted(
                _nftContractAddress,
                _tokenId,
                _erc20Token,
                _tokenAmount
            ),
            "Bid to be in specified ERC20/Eth"
        );
        _;
    }

    modifier isAuctionOver(address _nftContractAddress, uint256 _tokenId) {
        require(
            !_isAuctionOngoing(_nftContractAddress, _tokenId),
            "Auction is not yet over"
        );
        _;
    }

    modifier notZeroAddress(address _address) {
        require(_address != address(0), "Cannot specify 0 address");
        _;
    }

    modifier minPercentage(uint32 _bidIncreasePercentage) {
        require(
            _bidIncreasePercentage >= minimumBidPercentage,
            "Bid increase percentage exceeds 100"
        );
        _;
    }

    modifier isFeePercentagesLessThanMaximum(uint32[] memory _feePercentages) {
        uint32 totalPercent;
        for (uint256 i = 0; i < _feePercentages.length; i++) {
            totalPercent = totalPercent + _feePercentages[i];
        }
        require(totalPercent <= 10000, "Fee percentages exceed maximum");
        _;
    }

    modifier correctFeeRecipientsAndPercentages(
        uint256 _recipientsLength,
        uint256 _percentagesLength
    ) {
        require(
            _recipientsLength == _percentagesLength,
            "Recipients != percentages"
        );
        _;
    }

    // constructor
    constructor() {
        defaultBidIncreasePercentage = 100;
        defaultAuctionBidPeriod = 86400; //1 day
        minimumBidPercentage = 100;
        maximumMinPricePercentage = 8000;
    }

    function _isAuctionOngoing(address _nftContractAddress, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        uint64 auctionEndTimestamp = nftAuctions[_nftContractAddress][_tokenId]
            .auctionEnd;
        //if the auctionEnd is set to 0, the auction is technically on-going, however
        //the minimum bid price (minPrice) has not yet been met.
        return (auctionEndTimestamp == 0 ||
            block.timestamp < auctionEndTimestamp);
    }

    function _isABidMade(address _nftContractAddress, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        return (nftAuctions[_nftContractAddress][_tokenId].nftHighestBid > 0);
    }

    function _isMinimumBidMade(address _nftContractAddress, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        uint128 minPrice = nftAuctions[_nftContractAddress][_tokenId].minPrice;
        return
            minPrice > 0 &&
            (nftAuctions[_nftContractAddress][_tokenId].nftHighestBid >=
                minPrice);
    }

    function _isBuyNowPriceMet(address _nftContractAddress, uint256 _tokenId)
        internal
        view
        returns (bool)
    {
        uint128 buyNowPrice = nftAuctions[_nftContractAddress][_tokenId]
            .buyNowPrice;
        return
            buyNowPrice > 0 &&
            nftAuctions[_nftContractAddress][_tokenId].nftHighestBid >=
            buyNowPrice;
    }

    function _isFundEnough(
        address _nftContractAddress,
        uint256 _tokenId,
        uint128 _tokenAmount
    ) internal view returns (bool) {
        uint128 buyNowPrice = nftAuctions[_nftContractAddress][_tokenId]
            .buyNowPrice;
        //if buyNowPrice is met, ignore increase percentage
        if (
            buyNowPrice > 0 &&
            (msg.value >= buyNowPrice || _tokenAmount >= buyNowPrice)
        ) {
            return true;
        }
        //if the NFT is up for auction, the bid needs to be a % higher than the previous bid
        uint256 bidIncreaseAmount = (nftAuctions[_nftContractAddress][_tokenId]
            .nftHighestBid *
            (10000 +
                _getBidIncreasePercentage(_nftContractAddress, _tokenId))) /
            10000;
        return (msg.value >= bidIncreaseAmount ||
            _tokenAmount >= bidIncreaseAmount);
    }

    function _isPaymentAccepted(
        address _nftContractAddress,
        uint256 _tokenId,
        address _bidERC20Token,
        uint128 _tokenAmount
    ) internal view returns (bool) {
        address auctionERC20Token = nftAuctions[_nftContractAddress][_tokenId]
            .ERC20Token;
        if (_isERC20Auction(auctionERC20Token)) {
            return
                msg.value == 0 &&
                auctionERC20Token == _bidERC20Token &&
                _tokenAmount > 0;
        } else {
            return
                msg.value != 0 &&
                _bidERC20Token == address(0) &&
                _tokenAmount == 0;
        }
    }

    function _isERC20Auction(address _auctionERC20Token)
        internal
        pure
        returns (bool)
    {
        return _auctionERC20Token != address(0);
    }

    /*
     * Returns the percentage of the total bid (used to calculate fee payments)
     */
    function _getPortionOfBid(uint256 _totalBid, uint256 _percentage)
        internal
        pure
        returns (uint256)
    {
        return (_totalBid * (_percentage)) / 10000;
    }

    function _getBidIncreasePercentage(
        address _nftContractAddress,
        uint256 _tokenId
    ) internal view returns (uint32) {
        uint32 bidIncreaseRate = nftAuctions[_nftContractAddress][_tokenId]
            .bidIncreaseRate;

        if (bidIncreaseRate == 0) {
            return defaultBidIncreasePercentage;
        } else {
            return bidIncreaseRate;
        }
    }

    function _getAuctionBidPeriod(address _nftContractAddress, uint256 _tokenId)
        internal
        view
        returns (uint32)
    {
        uint32 auctionBidPeriod = nftAuctions[_nftContractAddress][_tokenId]
            .auctionBidPeriod;

        if (auctionBidPeriod == 0) {
            return defaultAuctionBidPeriod;
        } else {
            return auctionBidPeriod;
        }
    }

    /*
     * The default value for the NFT recipient is the highest bidder
     */
    function _getNftRecipient(address _nftContractAddress, uint256 _tokenId)
        internal
        view
        returns (address)
    {
        address nftRecipient = nftAuctions[_nftContractAddress][_tokenId]
            .nftRecipient;

        if (nftRecipient == address(0)) {
            return nftAuctions[_nftContractAddress][_tokenId].nftHighestBidder;
        } else {
            return nftRecipient;
        }
    }

    function _transferNftToAuctionContract(
        address _nftContractAddress,
        uint256 _tokenId
    ) internal {
        address _nftSeller = nftAuctions[_nftContractAddress][_tokenId]
            .nftSeller;
        if (IERC721(_nftContractAddress).ownerOf(_tokenId) == _nftSeller) {
            IERC721(_nftContractAddress).transferFrom(
                _nftSeller,
                address(this),
                _tokenId
            );
            require(
                IERC721(_nftContractAddress).ownerOf(_tokenId) == address(this),
                "nft transfer failed"
            );
        } else {
            require(
                IERC721(_nftContractAddress).ownerOf(_tokenId) == address(this),
                "Seller doesn't own NFT"
            );
        }
    }

    function _setupAuction(
        address _nftContractAddress,
        uint256 _tokenId,
        address _erc20Token,
        uint128 _minPrice,
        uint128 _buyNowPrice,
        address[] memory _feeRecipients,
        uint32[] memory _feePercentages
    )
        internal
        minPriceDoesNotExceedLimit(_buyNowPrice, _minPrice)
        correctFeeRecipientsAndPercentages(
            _feeRecipients.length,
            _feePercentages.length
        )
        isFeePercentagesLessThanMaximum(_feePercentages)
    {
        if (_erc20Token != address(0)) {
            nftAuctions[_nftContractAddress][_tokenId].ERC20Token = _erc20Token;
        }
        nftAuctions[_nftContractAddress][_tokenId]
            .feeRecipients = _feeRecipients;
        nftAuctions[_nftContractAddress][_tokenId]
            .feePercentages = _feePercentages;
        nftAuctions[_nftContractAddress][_tokenId].buyNowPrice = _buyNowPrice;
        nftAuctions[_nftContractAddress][_tokenId].minPrice = _minPrice;
        nftAuctions[_nftContractAddress][_tokenId].nftSeller = msg.sender;
    }

    function _createNewNftAuction(
        address _nftContractAddress,
        uint256 _tokenId,
        address _erc20Token,
        uint128 _minPrice,
        uint128 _buyNowPrice,
        address[] memory _feeRecipients,
        uint32[] memory _feePercentages
    ) internal {
        // Sending the NFT to this contract
        _setupAuction(
            _nftContractAddress,
            _tokenId,
            _erc20Token,
            _minPrice,
            _buyNowPrice,
            _feeRecipients,
            _feePercentages
        );
        emit NftAuctionCreated(
            _nftContractAddress,
            _tokenId,
            msg.sender,
            _erc20Token,
            _minPrice,
            _buyNowPrice,
            _getAuctionBidPeriod(_nftContractAddress, _tokenId),
            _getBidIncreasePercentage(_nftContractAddress, _tokenId),
            _feeRecipients,
            _feePercentages
        );
        _updateOngoingAuction(_nftContractAddress, _tokenId);
    }

    /**
     * Create an auction that uses the default bid increase percentage
     * & the default auction bid period.
     */

    function createNewNftAuction(
        address _nftContractAddress,
        uint256 _tokenId,
        address _erc20Token,
        uint128 _minPrice,
        uint128 _buyNowPrice,
        uint32 _auctionBidPeriod, //this is the time that the auction lasts until another bid occurs
        uint32 _bidIncreasePercentage,
        address[] memory _feeRecipients,
        uint32[] memory _feePercentages
    )
        external
        auctionIsValid(_nftContractAddress, _tokenId)
        priceGreaterThanZero(_minPrice)
        minPercentage(_bidIncreasePercentage)
    {
        nftAuctions[_nftContractAddress][_tokenId]
            .auctionBidPeriod = _auctionBidPeriod;
        nftAuctions[_nftContractAddress][_tokenId]
            .bidIncreaseRate = _bidIncreasePercentage;
        _createNewNftAuction(
            _nftContractAddress,
            _tokenId,
            _erc20Token,
            _minPrice,
            _buyNowPrice,
            _feeRecipients,
            _feePercentages
        );
    }

    function _makeBid(
        address _nftContractAddress,
        uint256 _tokenId,
        address _erc20Token,
        uint128 _tokenAmount
    )
        internal
        notNftSeller(_nftContractAddress, _tokenId)
        paymentAccepted(
            _nftContractAddress,
            _tokenId,
            _erc20Token,
            _tokenAmount
        )
        isFundEnough(_nftContractAddress, _tokenId, _tokenAmount)
    {
        _updateHighestBid(_nftContractAddress, _tokenId, _tokenAmount);
        emit BidMade(
            _nftContractAddress,
            _tokenId,
            msg.sender,
            msg.value,
            _erc20Token,
            _tokenAmount
        );
        _updateOngoingAuction(_nftContractAddress, _tokenId);
    }

    function makeBid(
        address _nftContractAddress,
        uint256 _tokenId,
        address _erc20Token,
        uint128 _tokenAmount
    ) external payable auctionOngoing(_nftContractAddress, _tokenId) {
        _makeBid(_nftContractAddress, _tokenId, _erc20Token, _tokenAmount);
    }

    function makeCustomBid(
        address _nftContractAddress,
        uint256 _tokenId,
        address _erc20Token,
        uint128 _tokenAmount,
        address _nftRecipient
    )
        external
        payable
        auctionOngoing(_nftContractAddress, _tokenId)
        notZeroAddress(_nftRecipient)
    {
        nftAuctions[_nftContractAddress][_tokenId].nftRecipient = _nftRecipient;
        _makeBid(_nftContractAddress, _tokenId, _erc20Token, _tokenAmount);
    }

    function _updateOngoingAuction(
        address _nftContractAddress,
        uint256 _tokenId
    ) internal {
        if (_isBuyNowPriceMet(_nftContractAddress, _tokenId)) {
            _transferNftToAuctionContract(_nftContractAddress, _tokenId);
            _transferNftAndPaySeller(_nftContractAddress, _tokenId);
            return;
        }
        //min price not set, nft not up for auction yet
        if (_isMinimumBidMade(_nftContractAddress, _tokenId)) {
            _transferNftToAuctionContract(_nftContractAddress, _tokenId);
            _updateAuctionEnd(_nftContractAddress, _tokenId);
        }
    }

    function _updateAuctionEnd(address _nftContractAddress, uint256 _tokenId)
        internal
    {
        //the auction end is always set to now + the bid period
        nftAuctions[_nftContractAddress][_tokenId].auctionEnd =
            _getAuctionBidPeriod(_nftContractAddress, _tokenId) +
            uint64(block.timestamp);
        emit AuctionPeriodUpdated(
            _nftContractAddress,
            _tokenId,
            nftAuctions[_nftContractAddress][_tokenId].auctionEnd
        );
    }

    function _resetAuction(address _nftContractAddress, uint256 _tokenId)
        internal
    {
        nftAuctions[_nftContractAddress][_tokenId].minPrice = 0;
        nftAuctions[_nftContractAddress][_tokenId].buyNowPrice = 0;
        nftAuctions[_nftContractAddress][_tokenId].auctionEnd = 0;
        nftAuctions[_nftContractAddress][_tokenId].auctionBidPeriod = 0;
        nftAuctions[_nftContractAddress][_tokenId].bidIncreaseRate = 0;
        nftAuctions[_nftContractAddress][_tokenId].nftSeller = address(0);
        nftAuctions[_nftContractAddress][_tokenId].ERC20Token = address(0);
    }

    function _resetBids(address _nftContractAddress, uint256 _tokenId)
        internal
    {
        nftAuctions[_nftContractAddress][_tokenId].nftHighestBidder = address(
            0
        );
        nftAuctions[_nftContractAddress][_tokenId].nftHighestBid = 0;
        nftAuctions[_nftContractAddress][_tokenId].nftRecipient = address(0);
    }

    function _updateHighestBid(
        address _nftContractAddress,
        uint256 _tokenId,
        uint128 _tokenAmount
    ) internal {
        address auctionERC20Token = nftAuctions[_nftContractAddress][_tokenId]
            .ERC20Token;
        if (_isERC20Auction(auctionERC20Token)) {
            IERC20(auctionERC20Token).transferFrom(
                msg.sender,
                address(this),
                _tokenAmount
            );
            nftAuctions[_nftContractAddress][_tokenId]
                .nftHighestBid = _tokenAmount;
        } else {
            nftAuctions[_nftContractAddress][_tokenId].nftHighestBid = uint128(
                msg.value
            );
        }
        nftAuctions[_nftContractAddress][_tokenId].nftHighestBidder = msg
            .sender;
    }

    function _reverseAndResetPreviousBid(
        address _nftContractAddress,
        uint256 _tokenId
    ) internal {
        address nftHighestBidder = nftAuctions[_nftContractAddress][_tokenId]
            .nftHighestBidder;

        uint128 nftHighestBid = nftAuctions[_nftContractAddress][_tokenId]
            .nftHighestBid;
        _resetBids(_nftContractAddress, _tokenId);

        _payout(_nftContractAddress, _tokenId, nftHighestBidder, nftHighestBid);
    }

    function _transferNftAndPaySeller(
        address _nftContractAddress,
        uint256 _tokenId
    ) internal {
        address _nftSeller = nftAuctions[_nftContractAddress][_tokenId]
            .nftSeller;
        address _nftHighestBidder = nftAuctions[_nftContractAddress][_tokenId]
            .nftHighestBidder;
        address _nftRecipient = _getNftRecipient(_nftContractAddress, _tokenId);
        uint128 _nftHighestBid = nftAuctions[_nftContractAddress][_tokenId]
            .nftHighestBid;
        _resetBids(_nftContractAddress, _tokenId);

        _payFeesAndSeller(
            _nftContractAddress,
            _tokenId,
            _nftSeller,
            _nftHighestBid
        );
        IERC721(_nftContractAddress).transferFrom(
            address(this),
            _nftRecipient,
            _tokenId
        );

        _resetAuction(_nftContractAddress, _tokenId);
        emit NFTTransferredAndSellerPaid(
            _nftContractAddress,
            _tokenId,
            _nftSeller,
            _nftHighestBid,
            _nftHighestBidder,
            _nftRecipient
        );
    }

    function _payFeesAndSeller(
        address _nftContractAddress,
        uint256 _tokenId,
        address _nftSeller,
        uint256 _highestBid
    ) internal {
        uint256 feesPaid;
        for (
            uint256 i = 0;
            i < nftAuctions[_nftContractAddress][_tokenId].feeRecipients.length;
            i++
        ) {
            uint256 fee = _getPortionOfBid(
                _highestBid,
                nftAuctions[_nftContractAddress][_tokenId].feePercentages[i]
            );
            feesPaid = feesPaid + fee;
            _payout(
                _nftContractAddress,
                _tokenId,
                nftAuctions[_nftContractAddress][_tokenId].feeRecipients[i],
                fee
            );
        }
        _payout(
            _nftContractAddress,
            _tokenId,
            _nftSeller,
            (_highestBid - feesPaid)
        );
    }

    function _payout(
        address _nftContractAddress,
        uint256 _tokenId,
        address _recipient,
        uint256 _amount
    ) internal {
        address auctionERC20Token = nftAuctions[_nftContractAddress][_tokenId]
            .ERC20Token;
        if (_isERC20Auction(auctionERC20Token)) {
            IERC20(auctionERC20Token).transfer(_recipient, _amount);
        } else {
            // attempt to send the funds to the recipient
            (bool success, ) = payable(_recipient).call{
                value: _amount,
                gas: 20000
            }("");
            // if it failed, update their credit balance so they can pull it later
            if (!success) {
                failedTransferCredits[_recipient] =
                    failedTransferCredits[_recipient] +
                    _amount;
            }
        }
    }

    function settleAuction(address _nftContractAddress, uint256 _tokenId)
        external
        isAuctionOver(_nftContractAddress, _tokenId)
    {
        _transferNftAndPaySeller(_nftContractAddress, _tokenId);
        emit AuctionSettled(_nftContractAddress, _tokenId, msg.sender);
    }

    function withdrawAuction(address _nftContractAddress, uint256 _tokenId)
        external
    {
        //only the NFT owner can prematurely close and auction
        require(
            IERC721(_nftContractAddress).ownerOf(_tokenId) == msg.sender,
            "Not NFT owner"
        );
        _resetAuction(_nftContractAddress, _tokenId);
        emit AuctionWithdrawn(_nftContractAddress, _tokenId, msg.sender);
    }

    function withdrawBid(address _nftContractAddress, uint256 _tokenId)
        external
        minimumBidNotMade(_nftContractAddress, _tokenId)
    {
        address nftHighestBidder = nftAuctions[_nftContractAddress][_tokenId]
            .nftHighestBidder;
        require(msg.sender == nftHighestBidder, "Cannot withdraw funds");

        uint128 nftHighestBid = nftAuctions[_nftContractAddress][_tokenId]
            .nftHighestBid;
        _resetBids(_nftContractAddress, _tokenId);

        _payout(_nftContractAddress, _tokenId, nftHighestBidder, nftHighestBid);

        emit BidWithdrawn(_nftContractAddress, _tokenId, msg.sender);
    }

    /*
     * The NFT seller can opt to end an auction by taking the current highest bid.
     */
    function takeHighestBid(address _nftContractAddress, uint256 _tokenId)
        external
        onlyNftSeller(_nftContractAddress, _tokenId)
    {
        require(
            _isABidMade(_nftContractAddress, _tokenId),
            "cannot payout 0 bid"
        );
        _transferNftToAuctionContract(_nftContractAddress, _tokenId);
        _transferNftAndPaySeller(_nftContractAddress, _tokenId);
        emit HighestBidTaken(_nftContractAddress, _tokenId);
    }

    /*
     * Query the owner of an NFT deposited for auction
     */
    function ownerOfNFT(address _nftContractAddress, uint256 _tokenId)
        external
        view
        returns (address)
    {
        address nftSeller = nftAuctions[_nftContractAddress][_tokenId]
            .nftSeller;
        require(nftSeller != address(0), "NFT not deposited");

        return nftSeller;
    }

    /*
     * If the transfer of a bid has failed, allow the recipient to reclaim their amount later.
     */
    function withdrawAllFailedCredits() external {
        uint256 amount = failedTransferCredits[msg.sender];

        require(amount != 0, "no credits to withdraw");

        failedTransferCredits[msg.sender] = 0;

        (bool successfulWithdraw, ) = msg.sender.call{
            value: amount,
            gas: 20000
        }("");
        require(successfulWithdraw, "withdraw failed");
    }
}
