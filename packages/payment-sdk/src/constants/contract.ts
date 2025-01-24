import { chainKey } from "../types/chain"

export const MULTICALL_ADDRESS = '0x04100CD8DD38346B80040a19895E108CC2423262'

export const MULTICALL_ABI = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "aggregate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes[]",
        "name": "returnData",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "allowFailure",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call3[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "aggregate3",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "allowFailure",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call3Value[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "aggregate3Value",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "blockAndAggregate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "blockHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBasefee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "basefee",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      }
    ],
    "name": "getBlockHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "blockHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBlockNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getChainId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "chainid",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentBlockCoinbase",
    "outputs": [
      {
        "internalType": "address",
        "name": "coinbase",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentBlockDifficulty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "difficulty",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentBlockGasLimit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "gaslimit",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentBlockTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "getEthBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLastBlockHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "blockHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "requireSuccess",
        "type": "bool"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "tryAggregate",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "requireSuccess",
        "type": "bool"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "tryBlockAndAggregate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "blockHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
]

export const paymentContract = (chain: chainKey, isDev: boolean): string => {
    const supported: Partial<{ [chain in chainKey]: string }> = {
      tomo: isDev ? '0x0D60714d3D461D757Bf8E1177B8Ec8440Ca88226' : '0xa89459A0eF22c3e08FeC9450dbE74C6Aa1df6752',
    }
    return supported[chain] as string
}

export const PAYMENT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "feeReceiver",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "admin",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "status",
          "type": "bool"
        }
      ],
      "name": "AdminUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "admins",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "bool[]",
          "name": "status",
          "type": "bool[]"
        }
      ],
      "name": "AdminsUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "feeReceiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "protocolFee",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "commissionFee",
              "type": "uint256"
            }
          ],
          "indexed": false,
          "internalType": "struct MultiPayment2.PartnerInfo",
          "name": "partnerInfo",
          "type": "tuple"
        }
      ],
      "name": "PartnerCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        }
      ],
      "name": "PartnerDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "itemKeys",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantities",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        }
      ],
      "name": "Payment",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "itemKeys",
          "type": "bytes32[]"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            },
            {
              "internalType": "bytes32",
              "name": "partnerCode",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "priceInToken",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "priceInUsd",
              "type": "uint256"
            }
          ],
          "indexed": false,
          "internalType": "struct MultiPayment2.ItemInfo[]",
          "name": "itemInfos",
          "type": "tuple[]"
        }
      ],
      "name": "SetItemInfos",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "tokens",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "oracles",
          "type": "address[]"
        }
      ],
      "name": "SetOracleContracts",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newFeeReceiver",
          "type": "address"
        }
      ],
      "name": "UpdateFeeReceiver",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newCommissionFee",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newProtocolFee",
          "type": "uint256"
        }
      ],
      "name": "UpdatePartnerFees",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newFeeReceiver",
          "type": "address"
        }
      ],
      "name": "UpdatePartnerOwnerAndFeeReceiver",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "name": "UpdatePartnerStatus",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "feeReceiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "protocolFee",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "commissionFee",
              "type": "uint256"
            }
          ],
          "internalType": "struct MultiPayment2.PartnerInfo",
          "name": "partnerInfo",
          "type": "tuple"
        }
      ],
      "name": "createPartner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        }
      ],
      "name": "deletePartner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getFeeReceiver",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "itemKey",
          "type": "bytes32"
        }
      ],
      "name": "getItemInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            },
            {
              "internalType": "bytes32",
              "name": "partnerCode",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "priceInToken",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "priceInUsd",
              "type": "uint256"
            }
          ],
          "internalType": "struct MultiPayment2.ItemInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "getOracle",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        }
      ],
      "name": "getPartnerInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "feeReceiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "protocolFee",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "commissionFee",
              "type": "uint256"
            }
          ],
          "internalType": "struct MultiPayment2.PartnerInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "getPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isAdmins",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "itemKeys",
          "type": "bytes32[]"
        },
        {
          "internalType": "uint256[]",
          "name": "quantities",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "pay",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "itemKeys",
              "type": "bytes32[]"
            },
            {
              "internalType": "uint256[]",
              "name": "quantities",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct MultiPayment2.PayMultiParams[]",
          "name": "params",
          "type": "tuple[]"
        }
      ],
      "name": "payMulti",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "admins",
          "type": "address[]"
        },
        {
          "internalType": "bool[]",
          "name": "isActives",
          "type": "bool[]"
        }
      ],
      "name": "setAdmins",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "itemKeys",
          "type": "bytes32[]"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            },
            {
              "internalType": "bytes32",
              "name": "partnerCode",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "priceInToken",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "priceInUsd",
              "type": "uint256"
            }
          ],
          "internalType": "struct MultiPayment2.ItemInfo[]",
          "name": "itemInfos",
          "type": "tuple[]"
        }
      ],
      "name": "setItems",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "tokens",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "oracles",
          "type": "address[]"
        }
      ],
      "name": "setOracleTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newFeeReceiver",
          "type": "address"
        }
      ],
      "name": "updateFeeReceiver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "newProtocolFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "newCommissionFee",
          "type": "uint256"
        }
      ],
      "name": "updatePartnerFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "newFeeReceiver",
          "type": "address"
        }
      ],
      "name": "updatePartnerOwnerAndFeeReceiver",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "partnerCode",
          "type": "bytes32"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "name": "updatePartnerStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawFungibleToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "withdrawNft",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
]