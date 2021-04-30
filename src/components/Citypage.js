import axios from "axios";
import React, { useEffect, useState } from "react";
import im from "../assets/humidity.png";
import {debounce} from 'lodash'
export default function CityPage() {
  const [wdata, setWdata] = useState([]);
  const [city, setCity] = useState("");

  const newkey = "af67361532eb4cbc80a40157212904";

  useEffect(() => {
    axios
      .get(`http://api.weatherapi.com/v1/current.json?q=${city}&key=${newkey}&aqi=yes`)

      .then((res) => {
  
        setWdata([res.data]);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [city]);


  const handleCity = debounce((text) => {
    setCity(text)
  },1500);

  return (
    <div className="bg-main">

        <h1 id="heading-top">WELCOME TO INSTA-WEATHER</h1>
      <input type="text" id="inpt" name="city" placeholder="Enter Location" onChange={(e) => handleCity(e.target.value)} />
      <br />
      <div class="row justify-content-center wbox">
        <div class="col-12 col-md-4 col-sm-12 col-xs-12">
      
        {wdata &&
          wdata.map((i) => (
            <div class="card p-4">
              <div class="d-flex">
                <h6 class="flex-grow-1">
                  {i.location.name}, {i.location.region}
                </h6>
                <h6>{i.location.localtime.slice(11)}</h6>
              </div>
              <div>
                
                <img src={i.current.condition.icon} width="100px" />
              </div>

              <div class="d-flex flex-column temp mt-5 mb-3">
                <h1 class="mb-0 font-weight-bold" id="heading">
                  
                  {i.current.temp_c}° C
                </h1>
                <span class="small grey">{i.current.condition.text}</span>
                <span class="small">Feels like {i.current.feelslike_c}° C</span>

              </div>
              <div class="d-flex">
                <div class="temp-details flex-grow-1">
                  <p class="my-1">
                   wind
                    <img
                      src="https://i.imgur.com/B9kqOzp.png"
                      height="17px"
                    />
                    <span>{i.current.wind_kph}/kmph {i.current.wind_dir}</span>
                  </p>
                  <p class="my-1">
                 humidity:
                    <img src={im} height="17px" />
                    <span> {i.current.humidity}% </span>
                  </p>
                  <p class="my-1">
                 Visibility:
                   
                    <span> {i.current.vis_km}km </span>
                  </p>
            
                </div>
              </div>
            </div>
          ))}
          </div>
      </div>
    </div>
  );
}
