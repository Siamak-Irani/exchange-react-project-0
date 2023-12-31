import React, { useEffect } from "react";

import classes from "./CustomTable.module.css";

const defaultHeaderTitles = [
  { en: "title1", fa: "عنوان-۱" },
  { en: "title2", fa: "عنوان-۲" },
  { en: "title3", fa: "عنوان-۳" },
];

const defaultButtons = [{ col1_title: "A", col2_title: "B", col3_title: "C" }];

const CustomTable = ({
  header_titles = defaultHeaderTitles,
  buttons = defaultButtons,
  className,
  volumeBarPerc,
  btnClassNames = { col1: [], col2: [], col3: [] },
  btnClickHandler = () => {
    return;
  },
}) => {
  /*
    header_titles structure =    [ // Every column ==> // { en: "title", fa: "عنوان" } ]
    buttons =  [ { col1_title: "A", col2_title: "B" , col3_title: "C" }  ]
  */

  const titles = [];
  header_titles.forEach((title) => {
    titles.push(title.en);
  });

  return (
    <div className={`${classes["custom-table"]} ${classes[className]}`}>
      <div className={classes["header"]}>
        {header_titles.map((title, index) => {
          return (
            <div
              key={index}
              className={`${classes["header-title"]} ${classes[title.en]}`}
            >
              {title.fa}
            </div>
          );
        })}
      </div>
      <div className={classes["buttons-list"]}>
        {buttons.map((btn, index) => {
          return (
            <div key={index} className={classes["row"]}>
              {volumeBarPerc && (
                <div
                  style={{ width: `${volumeBarPerc[index]}%` }}
                  className={classes["volume-bar"]}
                ></div>
              )}

              <div className={classes["buttons"]}>
                <button
                  className={`${classes[titles[0]]} ${
                    classes[btnClassNames.col1[index]]
                  }`}
                  onClick={() => {
                    btnClickHandler(btn[titles[0]]);
                  }}
                >
                  {btn[titles[0]]}
                </button>
                <button
                  className={`${classes[titles[1]]} ${
                    classes[btnClassNames.col2[index]]
                  }`}
                >
                  {btn[titles[1]]}
                </button>
                <button
                  className={`${classes[titles[2]]} ${
                    classes[btnClassNames.col3[index]]
                  }`}
                >
                  {btn[titles[2]]}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomTable;
