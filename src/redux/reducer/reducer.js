// 초기값
let initialState = {
  web3: null, // Info of Web3
  currentAccounts: [], // Current Accounts
  ethBalance: 0, // Ethereum balance
  profileImageUrl: "", // Profile Image Url
  // Smart contract accounts
  ERC20contractAddress: "0x1B8a1215ae41D37d01CcC7E36aB64EA43E9F12B8",
  ERC721contractAddress: "0xA2540ea136f6F91D553bA744Cff9E1585681CC16",
  ERC1155contractAddress: "0x675fC7622953961E45F4Ff17d82680A0Aad6C6A9",
  rewardContractAddress: "0xc3329E0B0099A6C29957e5bE5C39FfD199C7aE1C",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_WEB3":
      return { ...state, web3: action.payload.web3 };
    case "SET_ACCOUNTS":
      return {
        ...state,
        currentAccounts: action.payload.currentAccounts,
      };
    case "SET_ETH_BALANCE":
      return {
        ...state,
        ethBalance: action.payload.ethBalance,
      };
    case "SET_IMG_URL":
      return {
        ...state,
        profileImageUrl: action.payload.profileImageUrl,
      };
    default:
      return { ...state };
  }
}

export default reducer;
