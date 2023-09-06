export const data =  [
    {
      type: "functions",
      name: "getByHash",
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "_hash",
          type: "bytes32"
        }
      ],
      outputs: [
        {
          internalType: "address",
          name: "userAddress",
          type: "address"
        }
      ]
    },
    {
      type: "functions",
      name: "setDocument",
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "_hash",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "_address",
          type: "address"
        }
      ]
    }
  ] as const;