// 초기값
let initialState = {
  web3: null, // Info of Web3
  currentAccounts: [], // Current Accounts
  ethBalance: 0, // Ethereum balance
  profileImageUrl: "", // Profile Image Url
};

function reducerUser(state = initialState, action) {
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

export default reducerUser;
