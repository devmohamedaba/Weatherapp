import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";

// External Libraries
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");

// ####### Material UI Components ########
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function App() {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");
  const [date, setDate] = useState("");
  const [temp, setTemp] = useState({
    temp: null,
    max: null,
    min: null,
    discription: "",
    icon: null,
    city: "",
  });

  function handleLanguageChange() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDate(moment().format("dddd, MMMM YYYY, h:mm:ss a"));
  }

  const direction = locale === "en" ? "ltr" : "rtl";

  useEffect(() => {
    i18n.changeLanguage(locale);
    setDate(moment().format("dddd, MMMM YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.03&lon=31.23&appid=29306d7787c85bb8b43785b560b07bdd",
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const responseIcon = response.data.weather[0].icon;
        const discription = response.data.weather[0].description;
        const city = response.data.name;
        console.log("this is icon :", response.data.weather[0].icon);
        setTemp({
          temp: responseTemp,
          max: max,
          min: min,
          discription: discription,
          icon: `http://openweathermap.org/img/wn/${responseIcon}@2x.png`,
          city: city,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* ***Card*** */}
          <div
            dir={direction}
            style={{
              background: "rgb(28 52 91 / 10%)",
              color: "white",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "0px 10px 1px rgba(0,0,0,0.01)",
              width: "100%",
            }}
          >
            {/* ***Card Content*** */}
            <div>
              {/* ***City And Time Header*** */}
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                }}
              >
                <Typography
                  variant="h2"
                  style={{ marginRight: "10px", fontWeight: "bold" }}
                >
                  {t(temp.city)}
                </Typography>
                <Typography variant="h6" style={{ marginRight: "5px" }}>
                  {date}
                </Typography>
              </div>
              <hr />
              {/* ***Degree *** */}
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  {/* ***Temperature*** */}
                  <div style={{ display: "flex" }}>
                    <div style={{ fontSize: "45px" }}>°</div>
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {temp.temp}
                    </Typography>
                    <img src={temp.icon} alt="weather icon" />
                  </div>
                  {/* !!!! Todo Img Temperature!!!! */}
                  <Typography variant="h6">{t(temp.discription)}</Typography>
                  {/* *** Min & Max Temperature **** */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">
                      {t("Min")} : {temp.min}
                    </Typography>

                    <h5 style={{ margin: "0px 25px" }}>|</h5>
                    <Typography variant="h5">
                      {t("Max")} : {temp.max}
                    </Typography>
                  </div>
                </div>
                <img
                  src={temp.icon}
                  alt="weather icon"
                  style={{ width: "200px", color: "white", height: "100%" }}
                />
              </div>
              {/* ***Degree *** */}
              {/* ***Card Content*** */}
            </div>
          </div>
          {/* ***Card*** */}
          {/* ** Translate button ** */}
          <div
            dir={direction}
            style={{
              display: "flex",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              variant="text"
              style={{ color: "white" }}
              onClick={handleLanguageChange}
            >
              {locale === "en" ? "Arabic" : "الإنجليزية"}
            </Button>
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              marginTop: "40px",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6">Created By : Mohamed Abayazid</Typography>
          </div>
          {/* ** Translate button ** */}
        </div>
      </Container>
    </div>
  );
}
