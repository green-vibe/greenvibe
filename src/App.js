// !!READ COPYRIGHT!!
// To use this code, project need permission Eunbeen Jung, Kyeongrok Kwak, Sueun Cho

/**
 * Copyright © 2023 Sueun Cho
    All rights reserved.
    No part of this blockchain code, whether it be the source code, object code, or any derivative works thereof, may be reproduced, distributed, transmitted, displayed, published or broadcast, in whole or part, in any form, electronic or mechanical, photocopying, recording, scanning or any information storage and retrieval system now known or to be invented in future, without the prior written permission of the copyright owner, Sueun Cho.
    Unauthorized use and/or duplication of this material without express and written permission from this code's author and/or owner is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to Sueun Cho with appropriate and specific direction to the original content.
    The blockchain code is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the code or the use or other dealings in the code.
    Information in this blockchain code is subject to change without notice. Other products and companies referred to herein are trademarks or registered trademarks of their respective companies or mark holders.
    For permissions requests, write to the author, at the address below:
    Sueun Cho
    sueun.dev@gmail.com
*/

/**
 * Copyright © 2023 Kyeongrok Kwak
    All rights reserved.
    No part of this node.js, react.js, css code, whether it be the source code, object code, or any derivative works thereof, may be reproduced, distributed, transmitted, displayed, published or broadcast, in whole or part, in any form, electronic or mechanical, photocopying, recording, scanning or any information storage and retrieval system now known or to be invented in future, without the prior written permission of the copyright owner, Kyeognrok Kwak.
    Unauthorized use and/or duplication of this material without express and written permission from this code's author and/or owner is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to Kyeongrok Kwak with appropriate and specific direction to the original content.
    The node.js, react.js code is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the code or the use or other dealings in the code.
    Information in this node.js, react.js, css code code is subject to change without notice. Other products and companies referred to herein are trademarks or registered trademarks of their respective companies or mark holders.
    For permissions requests, write to the author, at the address below:
    Kyeongrok Kwak
    kyeongrok@naver.com
*/

/**
 * Copyright © 2023 Eunbeen Jung
    All rights reserved.
    No part of this React.js code, whether it be the source code, object code, or any derivative works thereof, may be reproduced, distributed, transmitted, displayed, published or broadcast, in whole or part, in any form, electronic or mechanical, photocopying, recording, scanning or any information storage and retrieval system now known or to be invented in future, without the prior written permission of the copyright owner, Eunbeen Jung.
    Unauthorized use and/or duplication of this material without express and written permission from this code's author and/or owner is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to Eunbeen Jung with appropriate and specific direction to the original content.
    The React.js code is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the code or the use or other dealings in the code.
    Information in this React.js code is subject to change without notice. Other products and companies referred to herein are trademarks or registered trademarks of their respective companies or mark holders.
    For permissions requests, write to the author, at the address below:
    Eunbeen Jung
    jungeb325@gmail.com
*/

/**
 * Greenvibe
 * @developer Sueun Cho, Rok Kwak, Eunbeen Jung
 * @version 1.2.2
 */

////////////////////
// React and Web3 //
////////////////////
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import Web3 from "web3";

////////////////////////
// Smart Contract ABI //
////////////////////////
import ERC20 from "./abi/ERC20.json";
import ERC721 from "./abi/ERC721.json";
// import ERC1155 from "./abi/ERC1155.json";
import Reward from "./abi/Reward.json";

/////////////////
// Page import //
/////////////////
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import TokenExchangePage from "./pages/TokenExchangePage";
import ActivityPage from "./pages/ActivityPage";

//////////////////////
// Component import //
//////////////////////
import Nav from "./components/layout/Nav";
import Nav2Depth from "./components/layout/Nav2Depth";
import Footer from "./components/layout/Footer";

/////////
// CSS //
/////////
import "./App.css";

//////////////////
// App Function //
//////////////////
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  ///////////
  // State //
  ///////////
  let userState = useSelector((state) => state.user);
  let contractState = useSelector((state) => state.contract);

  ///////////////////////////////////
  // Set Connect Metamask function //
  ///////////////////////////////////

  // web3
  const getWeb3 = () => {
    return userState.web3;
  };

  // 컨트랙트의 기본 요소를 가져옴
  const getTokenContract = (ABI, contractAddress) => {
    const web3 = getWeb3();
    return new web3.eth.Contract(ABI, contractAddress);
  };

  // MetaMask 연결
  const connectToMetaMask = async () => {
    if (await checkMetaMaskInstallation()) {
      try {
        await requestAccounts();
        await handleAccountNetworkChanged();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Check MetaMask install : 메타마스크가 연결할 수 있는 조건인지 확인
  const checkMetaMaskInstallation = async () => {
    if (typeof window.ethereum === "undefined") {
      alert(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
      return false;
    }
    return true;
  };

  // ComponentDidMount : 배열에 아무 것도 존재하지 않으면 ComponentDidMount처럼 작동함
  // 시작함수
  useEffect(() => {
    // useEffect서 async/await 사용 시 함수를 만들어서 사용해야 함
    async function ctMetaMask() {
      // await connectToMetaMask();
      setupAccountsChangedEventListener();
      setupNetworkChangedEventListener();
      fetchImageMetadata();
    }
    ctMetaMask();
  }, []);

  // account가 변경 되었을 때 작동
  const setupAccountsChangedEventListener = () => {
    window.ethereum.on("accountsChanged", async () => {
      await handleAccountNetworkChanged();
    });
  };

  // network가 변경 되었을 때 작동
  const setupNetworkChangedEventListener = () => {
    window.ethereum.on("networkChanged", async () => {
      await handleAccountNetworkChanged();
    });
  };

  // MetaMask 계정 변경 이벤트 핸들링
  const handleAccountNetworkChanged = async () => {
    const web3 = await createWeb3Instance();
    await getAccounts(web3);
  };

  // MetaMask 계정 연결 요청
  const requestAccounts = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  // Web3 인스턴스 생성
  const createWeb3Instance = async () => {
    const web3 = new Web3(window.ethereum);
    dispatch({ type: "SET_WEB3", payload: { web3: web3 } });
    return web3;
  };

  // 현재 MetaMask 연결된 계정 가져오기
  const getAccounts = async (web3) => {
    const currentAccount = await web3.eth.getAccounts();
    dispatch({
      type: "SET_ACCOUNTS",
      payload: { currentAccounts: currentAccount },
    });
  };

  // 이더리움 금액 가져오기
  const getEthBalance = async () => {
    if (userState.web3 !== null) {
      const accounts = await userState.web3.eth.getAccounts();
      const balanceWei = await userState.web3.eth.getBalance(accounts[0]);
      const balanceEther = userState.web3.utils.fromWei(balanceWei, "ether");

      dispatch({
        type: "SET_ETH_BALANCE",
        payload: { ethBalance: balanceEther },
      });
    }
  };

  // currentAccounts state가 바뀐 후에 실행되지 않으면 Balance를 제대로 가져오지 못해 하기와 같이 작성
  useEffect(() => {
    async function gEthBalance() {
      await getEthBalance();
    }
    gEthBalance();
  }, [userState.currentAccounts]);

  // Send Transcation -> 쉽게 생각해서 메타마스크 화면 엶 (이더 보낼꺼냐 아니면 스마트 컨트랙트 작동 시킬꺼냐)
  const sendTransaction = async (from, to, data, value) => {
    const web3 = getWeb3();
    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from,
            to,
            data,
            value: value
              ? web3.utils.toHex(web3.utils.toWei(value))
              : undefined,
          },
          console.log(value),
        ],
      });
      console.log(value);
      alert("Transaction successful!");
    } catch (e) {
      alert("Oops! Transaction failed!");
    }
  };

  ///////////////
  //   ERC20   //
  ///////////////

  // 토큰 밸런스
  const fTokenBalanceOf = async () => {
    const web3 = getWeb3();
    const tokenContract = getTokenContract(
      ERC20,
      contractState.ERC20contractAddress
    );
    const tokenBalanceOfWei = await tokenContract.methods
      .balanceOf(userState.currentAccounts[0])
      .call();
    const tokenBalanceOfEther = web3.utils.fromWei(tokenBalanceOfWei, "ether");
    const tokenBalanceOfTruncated =
      Math.floor(parseFloat(tokenBalanceOfEther) * 10000) / 10000;
    console.log(tokenBalanceOfEther);
    return tokenBalanceOfTruncated;
  };

  // TokenApprove를 통해서 토큰을 MATIC으로 바꾸기 전에 실행해야하는 함수
  const fTokenApprove = async (getToken) => {
    const tokenContract = getTokenContract(
      ERC20,
      contractState.ERC20contractAddress
    );
    //vote 또한 인자로 가져와야함
    try {
      const data = tokenContract.methods
        .approve(contractState.rewardContractAddress, getToken)
        .encodeABI();

      await sendTransaction(
        userState.currentAccounts[0],
        contractState.ERC20contractAddress,
        data,
        undefined
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  ////////////////
  //   ERC721   //
  ////////////////

  // 닉네임 함수
  const fNickname = async () => {
    const tokenContract = getTokenContract(
      ERC721,
      contractState.ERC721contractAddress
    );
    const myNickname = await tokenContract.methods
      .getNickname(userState.currentAccounts[0])
      .call();

    return myNickname;
  };

  // image를 fetch하는 함수
  const fetchImageMetadata = async () => {
    if (!userState.currentAccounts || userState.currentAccounts.length === 0)
      return;

    const web3 = getWeb3();
    const tokenContract = new web3.eth.Contract(
      ERC721,
      contractState.ERC721contractAddress
    );

    // 총 토큰 수를 조회
    const totalSupply = await tokenContract.methods.totalSupply().call();

    // 총 토큰 수만큼 반복하여, 각 토큰의 소유자를 확인
    for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
      const owner = await tokenContract.methods.ownerOf(tokenId).call();

      // 만약 토큰의 소유자가 사용자와 일치한다면, 해당 토큰 ID를 처리
      if (owner === userState.currentAccounts[0]) {
        const metadataUrl = `https://lime-wonderful-skunk-419.mypinata.cloud/ipfs/QmPJHgfcuSffRa9ZmAWoQsMZDMe8KMyP2G4dNddJBZutSi/${tokenId}`;
        try {
          const response = await fetch(metadataUrl);
          const metadata = await response.json();
          const imageUrl = metadata.image;
          dispatch({
            type: "SET_IMG_URL",
            payload: { profileImageUrl: imageUrl },
          });
          // 본인의 토큰을 찾았으므로 반복문을 종료
          break;
        } catch (error) {
          console.error("Error fetching metadata:", error);
        }
      }
    }
  };

  ////////////////
  //   Reward   //
  ////////////////

  // 토큰을 MATIC으로 교환하는 함수
  const fExchangeEther = async (getPrice) => {
    const web3 = getWeb3();
    const contract = getTokenContract(
      Reward,
      contractState.rewardContractAddress
    );

    const tokenToSend = web3.utils.toWei(String(getPrice), "wei");
    await fTokenApprove(tokenToSend);

    try {
      const data = contract.methods.exchangeEther(tokenToSend).encodeABI();

      await this.sendTransaction(
        userState.currentAccounts[0],
        contractState.rewardContractAddress,
        data,
        tokenToSend
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {location.pathname.substring(1, 6) !== "token" ? (
        <Nav connectToMetaMask={connectToMetaMask} />
      ) : (
        <Nav2Depth location={location} />
      )}
      {/* 추후 로그인 하지 않으면 볼 수 없는 화면 체크 예정 */}
      <Routes>
        <Route path="/" element={<MainPage fNickname={fNickname} />} />
        <Route
          path="/profile"
          element={
            <ProfilePage
              fTokenBalanceOf={fTokenBalanceOf}
              fNickname={fNickname}
              fetchImageMetadata={fetchImageMetadata}
            />
          }
        />
        <Route
          path="/token/exchange"
          element={
            <TokenExchangePage
              fTokenBalanceOf={fTokenBalanceOf}
              fExchangeEther={fExchangeEther}
            />
          }
        />
        <Route path="/activity" element={<ActivityPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
