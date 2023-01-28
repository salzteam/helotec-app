import React from "react";
import { Link } from "react-router-dom";

import style from "./Navbar.module.css";
import Footer from "../footer/Footer";

function Navbar({ children }) {
  return (
    <>
      <div className={style.container}>
        <div className={style.brand}>
          <i className={`fa-sharp fa-solid fa-hospital ${style.icon}`}></i>
          <p className={style.title}>HALOTEC Medical</p>
        </div>
        <div className={style.list}>
          <Link to={"/"}>
            <p>Dashboard</p>
          </Link>
          <Link to={"/data"}>
            <p>Cari</p>
          </Link>
          <Link to={"/data/newdata"}>
            <p>Tambah Data</p>
          </Link>
        </div>
      </div>
      <div className={style.content}>{children}</div>
      <Footer />
    </>
  );
}

export default Navbar;
