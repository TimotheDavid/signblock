export const data =  [
    {
      type: "functions",
      name: "getByAddress",
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_address",
          type: "address"
        }
      ],
      outputs: [
        {
          payload: [
            {
              internalType: "bytes32",
              name: "payload",
              type: "bytes32"
            },
            {
              internalType: "uint",
              name: "timestamp",
              type: "uint"
            }
          ]
        }
      ]
    },
    {
      type: "functions",
      name: "countDocsByAddress",
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_address",
          type: "address"
        }
      ],
      outputs: [
        {
          internalType: "uint256",
          name: "data",
          type: "uint256"
        }
      ]
    },
    {
      type: "functions",
      name: "setAddressRegistery",
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_address",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "_hash",
          type: "bytes32"
        }
      ]
    }
  ] as const;
