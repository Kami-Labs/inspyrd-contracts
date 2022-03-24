/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFTAuction, NFTAuctionInterface } from "../NFTAuction";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "auctionEndPeriod",
        type: "uint64",
      },
    ],
    name: "AuctionPeriodUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "auctionSettler",
        type: "address",
      },
    ],
    name: "AuctionSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftOwner",
        type: "address",
      },
    ],
    name: "AuctionWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "erc20Token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "BidMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "highestBidder",
        type: "address",
      },
    ],
    name: "BidWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "HighestBidTaken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftSeller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "nftHighestBid",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftHighestBidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftRecipient",
        type: "address",
      },
    ],
    name: "NFTTransferredAndSellerPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftSeller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "erc20Token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "minPrice",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "buyNowPrice",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "auctionBidPeriod",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "bidIncreaseRate",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "feeRecipients",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint32[]",
        name: "feePercentages",
        type: "uint32[]",
      },
    ],
    name: "NftAuctionCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_erc20Token",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "_minPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "_buyNowPrice",
        type: "uint128",
      },
      {
        internalType: "uint32",
        name: "_auctionBidPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_bidIncreasePercentage",
        type: "uint32",
      },
      {
        internalType: "address[]",
        name: "_feeRecipients",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "_feePercentages",
        type: "uint32[]",
      },
    ],
    name: "createNewNftAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultAuctionBidPeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultBidIncreasePercentage",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_erc20Token",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "_tokenAmount",
        type: "uint128",
      },
    ],
    name: "makeBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_erc20Token",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "_tokenAmount",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "_nftRecipient",
        type: "address",
      },
    ],
    name: "makeCustomBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "maximumMinPricePercentage",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumBidPercentage",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nftAuctions",
    outputs: [
      {
        internalType: "uint32",
        name: "bidIncreaseRate",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "auctionBidPeriod",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "auctionEnd",
        type: "uint64",
      },
      {
        internalType: "uint128",
        name: "minPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "buyNowPrice",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "nftHighestBid",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "nftHighestBidder",
        type: "address",
      },
      {
        internalType: "address",
        name: "nftSeller",
        type: "address",
      },
      {
        internalType: "address",
        name: "nftRecipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "ERC20Token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOfNFT",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "settleAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "takeHighestBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllFailedCredits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "withdrawAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "withdrawBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600280546001600160801b0319166e01518000001f4000000064000000641790556128d6806100416000396000f3fe6080604052600436106100dd5760003560e01c8063848e5c771161007f578063c24d5a5c11610059578063c24d5a5c1461034f578063cd4eda1c14610362578063ebea602514610386578063f583bac7146103a657600080fd5b8063848e5c77146102fd5780639c0b99661461031d578063b6ad69141461033a57600080fd5b80634cb8ef5b116100bb5780634cb8ef5b146101865780635138b08c146101a8578063565c5172146101c85780637dc409b5146101db57600080fd5b8063186779d5146100e257806320950fc61461012957806337d84a0114610161575b600080fd5b3480156100ee57600080fd5b5060025461010f906c01000000000000000000000000900463ffffffff1681565b60405163ffffffff90911681526020015b60405180910390f35b34801561013557600080fd5b50610149610144366004612431565b6103c6565b6040516001600160a01b039091168152602001610120565b34801561016d57600080fd5b5060025461010f90640100000000900463ffffffff1681565b34801561019257600080fd5b506101a66101a1366004612431565b61044a565b005b3480156101b457600080fd5b506101a66101c3366004612431565b6105da565b6101a66101d63660046124ac565b610690565b3480156101e757600080fd5b506102846101f6366004612431565b600060208181529281526040808220909352908152208054600182015460028301546003840154600485015460059095015463ffffffff8086169664010000000087049091169567ffffffffffffffff600160401b820416956001600160801b03600160801b92839004811696828216969390920416936001600160a01b039182169392821692821691168a565b6040805163ffffffff9b8c1681529a90991660208b015267ffffffffffffffff909716978901979097526001600160801b0394851660608901529284166080880152921660a08601526001600160a01b0391821660c0860152811660e08501529182166101008401521661012082015261014001610120565b34801561030957600080fd5b506101a6610318366004612431565b61078f565b34801561032957600080fd5b5060025461010f9063ffffffff1681565b34801561034657600080fd5b506101a66108dc565b6101a661035d36600461245c565b6109e9565b34801561036e57600080fd5b5060025461010f90600160401b900463ffffffff1681565b34801561039257600080fd5b506101a66103a1366004612431565b610a55565b3480156103b257600080fd5b506101a66103c1366004612511565b610bc7565b6001600160a01b03808316600090815260208181526040808320858452909152812060030154909116806104415760405162461bcd60e51b815260206004820152601160248201527f4e4654206e6f74206465706f736974656400000000000000000000000000000060448201526064015b60405180910390fd5b90505b92915050565b81816104568282610f3e565b156104a35760405162461bcd60e51b815260206004820181905260248201527f5468652061756374696f6e2068617320612076616c696420626964206d6164656044820152606401610438565b6001600160a01b03808516600090815260208181526040808320878452909152902060020154163381146105195760405162461bcd60e51b815260206004820152601560248201527f43616e6e6f742077697468647261772066756e647300000000000000000000006044820152606401610438565b6001600160a01b03851660009081526020818152604080832087845290915290206001810180546002830180546001600160a01b03199081169091556001600160801b0380831690935560049093018054909316909255600160801b9091041661058586868484610fbe565b604080516001600160a01b03881681526020810187905233918101919091527f10d9bddf66f639dd3c5a6ad2db5ae3102c2b468dfb90a4b0da219435f24a970d906060015b60405180910390a1505050505050565b81816105e68282611119565b156106335760405162461bcd60e51b815260206004820152601760248201527f41756374696f6e206973206e6f7420796574206f7665720000000000000000006044820152606401610438565b61063d8484611167565b604080516001600160a01b03861681526020810185905233918101919091527fe6b94748c5d6e0d188a0fcb9b7f2973b01fc0095627f1ec5accdcd9d2e65ca36906060015b60405180910390a150505050565b848461069c8282611119565b6106e85760405162461bcd60e51b815260206004820152601160248201527f41756374696f6e2068617320656e6465640000000000000000000000000000006044820152606401610438565b826001600160a01b03811661073f5760405162461bcd60e51b815260206004820152601860248201527f43616e6e6f7420737065636966792030206164647265737300000000000000006044820152606401610438565b6001600160a01b038881166000908152602081815260408083208b8452909152902060040180546001600160a01b03191691861691909117905561078588888888611336565b5050505050505050565b6001600160a01b03828116600090815260208181526040808320858452909152902060030154839183911633146108085760405162461bcd60e51b815260206004820152600f60248201527f4f6e6c79206e66742073656c6c657200000000000000000000000000000000006044820152606401610438565b6001600160a01b038416600090815260208181526040808320868452909152902060010154600160801b90046001600160801b03166108895760405162461bcd60e51b815260206004820152601360248201527f63616e6e6f74207061796f7574203020626964000000000000000000000000006044820152606401610438565b61089384846114fb565b61089d8484611167565b604080516001600160a01b0386168152602081018590527f711f4eae05533b90c24ff0ae762d6e9e1ef1b2c85d4c484a2913c5201bcbb7c99101610682565b33600090815260016020526040902054806109395760405162461bcd60e51b815260206004820152601660248201527f6e6f206372656469747320746f207769746864726177000000000000000000006044820152606401610438565b3360008181526001602052604080822082905551909190614e2090849084818181858888f193505050503d806000811461098f576040519150601f19603f3d011682016040523d82523d6000602084013e610994565b606091505b50509050806109e55760405162461bcd60e51b815260206004820152600f60248201527f7769746864726177206661696c656400000000000000000000000000000000006044820152606401610438565b5050565b83836109f58282611119565b610a415760405162461bcd60e51b815260206004820152601160248201527f41756374696f6e2068617320656e6465640000000000000000000000000000006044820152606401610438565b610a4d86868686611336565b505050505050565b6040516331a9108f60e11b81526004810182905233906001600160a01b03841690636352211e9060240160206040518083038186803b158015610a9757600080fd5b505afa158015610aab573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610acf9190612415565b6001600160a01b031614610b255760405162461bcd60e51b815260206004820152600d60248201527f4e6f74204e4654206f776e6572000000000000000000000000000000000000006044820152606401610438565b6001600160a01b03821660008181526020818152604080832085845282528083206001810180546fffffffffffffffffffffffffffffffff191690559283556003830180546001600160a01b0319908116909155600590930180549093169092558151928352820183905233908201527fec19f84af4aad6523d37faa19e243c77717842cca9bf492dc5379830cac958d0906060015b60405180910390a15050565b6001600160a01b03808a166000908152602081815260408083208c84529091529020600301548a918a9116331415610c415760405162461bcd60e51b815260206004820181905260248201527f41756374696f6e20616c72656164792073746172746564206279206f776e65726044820152606401610438565b6001600160a01b038281166000908152602081815260408083208584529091529020600301541615610da6576040516331a9108f60e11b8152600481018290526001600160a01b03831690636352211e9060240160206040518083038186803b158015610cad57600080fd5b505afa158015610cc1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce59190612415565b6001600160a01b0316336001600160a01b031614610d455760405162461bcd60e51b815260206004820152601660248201527f53656e64657220646f65736e2774206f776e204e4654000000000000000000006044820152606401610438565b6001600160a01b03821660009081526020818152604080832084845290915281206001810180546fffffffffffffffffffffffffffffffff191690559081556003810180546001600160a01b03199081169091556005909101805490911690555b876001600160801b031660008111610e005760405162461bcd60e51b815260206004820152601160248201527f50726963652063616e6e6f7420626520300000000000000000000000000000006044820152606401610438565b600254869063ffffffff64010000000090910481169082161015610e725760405162461bcd60e51b815260206004820152602360248201527f42696420696e6372656173652070657263656e7461676520657863656564732060448201526203130360ec1b6064820152608401610438565b876000808f6001600160a01b03166001600160a01b0316815260200190815260200160002060008e815260200190815260200160002060000160046101000a81548163ffffffff021916908363ffffffff160217905550866000808f6001600160a01b03166001600160a01b0316815260200190815260200160002060008e815260200190815260200160002060000160006101000a81548163ffffffff021916908363ffffffff160217905550610f2f8d8d8d8d8d8b8b6117b1565b50505050505050505050505050565b6001600160a01b038216600090815260208181526040808320848452909152812054600160801b90046001600160801b03168015801590610fb657506001600160a01b0384166000908152602081815260408083208684529091529020600101546001600160801b03808316600160801b9092041610155b949350505050565b6001600160a01b038481166000908152602081815260408083208784529091529020600501541680156110735760405163a9059cbb60e01b81526001600160a01b0384811660048301526024820184905282169063a9059cbb90604401602060405180830381600087803b15801561103557600080fd5b505af1158015611049573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061106d91906125e4565b50611112565b6000836001600160a01b031683614e2090604051600060405180830381858888f193505050503d80600081146110c5576040519150601f19603f3d011682016040523d82523d6000602084013e6110ca565b606091505b5050905080610a4d576001600160a01b0384166000908152600160205260409020546110f7908490612752565b6001600160a01b038516600090815260016020526040902055505b5050505050565b6001600160a01b038216600090815260208181526040808320848452909152812054600160401b900467ffffffffffffffff16801580610fb6575067ffffffffffffffff1642109392505050565b6001600160a01b03828116600090815260208181526040808320858452909152812060038101546002909101549083169216906111a4858561182e565b6001600160a01b03861660009081526020818152604080832088845290915290206001810180546002830180546001600160a01b03199081169091556001600160801b0380831690935560049093018054909316909255919250600160801b90041661121286868684611891565b6040516323b872dd60e01b81523060048201526001600160a01b038381166024830152604482018790528716906323b872dd90606401600060405180830381600087803b15801561126257600080fd5b505af1158015611276573d6000803e3d6000fd5b505050506001600160a01b038681166000818152602081815260408083208a845282528083206001810180546fffffffffffffffffffffffffffffffff191690559283556003830180546001600160a01b03199081169091556005909301805490931690925581519283528201889052868316908201526001600160801b0383166060820152848216608082015290831660a08201527f8df77c988c9550e96e43a66277f716818a74ed2188cdacb49d790623e6f225719060c0016105ca565b6001600160a01b0384811660009081526020818152604080832087845290915290206003015485918591163314156113b05760405162461bcd60e51b815260206004820152601b60248201527f4f776e65722063616e6e6f7420626964206f6e206f776e204e465400000000006044820152606401610438565b858585856113c0848484846119d3565b61140c5760405162461bcd60e51b815260206004820181905260248201527f42696420746f20626520696e207370656369666965642045524332302f4574686044820152606401610438565b89898861141a838383611a6e565b6114665760405162461bcd60e51b815260206004820152601e60248201527f4e6f7420656e6f7567682066756e647320746f20626964206f6e204e465400006044820152606401610438565b6114718d8d8c611b78565b7fdfd4ac8cb43d5458b7a6f74f2d6461d77d4985704bdbc2fd4c4816444bbfd5e08d8d33348f8f6040516114e9969594939291906001600160a01b03968716815260208101959095529285166040850152606084019190915290921660808201526001600160801b039190911660a082015260c00190565b60405180910390a1610f2f8d8d611cea565b6001600160a01b03828116600081815260208181526040808320868452909152908190206003015490516331a9108f60e11b815260048101859052921691829190636352211e9060240160206040518083038186803b15801561155d57600080fd5b505afa158015611571573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115959190612415565b6001600160a01b031614156116e1576040516323b872dd60e01b81526001600160a01b038281166004830152306024830152604482018490528416906323b872dd90606401600060405180830381600087803b1580156115f457600080fd5b505af1158015611608573d6000803e3d6000fd5b50506040516331a9108f60e11b8152600481018590523092506001600160a01b0386169150636352211e9060240160206040518083038186803b15801561164e57600080fd5b505afa158015611662573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116869190612415565b6001600160a01b0316146116dc5760405162461bcd60e51b815260206004820152601360248201527f6e6674207472616e73666572206661696c6564000000000000000000000000006044820152606401610438565b505050565b6040516331a9108f60e11b81526004810183905230906001600160a01b03851690636352211e9060240160206040518083038186803b15801561172357600080fd5b505afa158015611737573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061175b9190612415565b6001600160a01b0316146116dc5760405162461bcd60e51b815260206004820152601660248201527f53656c6c657220646f65736e2774206f776e204e4654000000000000000000006044820152606401610438565b6117c087878787878787611d30565b7f3379e969de5522101a0f0912ffe00daf15361dbcbf9cd5c328e0dd97aa25cdf98787338888886117f18e8e612015565b6117fb8f8f61206a565b8a8a6040516118139a99989796959493929190612644565b60405180910390a16118258787611cea565b50505050505050565b6001600160a01b038083166000908152602081815260408083208584529091528120600401549091168061188a5750506001600160a01b0380831660009081526020818152604080832085845290915290206002015416610444565b9050610444565b6000805b6001600160a01b0386166000908152602081815260408083208884529091529020600601548110156119bd576001600160a01b038616600090815260208181526040808320888452909152812060070180546119349186918590811061190b57634e487b7160e01b600052603260045260246000fd5b6000918252602090912060088204015460079091166004026101000a900463ffffffff166120a7565b90506119408184612752565b6001600160a01b0388166000908152602081815260408083208a8452909152902060060180549194506119aa91899189918690811061198f57634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b031684610fbe565b50806119b581612854565b915050611895565b506111128585856119ce858761283d565b610fbe565b6001600160a01b038481166000908152602081815260408083208784529091528120600501549091168015611a3e5734158015611a215750836001600160a01b0316816001600160a01b0316145b8015611a3657506000836001600160801b0316115b915050610fb6565b3415801590611a5457506001600160a01b038416155b8015611a36575050506001600160801b0316159392505050565b6001600160a01b0383166000908152602081815260408083208584529091528120600101546001600160801b03168015801590611ad05750806001600160801b031634101580611ad05750806001600160801b0316836001600160801b031610155b15611adf576001915050611b71565b6000612710611aee878761206a565b611afa9061271061276a565b6001600160a01b0388166000908152602081815260408083208a8452909152902060010154611b3f9163ffffffff1690600160801b90046001600160801b03166127ef565b611b4991906127b5565b6001600160801b031690508034101580611b6c575080846001600160801b031610155b925050505b9392505050565b6001600160a01b03838116600090815260208181526040808320868452909152902060050154168015611c75576040516323b872dd60e01b81523360048201523060248201526001600160801b03831660448201526001600160a01b038216906323b872dd90606401602060405180830381600087803b158015611bfb57600080fd5b505af1158015611c0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c3391906125e4565b506001600160a01b038416600090815260208181526040808320868452909152902060010180546001600160801b03808516600160801b029116179055611cb2565b6001600160a01b038416600090815260208181526040808320868452909152902060010180546001600160801b03348116600160801b0291161790555b50506001600160a01b039091166000908152602081815260408083209383529290522060020180546001600160a01b03191633179055565b611cf482826120c0565b15611d0d57611d0382826114fb565b6109e58282611167565b611d178282610f3e565b156109e557611d2682826114fb565b6109e5828261213c565b82846001600160801b0382161580611d6e57506002546001600160801b0382811691611d6b91851690600160401b900463ffffffff166120a7565b10155b611dba5760405162461bcd60e51b815260206004820152601d60248201527f4d696e5072696365203e20383025206f66206275794e6f7750726963650000006044820152606401610438565b83518351808214611e0d5760405162461bcd60e51b815260206004820152601960248201527f526563697069656e747320213d2070657263656e7461676573000000000000006044820152606401610438565b846000805b8251811015611e6257828181518110611e3b57634e487b7160e01b600052603260045260246000fd5b602002602001015182611e4e919061276a565b915080611e5a81612854565b915050611e12565b506127108163ffffffff161115611ebb5760405162461bcd60e51b815260206004820152601e60248201527f4665652070657263656e746167657320657863656564206d6178696d756d00006044820152606401610438565b6001600160a01b038b1615611f28578a6000808f6001600160a01b03166001600160a01b0316815260200190815260200160002060008e815260200190815260200160002060050160006101000a8154816001600160a01b0302191690836001600160a01b031602179055505b6001600160a01b038d166000908152602081815260408083208f845282529091208951611f5d926006909201918b01906121e9565b506001600160a01b038d166000908152602081815260408083208f845282529091208851611f93926007909201918a019061224e565b505050506001600160a01b03999099166000908152602081815260408083209a8352999052979097206001810180546001600160801b039687166fffffffffffffffffffffffffffffffff199091161790558054958516600160801b0295909416949094178355505060030180546001600160a01b0319163317905550505050565b6001600160a01b038216600090815260208181526040808320848452909152812054640100000000900463ffffffff168061188a5750506002546c01000000000000000000000000900463ffffffff16610444565b6001600160a01b03821660009081526020818152604080832084845290915281205463ffffffff168061188a57505060025463ffffffff16610444565b60006127106120b6838561281e565b61044191906127db565b6001600160a01b0382166000908152602081815260408083208484529091528120600101546001600160801b03168015801590610fb657506001600160a01b0384166000908152602081815260408083208684529091529020600101546001600160801b03808316600160801b90920416101591505092915050565b426121478383612015565b63ffffffff166121579190612792565b6001600160a01b03831660008181526020818152604080832086845282529182902080546fffffffffffffffff00000000000000001916600160401b67ffffffffffffffff96871681029190911791829055835194855291840186905204909216918101919091527fc1ce6cc1337b95ed3c849e00bffc0d93e89e5e80cc5d198db838140827ac759490606001610bbb565b82805482825590600052602060002090810192821561223e579160200282015b8281111561223e57825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190612209565b5061224a9291506122f4565b5090565b8280548282559060005260206000209060070160089004810192821561223e5791602002820160005b838211156122bb57835183826101000a81548163ffffffff021916908363ffffffff1602179055509260200192600401602081600301049283019260010302612277565b80156122eb5782816101000a81549063ffffffff02191690556004016020816003010492830192600103026122bb565b505061224a9291505b5b8082111561224a57600081556001016122f5565b600082601f830112612319578081fd5b8135602061232e6123298361272e565b6126fd565b80838252828201915082860187848660051b890101111561234d578586fd5b855b85811015612374578135612362816128b1565b8452928401929084019060010161234f565b5090979650505050505050565b600082601f830112612391578081fd5b813560206123a16123298361272e565b80838252828201915082860187848660051b89010111156123c0578586fd5b855b85811015612374576123d382612401565b845292840192908401906001016123c2565b80356001600160801b03811681146123fc57600080fd5b919050565b803563ffffffff811681146123fc57600080fd5b600060208284031215612426578081fd5b8151610441816128b1565b60008060408385031215612443578081fd5b823561244e816128b1565b946020939093013593505050565b60008060008060808587031215612471578182fd5b843561247c816128b1565b9350602085013592506040850135612493816128b1565b91506124a1606086016123e5565b905092959194509250565b600080600080600060a086880312156124c3578081fd5b85356124ce816128b1565b94506020860135935060408601356124e5816128b1565b92506124f3606087016123e5565b91506080860135612503816128b1565b809150509295509295909350565b60008060008060008060008060006101208a8c03121561252f578384fd5b893561253a816128b1565b985060208a0135975060408a0135612551816128b1565b965061255f60608b016123e5565b955061256d60808b016123e5565b945061257b60a08b01612401565b935061258960c08b01612401565b925060e08a013567ffffffffffffffff808211156125a5578384fd5b6125b18d838e01612309565b93506101008c01359150808211156125c7578283fd5b506125d48c828d01612381565b9150509295985092959850929598565b6000602082840312156125f5578081fd5b81518015158114610441578182fd5b6000815180845260208085019450808401835b8381101561263957815163ffffffff1687529582019590820190600101612617565b509495945050505050565b6001600160a01b038b8116825260208083018c90528a8216604084015289821660608401526001600160801b038981166080850152881660a084015263ffffffff87811660c0850152861660e08401526101406101008401819052855190840181905260009261016085019287810192855b818110156126d45784518416865294820194938201936001016126b6565b50505050508281036101208401526126ec8185612604565b9d9c50505050505050505050505050565b604051601f8201601f1916810167ffffffffffffffff811182821017156127265761272661289b565b604052919050565b600067ffffffffffffffff8211156127485761274861289b565b5060051b60200190565b600082198211156127655761276561286f565b500190565b600063ffffffff8083168185168083038211156127895761278961286f565b01949350505050565b600067ffffffffffffffff8083168185168083038211156127895761278961286f565b60006001600160801b03808416806127cf576127cf612885565b92169190910492915050565b6000826127ea576127ea612885565b500490565b60006001600160801b03808316818516818304811182151516156128155761281561286f565b02949350505050565b60008160001904831182151516156128385761283861286f565b500290565b60008282101561284f5761284f61286f565b500390565b60006000198214156128685761286861286f565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146128c657600080fd5b5056fea164736f6c6343000804000a";

type NFTAuctionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTAuctionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTAuction__factory extends ContractFactory {
  constructor(...args: NFTAuctionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "NFTAuction";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFTAuction> {
    return super.deploy(overrides || {}) as Promise<NFTAuction>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NFTAuction {
    return super.attach(address) as NFTAuction;
  }
  connect(signer: Signer): NFTAuction__factory {
    return super.connect(signer) as NFTAuction__factory;
  }
  static readonly contractName: "NFTAuction";
  public readonly contractName: "NFTAuction";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTAuctionInterface {
    return new utils.Interface(_abi) as NFTAuctionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTAuction {
    return new Contract(address, _abi, signerOrProvider) as NFTAuction;
  }
}
