import React from "react";

import style from "./Footer.module.css";

function Footer() {
  const getYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  };

  return (
    <div className={style.container}>
      <p className={style.title}>{getYear()} &#169; HALOTEC MEDICAL</p>
    </div>
  );
}

export default Footer;
