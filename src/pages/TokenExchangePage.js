import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SolidButton from "../components/Button/SolidButton";

const TokenExchangePage = ({ fTokenBalanceOf, fExchangeEther }) => {
  // userState
  let userState = useSelector((state) => state.user);

  const [tokenBalance, setTokenBalance] = useState(0);
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [exchangeMatic, setExchangeMatic] = useState(0 + " MATIC");
  const [btnDisabled, setBtnDisabled] = useState(true);

  // token balance 가져오기
  useEffect(() => {
    if (userState.currentAccounts && userState.currentAccounts.length > 0) {
      fTokenBalanceOf().then((balance) => setTokenBalance(balance));
    }
  }, [userState.currentAccounts]);

  /////////////////////
  // Calculate Token //
  /////////////////////
  const onChangeExchangeAmount = (e) => {
    setExchangeAmount(e.target.value);
    if (exchangeAmount !== "") {
      setBtnDisabled(false);
    }
  };

  const calculateTokenExchange = () => {
    setExchangeMatic(exchangeAmount / 200 + " MATIC");
  };

  const onBlurCheckAmount = (e) => {
    if (exchangeAmount > tokenBalance) {
      alert("보유하신 GRN이 부족합니다.");
      setExchangeAmount("");
      setBtnDisabled(true);
    } else if (exchangeAmount < 200 && exchangeAmount > 0) {
      alert("교환 가능한 최소 토큰 수량은 200GRN입니다.");
      setExchangeAmount("");
      setBtnDisabled(true);
    } else {
      calculateTokenExchange();
    }
  };

  const onClickExchangeMatic = (e) => {
    if (exchangeAmount === "") {
      e.preventDefault();
    } else {
      fExchangeEther(exchangeAmount);
    }
  };

  return (
    <form>
      <div className="box-token-exchange">
        <p className="txt-token-exchange-exp">
          교환 가능한 최소 토큰 수량은 200GRN이며, <br />
          200GRN 당 1MATIC으로 교환 가능합니다.
        </p>
        <div className="box-token-amount">
          <div className="box-token-amount-txt">
            <span className="txt-token-amount-exp">교환할 토큰 수량</span>
            <span>
              교환 가능 토큰 : <span>{tokenBalance}</span> GRN
            </span>
          </div>
          <input
            type="text"
            value={exchangeAmount}
            onChange={onChangeExchangeAmount}
            onBlur={onBlurCheckAmount}
            placeholder="토큰 수량을 입력해주세요."
          />
        </div>
        <div className="box-matic-amount">
          <span>지급될 MATIC</span>
          <input type="text" disabled="disabled" value={exchangeMatic} />
        </div>
        <SolidButton
          value="교환하기"
          disabled={btnDisabled}
          onClick={onClickExchangeMatic}
        />
      </div>
    </form>
  );
};

export default TokenExchangePage;
