import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/navbar/Navbar";
import style from "../styles/AddData.module.css";
import Loader from "../components/loader/Loader";

function AddData() {
  const [body, setBody] = useState({});
  const [isErrorName, setErrorName] = useState(false);
  const [isErrorAge, setErrorAge] = useState(false);
  const [isErrorGender, setErrorGender] = useState(false);
  const [isErrorWeight, setErrorWeight] = useState(false);
  const [isErrorLong, setErrorLong] = useState(false);
  const [isErrorGestational, setErrorGestational] = useState(false);
  const [isErrorParturition, setErrorParturition] = useState(false);
  const [isErrorCondition, setErrorCondition] = useState(false);
  const [isErrorDate, setErrorDate] = useState(false);
  const [isErrorDateInput, setErrorDateInput] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const numberInputHandler = (e) => {
    const newValue = e.target.value.replace(".", "");
    setBody({ ...body, [e.target.name]: newValue });
  };

  const dateInputHandler = (e) => {
    setErrorDate(false);
    setErrorDateInput(false);
    const inputDate = new Date(e.target.value);
    const currentDate = new Date();
    if (inputDate > currentDate) {
      setErrorDateInput(true);
      setErrorDate(true);
      e.target.value = "";
    } else {
      setBody({ ...body, [e.target.name]: e.target.value });
    }
  };

  const radioHandler = (target, e) => {
    setBody({ ...body, [e.target.id]: target });
  };

  const saveHandler = () => {
    if (isLoading) return;
    setLoading(true);
    if (!body.mother_name) setErrorName(true);
    if (!body.mother_age) setErrorAge(true);
    if (!body.genderBaby_id) setErrorGender(true);
    if (!body.baby_weight) setErrorWeight(true);
    if (!body.baby_long) setErrorLong(true);
    if (!body.gestational_age) setErrorGestational(true);
    if (!body.date) setErrorDate(true);
    if (!body.parturition_id) setErrorParturition(true);
    if (!body.condition_id) setErrorCondition(true);
    if (
      !body.mother_name ||
      !body.mother_age ||
      !body.genderBaby_id ||
      !body.baby_weight ||
      !body.baby_long ||
      !body.gestational_age ||
      !body.parturition_id ||
      !body.condition_id ||
      !body.date
    )
      return setLoading(false);
    const URL = `https://helotec-be.vercel.app/data/addData`;
    console.log(body);
    axios
      .post(URL, body)
      .then((result) => {
        setLoading(false);
        toast.success("Data Berhasil Dibuat");
        navigate("/data");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(`Data Gagal Dibuat`);
      });
  };

  useEffect(() => {
    if (isErrorName && body.mother_name) setErrorName(false);
    if (isErrorAge && body.mother_age) setErrorAge(false);
    if (isErrorGender && body.genderBaby_id) setErrorGender(false);
    if (isErrorWeight && body.baby_weight) setErrorWeight(false);
    if (isErrorLong && body.baby_long) setErrorLong(false);
    if (isErrorGestational && body.gestational_age) setErrorGestational(false);
    if (isErrorParturition && body.parturition_id) setErrorParturition(false);
    if (isErrorCondition && body.condition_id) setErrorCondition(false);
  }, [body]);

  return (
    <>
      <Navbar>
        {/* {isLoading && (
          <div className={style["loader-container"]}>
            <Loader />
          </div>
        )} */}
        <div className={style.container}>
          <p className={style.title}>TAMBAH DATA BARU PASIEN</p>
          <div className={style.inputArea}>
            <div className="col-6 d-flex flex-column">
              <label
                htmlFor="mother_name"
                className={isErrorName ? style.red : null}
              >
                Nama Ibu :
              </label>
              <input
                className={!isErrorName ? style.textInput : style.wrong}
                type={"text"}
                placeholder={"Masukan Nama Ibu Disini"}
                name={"mother_name"}
                onChange={(e) => changeHandler(e)}
              />
              <label
                htmlFor="mother_age"
                className={isErrorAge ? style.red : null}
              >
                Umur Ibu :
              </label>
              <input
                className={!isErrorAge ? style.textInput : style.wrong}
                type={"number"}
                name={"mother_age"}
                placeholder={"Masukan Umur Ibu Disini"}
                value={body?.mother_age || null}
                onChange={(e) => numberInputHandler(e)}
              />
              <label
                htmlFor="gestational_age"
                className={isErrorGestational ? style.red : null}
              >
                Usia Kehamilan :
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className={
                    !isErrorGestational ? style.textInput : style.wrong
                  }
                  type={"number"}
                  name={"gestational_age"}
                  placeholder={"Masukan Usia Kehamilan Disini"}
                  value={body?.gestational_age || null}
                  onChange={(e) => numberInputHandler(e)}
                />
                <p className={style.weight}>month</p>
              </div>
              <label
                htmlFor="lahiran"
                className={isErrorParturition ? style.red : null}
              >
                Proses Lahiran :
              </label>
              <div className={"d-flex flex-row gap-2"}>
                <div
                  className={
                    "d-flex flex-row align-items-center gap-2 mb-2 mt-2"
                  }
                >
                  <input
                    type={"radio"}
                    name="radio"
                    id="parturition_id"
                    onClick={(e) => radioHandler("1", e)}
                  />
                  <p>Normal</p>
                </div>
                <div
                  className={
                    "d-flex flex-row align-items-center gap-2 mb-2 mt-2"
                  }
                >
                  <input
                    type={"radio"}
                    name="radio"
                    id="parturition_id"
                    onClick={(e) => radioHandler("4", e)}
                  />
                  <p>Dibantu alat</p>
                </div>
                <div
                  className={
                    "d-flex flex-row align-items-center gap-2 mb-2 mt-2"
                  }
                >
                  <input
                    type={"radio"}
                    name="radio"
                    id="parturition_id"
                    onClick={(e) => radioHandler("2", e)}
                  />
                  <p>Caesar</p>
                </div>
                <div
                  className={
                    "d-flex flex-row align-items-center gap-2 mb-2 mt-2"
                  }
                >
                  <input
                    type={"radio"}
                    name="radio"
                    id="parturition_id"
                    onClick={(e) => radioHandler("3", e)}
                  />
                  <p>Waterbirth</p>
                </div>
              </div>
              <label htmlFor="date" className={isErrorDate ? style.red : null}>
                Tanggal dan Jam Persalinan :
              </label>
              <input
                className={!isErrorDate ? style.textInput : style.wrong}
                type={"datetime-local"}
                name={"date"}
                onChange={(e) => dateInputHandler(e)}
              />
              {isErrorDateInput && (
                <p className={style.errorMsg}>
                  Tanggal dan Jam tidak boleh melebihi saat ini
                </p>
              )}
            </div>
            <div className="col-6 d-flex flex-column">
              <label
                htmlFor="genderBaby_id"
                className={isErrorGender ? style.red : null}
              >
                Gender Bayi :
              </label>
              <div className={"d-flex flex-row gap-2"}>
                <div
                  className={
                    "d-flex flex-row align-items-center gap-2 mb-2 mt-2"
                  }
                >
                  <input
                    type={"radio"}
                    name="radioGender"
                    id="genderBaby_id"
                    onClick={(e) => radioHandler("1", e)}
                  />
                  <p>Laki-Laki</p>
                </div>
                <div
                  className={
                    "d-flex flex-row align-items-center gap-2 mb-2 mt-2"
                  }
                >
                  <input
                    type={"radio"}
                    name="radioGender"
                    id="genderBaby_id"
                    onClick={(e) => radioHandler("2", e)}
                  />
                  <p>Perempuan</p>
                </div>
              </div>
              <label
                htmlFor="baby_long"
                className={isErrorLong ? style.red : null}
              >
                Panjang Bayi :
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className={!isErrorLong ? style.textInput : style.wrong}
                  type={"number"}
                  name={"baby_long"}
                  placeholder={"Masukan Panjang Bayi Disini"}
                  value={body?.baby_long || null}
                  onChange={(e) => numberInputHandler(e)}
                />
                <p className={style.weight}>cm</p>
              </div>
              <label
                htmlFor="baby_weight"
                className={isErrorWeight ? style.red : null}
              >
                Berat Bayi :
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className={!isErrorWeight ? style.textInput : style.wrong}
                  type={"number"}
                  name={"baby_weight"}
                  placeholder={"Masukan Berat Bayi Disini"}
                  value={body?.baby_weight || null}
                  onChange={(e) => numberInputHandler(e)}
                />
                <p className={style.weight}>kg</p>
              </div>
              <label
                htmlFor="kondisi"
                className={isErrorCondition ? style.red : null}
              >
                Kondisi Bayi :
              </label>
              <div className={"d-flex flex-row gap-2 "}>
                <div
                  className={
                    "d-flex flex-row align-items-center gap-2 mb-2 mt-2"
                  }
                >
                  <input
                    type={"radio"}
                    name="radioKondisi"
                    id="condition_id"
                    onClick={(e) => radioHandler("1", e)}
                  />
                  <p>Sehat</p>
                </div>
                <div
                  className={
                    "d-flex flex-row align-items-center gap-2 mb-2 mt-2"
                  }
                >
                  <input
                    type={"radio"}
                    name="radioKondisi"
                    id="condition_id"
                    onClick={(e) => radioHandler("2", e)}
                  />
                  <p>Cacat</p>
                </div>
                <div
                  className={
                    "d-flex flex-row align-items-center gap-2 mb-2 mt-2"
                  }
                >
                  <input
                    type={"radio"}
                    name="radioKondisi"
                    id="condition_id"
                    onClick={(e) => radioHandler("3", e)}
                  />
                  <p>Meninggal</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.button} onClick={saveHandler}>
            <div
              className={`${style.clicked} ${
                isLoading ? style["loading-on"] : null
              }`}
            >
              {isLoading ? <Loader /> : <p>Simpan Data</p>}
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default AddData;
