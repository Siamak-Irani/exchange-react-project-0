import React, { useState } from "react";
import ReactDOM from "react-dom";

import classes from "./SelectCurrency.module.css";
import Overlay from "../../ui/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { searchPairsActions } from "../../store/search-pairs";
import SearchCurrency from "./SearchCurrency";

const SelectCurrency = ({ className }) => {
  const searchOverlayIsOpen = useSelector(
    (state) => state.searchOverlay.isOpened
  );
  const dispatch = useDispatch();

  const header_titles = [
    { en: "pairs", fa: "جفت ارز" },
    { en: "price", fa: "قیمت" },
    { en: "change", fa: "تغییر" },
  ];

  const buttons = [
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
    { pairs: "BTC/USDT", price: "45656", change: "6563" },
  ];

  return (
    <div className={classes["select-currency"]}>
      {ReactDOM.createPortal(
        <Overlay
          className="search-pairs-overlay"
          onClickBackdrop={() => {
            dispatch(searchPairsActions.close());
          }}
          overlayIsOpen={searchOverlayIsOpen}
        >
          <SearchCurrency header_titles={header_titles} buttons={buttons} />
        </Overlay>,
        document.getElementById("overlay")
      )}
      <SearchCurrency className="min-1030" header_titles={header_titles} buttons={buttons} />
    </div>
  );
};

export default SelectCurrency;
