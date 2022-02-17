/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC721MockContract,
  ERC721MockContractInterface,
} from "../ERC721MockContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200175e3803806200175e8339810160408190526200003491620001c7565b8151829082906200004d9060009060208501906200006e565b508051620000639060019060208401906200006e565b505050505062000281565b8280546200007c906200022e565b90600052602060002090601f016020900481019282620000a05760008555620000eb565b82601f10620000bb57805160ff1916838001178555620000eb565b82800160010185558215620000eb579182015b82811115620000eb578251825591602001919060010190620000ce565b50620000f9929150620000fd565b5090565b5b80821115620000f95760008155600101620000fe565b600082601f83011262000125578081fd5b81516001600160401b03808211156200014257620001426200026b565b604051601f8301601f19908116603f011681019082821181831017156200016d576200016d6200026b565b8160405283815260209250868385880101111562000189578485fd5b8491505b83821015620001ac57858201830151818301840152908201906200018d565b83821115620001bd57848385830101525b9695505050505050565b60008060408385031215620001da578182fd5b82516001600160401b0380821115620001f1578384fd5b620001ff8683870162000114565b9350602085015191508082111562000215578283fd5b50620002248582860162000114565b9150509250929050565b600181811c908216806200024357607f821691505b602082108114156200026557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6114cd80620002916000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101e1578063b88d4fde146101f4578063c87b56dd14610207578063e985e9c51461021a57600080fd5b80636352211e146101a557806370a08231146101b857806395d89b41146101d957600080fd5b8063095ea7b3116100c8578063095ea7b31461015757806323b872dd1461016c57806340c10f191461017f57806342842e0e1461019257600080fd5b806301ffc9a7146100ef57806306fdde0314610117578063081812fc1461012c575b600080fd5b6101026100fd366004611292565b610256565b60405190151581526020015b60405180910390f35b61011f6102a8565b60405161010e9190611379565b61013f61013a3660046112ca565b61033a565b6040516001600160a01b03909116815260200161010e565b61016a610165366004611269565b6103d4565b005b61016a61017a36600461111f565b6104ea565b61016a61018d366004611269565b610571565b61016a6101a036600461111f565b61057f565b61013f6101b33660046112ca565b61059a565b6101cb6101c63660046110d3565b610625565b60405190815260200161010e565b61011f6106bf565b61016a6101ef36600461122f565b6106ce565b61016a61020236600461115a565b610793565b61011f6102153660046112ca565b610821565b6101026102283660046110ed565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061028757506001600160e01b03198216635b5e139f60e01b145b806102a257506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102b7906113fb565b80601f01602080910402602001604051908101604052809291908181526020018280546102e3906113fb565b80156103305780601f1061030557610100808354040283529160200191610330565b820191906000526020600020905b81548152906001019060200180831161031357829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166103b85760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103df8261059a565b9050806001600160a01b0316836001600160a01b0316141561044d5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103af565b336001600160a01b038216148061046957506104698133610228565b6104db5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103af565b6104e58383610917565b505050565b6104f43382610992565b6105665760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016103af565b6104e5838383610a89565b61057b8282610c4a565b5050565b6104e583838360405180602001604052806000815250610793565b6000818152600260205260408120546001600160a01b0316806102a25760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e000000000000000000000000000000000000000000000060648201526084016103af565b60006001600160a01b0382166106a35760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f20616464726573730000000000000000000000000000000000000000000060648201526084016103af565b506001600160a01b031660009081526003602052604090205490565b6060600180546102b7906113fb565b6001600160a01b0382163314156107275760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103af565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61079d3383610992565b61080f5760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016103af565b61081b84848484610d99565b50505050565b6000818152600260205260409020546060906001600160a01b03166108ae5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e000000000000000000000000000000000060648201526084016103af565b60006108c560408051602081019091526000815290565b905060008151116108e55760405180602001604052806000815250610910565b806108ef84610e22565b60405160200161090092919061130e565b6040516020818303038152906040525b9392505050565b6000818152600460205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03841690811790915581906109598261059a565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610a0b5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103af565b6000610a168361059a565b9050806001600160a01b0316846001600160a01b03161480610a515750836001600160a01b0316610a468461033a565b6001600160a01b0316145b80610a8157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610a9c8261059a565b6001600160a01b031614610b185760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e000000000000000000000000000000000000000000000060648201526084016103af565b6001600160a01b038216610b7a5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103af565b610b85600082610917565b6001600160a01b0383166000908152600360205260408120805460019290610bae9084906113b8565b90915550506001600160a01b0382166000908152600360205260408120805460019290610bdc90849061138c565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610ca05760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103af565b6000818152600260205260409020546001600160a01b031615610d055760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103af565b6001600160a01b0382166000908152600360205260408120805460019290610d2e90849061138c565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b610da4848484610a89565b610db084848484610f54565b61081b5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016103af565b606081610e465750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610e705780610e5a81611436565b9150610e699050600a836113a4565b9150610e4a565b60008167ffffffffffffffff811115610e9957634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610ec3576020820181803683370190505b5090505b8415610a8157610ed86001836113b8565b9150610ee5600a86611451565b610ef090603061138c565b60f81b818381518110610f1357634e487b7160e01b600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350610f4d600a866113a4565b9450610ec7565b60006001600160a01b0384163b156110ac57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610f9890339089908890889060040161133d565b602060405180830381600087803b158015610fb257600080fd5b505af1925050508015610fe2575060408051601f3d908101601f19168201909252610fdf918101906112ae565b60015b611092573d808015611010576040519150601f19603f3d011682016040523d82523d6000602084013e611015565b606091505b50805161108a5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016103af565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610a81565b506001949350505050565b80356001600160a01b03811681146110ce57600080fd5b919050565b6000602082840312156110e4578081fd5b610910826110b7565b600080604083850312156110ff578081fd5b611108836110b7565b9150611116602084016110b7565b90509250929050565b600080600060608486031215611133578081fd5b61113c846110b7565b925061114a602085016110b7565b9150604084013590509250925092565b6000806000806080858703121561116f578081fd5b611178856110b7565b9350611186602086016110b7565b925060408501359150606085013567ffffffffffffffff808211156111a9578283fd5b818701915087601f8301126111bc578283fd5b8135818111156111ce576111ce611491565b604051601f8201601f19908116603f011681019083821181831017156111f6576111f6611491565b816040528281528a602084870101111561120e578586fd5b82602086016020830137918201602001949094529598949750929550505050565b60008060408385031215611241578182fd5b61124a836110b7565b91506020830135801515811461125e578182fd5b809150509250929050565b6000806040838503121561127b578182fd5b611284836110b7565b946020939093013593505050565b6000602082840312156112a3578081fd5b8135610910816114a7565b6000602082840312156112bf578081fd5b8151610910816114a7565b6000602082840312156112db578081fd5b5035919050565b600081518084526112fa8160208601602086016113cf565b601f01601f19169290920160200192915050565b600083516113208184602088016113cf565b8351908301906113348183602088016113cf565b01949350505050565b60006001600160a01b0380871683528086166020840152508360408301526080606083015261136f60808301846112e2565b9695505050505050565b60208152600061091060208301846112e2565b6000821982111561139f5761139f611465565b500190565b6000826113b3576113b361147b565b500490565b6000828210156113ca576113ca611465565b500390565b60005b838110156113ea5781810151838201526020016113d2565b8381111561081b5750506000910152565b600181811c9082168061140f57607f821691505b6020821081141561143057634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561144a5761144a611465565b5060010190565b6000826114605761146061147b565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b0319811681146114bd57600080fd5b5056fea164736f6c6343000804000a";

type ERC721MockContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721MockContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721MockContract__factory extends ContractFactory {
  constructor(...args: ERC721MockContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC721MockContract";
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721MockContract> {
    return super.deploy(
      name_,
      symbol_,
      overrides || {}
    ) as Promise<ERC721MockContract>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): ERC721MockContract {
    return super.attach(address) as ERC721MockContract;
  }
  connect(signer: Signer): ERC721MockContract__factory {
    return super.connect(signer) as ERC721MockContract__factory;
  }
  static readonly contractName: "ERC721MockContract";
  public readonly contractName: "ERC721MockContract";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721MockContractInterface {
    return new utils.Interface(_abi) as ERC721MockContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721MockContract {
    return new Contract(address, _abi, signerOrProvider) as ERC721MockContract;
  }
}
