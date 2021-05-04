import React, { useState, useEffect } from "react";
import Searchable from "react-searchable-dropdown";
import SelectSearch from "react-select-search";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Select from "react-select";
import "./Home.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Homepage() {
  const [allStatesName, setAllStatesName] = useState([]);
  const [selectState, setSelectState] = useState(null);

  const [selectCity, setSelectCity] = useState(null);
  const [allCityName, setAllCityName] = useState([]);

  const [startDate, setStartDate] = useState(new Date());

  const [info, setInfo] = useState([]);

  //   Convert date formet
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  useEffect(() => {
    // State data fetch
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then(({ data }) => {
        const { states } = data;
        const temp = states.map((x) => {
          return { label: x.state_name, value: x.state_id };
        });
        setAllStatesName(temp);
      })
      .catch((error) => {
        console.log(error);
      });

    // For City data fetch
    if (selectState !== null) {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectState}`
        )
        .then(({ data }) => {
          const { districts } = data;
          const temp2 = districts.map((x) => {
            return { label: x.district_name, value: x.district_id };
          });
          setAllCityName(temp2);
        })
        .catch((error) => {
          console.log(error);
        });

      if (selectCity !== null) {
        const date = convert(startDate);
        axios
          .get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selectCity}&date=${date}`
          )
          .then(({ data }) => {
            const { sessions } = data;
            setInfo(sessions);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    //
  }, [selectState, selectCity, startDate]);

  //   console.log(allStatesName);
  //   console.log(info.length);

  console.log(convert(startDate));
  return (
    <>
      <Select
        className="dropdown"
        options={allStatesName}
        onChange={(opt) => setSelectState(opt.value)}
        placeholder="Select your state..."
      />
      <Select
        className="dropdown"
        options={allCityName}
        onChange={(opt) => setSelectCity(opt.value)}
        placeholder="Select your city..."
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      {info.length > 0 ?
      <>
      {info.map((x)=>(
          <div>
              
          </div>

      )) }  
      </>
     : null}
    </>
  );
}

export default Homepage;
