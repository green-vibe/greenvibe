// 초기값
let initialState = {
  // Smart contract accounts
  ERC20contractAddress: "0x1B8a1215ae41D37d01CcC7E36aB64EA43E9F12B8",
  ERC721contractAddress: "0xA2540ea136f6F91D553bA744Cff9E1585681CC16",
  ERC1155contractAddress: "0x675fC7622953961E45F4Ff17d82680A0Aad6C6A9",
  rewardContractAddress: "0xc3329E0B0099A6C29957e5bE5C39FfD199C7aE1C",
};

function reducerContract(state = initialState, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}

export default reducerContract;
