import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/navbar/Navbar";
import style from "../styles/Search.module.css";

function Search() {
  const [selectFilter, setSelect] = useState("0");
  const [selectSearch, setSearch] = useState();
  const [selectDay, setDay] = useState();
  const [selectMonth, setMonth] = useState();
  const [selectYear, setYear] = useState();
  const [datas, setDatas] = useState();
  const [prev, setPrev] = useState();
  const [next, setNext] = useState();
  const [totalData, setTotalData] = useState();
  const [page, setPage] = useState();

  useEffect(() => {
    const URL = "https://helotec-be.vercel.app/data/search?page=1&limit=10";
    axios
      .get(URL)
      .then((result) => {
        setDatas(result.data.data);
        setNext(result.data.next);
        setPrev(result.data.prev);
        setTotalData(result.data.totalData);
        setPage(result.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectMonth > 12) setMonth("");
  }, [selectMonth]);

  const onHandleChange = (e) => {
    setSelect(e.target.value);
  };

  const dateHandleChange = (e) => {
    const numberRegex = /[^0-9]/g;
    if (numberRegex.test(e.target.value)) {
      const result = e.target.value.replace(numberRegex, "");
      if (e.target.name === "day") setDay(result);
      if (e.target.name === "month") setMonth(result);
      if (e.target.name === "year") setYear(result);
      return;
    }
    if (e.target.name === "day") setDay(e.target.value);
    if (e.target.name === "month") setMonth(e.target.value);
    if (e.target.name === "year") setYear(e.target.value);
  };

  const searchHandler = () => {
    setDatas();
    setNext();
    setPrev();
    setTotalData();
    setPage();
    let URL = "https://helotec-be.vercel.app/data/search?page=1&limit=10";
    if (selectFilter !== "0") {
      URL += `&${selectFilter}=${selectSearch}`;
    }
    if (selectDay) {
      URL += `&day=${selectDay}`;
    }
    if (selectMonth) {
      URL += `&month=${selectMonth}`;
    }
    if (selectYear) {
      URL += `&year=${selectYear}`;
    }
    axios
      .get(URL)
      .then((result) => {
        setDatas(result.data.data);
        setNext(result.data.next);
        setPrev(result.data.prev);
        setTotalData(result.data.totalData);
        setPage(result.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paginasiNextHandler = () => {
    let URL = "https://helotec-be.vercel.app/data/search?";
    if (next) {
      URL += `${next}`;
    }
    if (selectFilter !== "0") {
      URL += `&${selectFilter}=${selectSearch}`;
    }
    if (selectDay) {
      URL += `&day=${selectDay}`;
    }
    if (selectMonth) {
      URL += `&month=${selectMonth}`;
    }
    if (selectYear) {
      URL += `&year=${selectYear}`;
    }
    axios
      .get(URL)
      .then((result) => {
        setDatas(result.data.data);
        setNext(result.data.next);
        setPrev(result.data.prev);
        setTotalData(result.data.totalData);
        setPage(result.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const paginasiPrevHandler = () => {
    let URL = "https://helotec-be.vercel.app/data/search?";
    if (prev) {
      URL += `${prev}`;
    }
    if (selectFilter !== "0") {
      URL += `&${selectFilter}=${selectSearch}`;
    }
    if (selectDay) {
      URL += `&day=${selectDay}`;
    }
    if (selectMonth) {
      URL += `&month=${selectMonth}`;
    }
    if (selectYear) {
      URL += `&year=${selectYear}`;
    }
    axios
      .get(URL)
      .then((result) => {
        setDatas(result.data.data);
        setNext(result.data.next);
        setPrev(result.data.prev);
        setTotalData(result.data.totalData);
        setPage(result.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectInput = () => {
    if (selectFilter === "age_mother") {
      return (
        <div className={style["input-filter"]}>
          <label>Masukan umur : </label>
          <input
            type={"number"}
            name={"age_mother"}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      );
    }
    if (selectFilter === "gender_baby") {
      return (
        <div style={{ display: "flex", gap: "1rem", paddingTop: ".5rem" }}>
          <p>Pilih Gender : </p>
          <select
            className={style.dropdown}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          >
            <option value={"1"}>Laki - Laki</option>
            <option value={"2"}>Perempuan</option>
          </select>
        </div>
      );
    }
    if (selectFilter === "parturition") {
      return (
        <div style={{ display: "flex", gap: "1rem", paddingTop: ".5rem" }}>
          <p>Pilih Metode : </p>
          <select
            className={style.dropdown}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          >
            <option value={"1"}>Normal</option>
            <option value={"2"}>Caesar</option>
            <option value={"3"}>Waterbirth</option>
            <option value={"4"}>Dibantu Alat</option>
          </select>
        </div>
      );
    }
  };

  return (
    <>
      <Navbar>
        <div className={style.container}>
          <p className={style.title}>DATA PASIEN</p>
          <p className={style["filter-data"]}>FILTER DATA</p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>Kategori:</p>
            <select
              className={style.dropdown}
              onChange={onHandleChange}
              value={selectFilter}
            >
              <option value={"0"}>Tidak Ada</option>
              <option value={"age_mother"}>Umur Ibu</option>
              <option value={"gender_baby"}>Jenis Kelamin Bayi</option>
              <option value={"parturition"}>Metode Lahiran</option>
            </select>
          </div>
          {selectInput()}
          <div style={{ paddingTop: "1rem" }}>
            <p className={style["filter-data"]}>FILTER TANGGAL :</p>
            <div className={style["input-date"]}>
              <div>
                <input
                  type={"text"}
                  placeholder={"D"}
                  name={"day"}
                  minlength="0"
                  maxlength="2"
                  onChange={dateHandleChange}
                  value={selectDay}
                />
              </div>
              <p>/</p>
              <div>
                <input
                  type={"text"}
                  placeholder={"MM"}
                  name={"month"}
                  minlength="0"
                  maxlength="2"
                  onChange={dateHandleChange}
                  value={selectMonth}
                />
              </div>
              <p>/</p>
              <div>
                <input
                  type={"text"}
                  placeholder={"YYYY"}
                  name={"year"}
                  minlength="0"
                  maxlength="4"
                  onChange={dateHandleChange}
                  value={selectYear}
                />
              </div>
            </div>
          </div>
          <div className={style["button-search"]} onClick={searchHandler}>
            <p>CARI</p>
          </div>
          <p className={style.nb}>nb : kosongkan jika tidak perlu</p>
          <div className={style.search}></div>
          <div className={style.table}>
            <table>
              <tr>
                <th>ID</th>
                <th>Nama Ibu</th>
                <th>Umur Ibu</th>
                <th>Jenis Kelamin Bayi</th>
                <th>Berat Bayi</th>
                <th>Panjang Bayi</th>
                <th>Umur Kandungan</th>
                <th>Status Bayi</th>
                <th>Proses Kelahiran</th>
                <th>Tanggal Persalinan</th>
                <th>Jam Persalinan</th>
              </tr>
              {datas?.map((value, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{value.name}</td>
                    <td>{value.age}</td>
                    <td>{value.gender_baby}</td>
                    <td>{value.weight} kg</td>
                    <td>{value.long} cm</td>
                    <td>{value.gestational_age} bulan</td>
                    <td>{value.status}</td>
                    <td>{value.parturition}</td>
                    <td>{value.tanggal}</td>
                    <td>{value.jam} WIB</td>
                  </tr>
                );
              })}
            </table>
          </div>
          <p className={style.showing}>
            Menampilkan 1 sampai 10 dari {totalData} pasien
          </p>
          <div className={style.pagination}>
            <div
              className={style.paginationLeft}
              onClick={() => {
                if (prev) return paginasiPrevHandler();
              }}
            >
              <p>Prev</p>
            </div>
            <div className={style.page}>
              <p>{page || 0}</p>
            </div>
            <div
              className={style.paginationRight}
              onClick={() => {
                if (next) return paginasiNextHandler();
              }}
            >
              <p>Next</p>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Search;
