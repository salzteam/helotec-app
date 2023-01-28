import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import style from "../styles/Dashboard.module.css";
import Navbar from "../components/navbar/Navbar";

function Dashboard() {
  const [selectedYear, setSelect] = useState(new Date().getFullYear());
  const [datas, setDatas] = useState();
  const [dataMonth, setMonth] = useState();

  const onHandleChange = (evt) => {
    setSelect(evt.target.value);
  };

  useEffect(() => {
    const URL = `https://helotec-be.vercel.app/data/dashboard?year=${selectedYear}`;
    axios
      .get(URL)
      .then((result) => {
        setDatas(result.data.Dashboard);
        setMonth(result.data.Dashboard.Months);
      })
      .catch((err) => {
        setDatas();
        setMonth();
        console.log(err);
      });
  }, [selectedYear]);

  const dataEmpty = [
    {
      name: "Jan",
      total: 0,
    },
    {
      name: "Feb",
      total: 0,
    },
    {
      name: "Mar",
      total: 0,
    },
    {
      name: "April",
      total: 0,
    },
    {
      name: "Mei",
      total: 0,
    },
    {
      name: "Juni",
      total: 0,
    },
    {
      name: "Juli",
      total: 0,
    },
    {
      name: "Agust",
      total: 0,
    },
    {
      name: "Sep",
      total: 0,
    },
    {
      name: "Okt",
      total: 0,
    },
    {
      name: "Nov",
      total: 0,
    },
    {
      name: "Des",
      total: 0,
    },
  ];

  const options = [];
  for (let i = 0; i <= 60; i++) {
    const year = new Date().getFullYear() - i;
    options.push(<option value={year}>{year}</option>);
  }
  return (
    <Navbar>
      <div className={style.container}>
        <p className={style.title}>INFORMASI</p>
        <div className={style["container-scroll"]}>
          <select
            className={style.scrollview}
            value={selectedYear}
            onChange={onHandleChange}
          >
            {options}
          </select>
        </div>
        <div className={style["chart-top"]}>
          <div className={style["detail-top"]}>
            <div className={style["total-baby"]}>
              <div className={style["total-top"]}>
                <i className={`fa-solid fa-baby ${style["icon-baby"]}`}></i>
                <p className={style.totalText}>Total</p>
              </div>
              <p className={style["value-total"]}>{datas?.TotalBaby || 0}</p>
            </div>
            <div className={style.sehat}>
              <div className={style["total-top"]}>
                <i className={`fa-solid fa-heart ${style["icon-baby"]}`}></i>
                <p className={style.totalText}>Sehat</p>
              </div>
              <p className={style["value-total"]}>
                {datas?.conditionHealthy || 0}
              </p>
            </div>
            <div className={style.cacat}>
              <div className={style["total-top"]}>
                <i
                  className={`fa-solid fa-person-breastfeeding ${style["icon-baby"]}`}
                ></i>
                <p className={style.totalText}>Cacat</p>
              </div>
              <p className={style["value-total"]}>
                {datas?.conditionDisabilities || 0}
              </p>
            </div>
            <div className={style.meninggal}>
              <div className={style["total-top"]}>
                <i
                  className={`fa-solid fa-face-dizzy ${style["icon-baby"]}`}
                ></i>
                <p className={style.totalText}>Meninggal</p>
              </div>
              <p className={style["value-total"]}>
                {datas?.conditionDead || 0}
              </p>
            </div>
          </div>
          <div>
            <p className={style["title-chart"]}>Jumlah Lahiran</p>
            <BarChart
              width={500}
              height={300}
              data={dataMonth || dataEmpty}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="total"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </div>
        </div>
        <div className={style["chart-middle"]}>
          <p className={style["title-lahiran"]}>Metode Lahiran</p>
          <div className={style["container-box"]}>
            <div className={`${style["box-lahiran"]} ${style.normal}`}>
              <p className={style["list-lahiran"]}>Normal</p>
              <p className={style["value-lahiran"]}>
                {datas?.parturitionNormal || 0}
              </p>
            </div>
            <div className={`${style["box-lahiran"]} ${style.caesar}`}>
              <p className={style["list-lahiran"]}>Caesar</p>
              <p className={style["value-lahiran"]}>
                {datas?.parturitionCaesar || 0}
              </p>
            </div>
            <div className={`${style["box-lahiran"]} ${style.waterbirth}`}>
              <p className={style["list-lahiran"]}>Waterbirth</p>
              <p className={style["value-lahiran"]}>
                {datas?.parturitionWaterbirth || 0}
              </p>
            </div>
            <div className={`${style["box-lahiran"]} ${style.alat}`}>
              <p className={style["list-lahiran"]}>Dibantu alat</p>
              <p className={style["value-lahiran"]}>
                {datas?.parturitionToolAssisted || 0}
              </p>
            </div>
          </div>
        </div>
        <div className={style["chart-bottom"]}>
          <div className={style["bottom-left"]}>
            <p className={style["title-bottom"]}>Jenis Kelamin Bayi</p>
            <div className={style["container-gender"]}>
              <div className={style["gender-laki"]}>
                <div className={style["top-gender-laki"]}>
                  <i className={`fa-solid fa-mars ${style["icon-gender"]}`}></i>
                  <p className={style["icon-gender"]}>Laki-Laki</p>
                </div>
                <p className={style["value-gender"]}>{datas?.Male || 0}</p>
              </div>
              <div className={style["gender-perempuan"]}>
                <div className={style["top-gender-perempuan"]}>
                  <i
                    className={`fa-solid fa-venus ${style["icon-gender"]}`}
                  ></i>
                  <p className={style["icon-gender"]}>Perempuan</p>
                </div>
                <p className={style["value-gender"]}>{datas?.Female || 0}</p>
              </div>
            </div>
          </div>
          <div className={style["bottom-right"]}>
            <p className={style["title-bottom"]}>Rata-Rata Usia Kehamilan</p>
            <div className={style.avrage}>
              <p className={style["value-avg"]}>{datas?.fixedAvg || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default Dashboard;
