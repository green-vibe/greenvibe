import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SolidButton from "../components/Button/SolidButton";

const TokenExchangePage = ({ fTokenBalanceOf }) => {
  // userState
  let userState = useSelector((state) => state.user);

  const [tokenBalance, setTokenBalance] = useState("");

  useEffect(() => {
    if (userState.currentAccounts && userState.currentAccounts.length > 0) {
      fTokenBalanceOf().then((balance) => setTokenBalance(balance));
    }
  }, [userState.currentAccounts]);

  return (
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
        <input type="text" placeholder="토큰 수량을 입력해주세요." />
      </div>
      <div className="box-matic-amount">
        <span>지급될 MATIC</span>
        <input type="text" disabled="disabled" value={3} />
      </div>
      <SolidButton value="교환하기" disabled={false} />
    </div>
  );
};

export default TokenExchangePage;
