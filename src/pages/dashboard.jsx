import React, { useState } from "react";
import Card from "../components/cards";
import { TiWeatherCloudy } from "react-icons/ti";
import { PiCompassRose } from "react-icons/pi";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { FaWind, FaRegEye } from "react-icons/fa";
import { WiHumidity, WiSunrise } from "react-icons/wi";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { IoMdSpeedometer } from "react-icons/io";
import { TbTemperatureSun } from "react-icons/tb";
import { hourglass } from "ldrs";

function Dashboard() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  hourglass.register();
  function unixTo24Hr(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const getWeather = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log("Error in fetching weather");
        throw new Error(`Error: City ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      const MT = Math.round(data.main.temp);

      const sunriseTimestamp = data.sys.sunrise;
      const sunsetTimestamp = data.sys.sunset;

      const sunrise = unixTo24Hr(sunriseTimestamp);
      const sunset = unixTo24Hr(sunsetTimestamp);

      const weather = {
        location: `${data.name}`,
        temperature: `${Math.round(MT)}°C`,
        visibility: `${data.visibility} km`,
        humidity: `${data.main.humidity} %`,
        wind: `${data.wind.speed} km/h`,
        condition: `${data.weather[0].main}`,
        pressure: `${data.main.pressure} hPa`,
        sunrise: `${sunrise}`,
        sunset: `${sunset}`,
      };

      setWeatherInfo(weather);
    } catch (error) {
      setError(error.message);
      setWeatherInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <>
      <div className="flex flex-col justify-evenly h-screen">
        <div className="bg-slate-900 w-screen h-screen px-10 text-white">
          <div className="flex justify-center align-middle">
            <div className="flex flex-row justify-center align-middle mx-auto gap-7 w-full h-[100px]">
              <div className="w-1/5 self-center flex justify-end">
                <div className="flex flex-row gap-3 self-center w-fit px-5 py-3 bg-slate-800 text-white rounded-md">
                  <TiWeatherCloudy className="self-center size-6" />
                  <h4 className="font-medium">Weather</h4>
                </div>
              </div>
              <div className="w-3/5 self-center">
                <input
                  type="search"
                  placeholder="Search by city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleEnterKey}
                  className="self-center bg-slate-800 text-white rounded-md px-5 py-3 w-full"
                />
              </div>
              <div className="w-1/5 self-center">
                <button
                  className="bg-slate-800 text-white rounded-md px-5 py-3 self-center"
                  onClick={getWeather}
                >
                  <PiCompassRose className="self-center size-6" />
                </button>
              </div>
            </div>
          </div>

          <div>
            {loading ? (
              <div className="flex justify-center align-middle mt-20">
                <l-hourglass
                  size="50"
                  bg-opacity="0.1"
                  speed="1"
                  color="white"
                />
              </div>
            ) : error ? (
              <div className="flex justify-center align-middle mt-20">
                <div className="text-red-500 bg-slate-800 font-semibold p-5 border border-red-500 rounded-md">
                  <p>{error}</p>
                </div>
              </div>
            ) : (
              weatherInfo && (
                <>
                  <div>
                    <h2 className="font-medium text-[30px] ml-10">
                      Today Overview
                    </h2>
                  </div>
                  <div className="flex flex-row mt-[10px]">
                    <div className="w-full flex flex-row gap-10 justify-center">
                      <div className="flex flex-col gap-5 py-10 w-1/4">
                        <div>
                          <Card
                            content="Wind Speed"
                            value={weatherInfo.wind}
                            icon={<FaWind className="size-12" />}
                          />
                        </div>
                        <div>
                          <Card
                            content="Humidity"
                            value={weatherInfo.humidity}
                            icon={<WiHumidity className="size-16" />}
                          />
                        </div>
                        <div>
                          <Card
                            content="Sunrise"
                            value={weatherInfo.sunrise}
                            icon={<FiSunrise className="size-12" />}
                          />
                        </div>
                      </div>
                      <div className="w-1/4 p-6">
                        <div className="flex flex-col justify-center align-middle border border-white rounded-md py-10 px-5">
                          <div className="self-center">
                            <TbTemperatureSun className="size-32" />
                          </div>
                          <p className="self-center text-white font-medium text-[60px]">
                            {weatherInfo.temperature}
                          </p>
                          <p className="self-center text-white font-normal text-[30px] mb-5">
                            {weatherInfo.condition}
                          </p>

                          <hr />
                          <div className="self-center flex flex-col gap-5 mt-7">
                            <div className="flex flex-row gap-3">
                              <CiLocationOn className="self-center size-7" />
                              <p className="self-center font-normal text-[20px]">
                                {weatherInfo.location}
                              </p>
                            </div>
                            <div className="flex flex-row gap-2">
                              <CiCalendar className="self-center size-7" />
                              <p className="self-center font-normal text-[20px]">
                                {formattedDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-5 py-10 w-1/4">
                        <div>
                          <Card
                            content="Pressure"
                            value={weatherInfo.pressure}
                            icon={<IoMdSpeedometer className="size-12" />}
                          />
                        </div>
                        <div>
                          <Card
                            content="Visibility"
                            value={weatherInfo.visibility}
                            icon={<FaRegEye className="size-12" />}
                          />
                        </div>
                        <div>
                          <Card
                            content="Sunset"
                            value={weatherInfo.sunset}
                            icon={<FiSunset className="size-12" />}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
        <div className="flex justify-center align-baseline bg-slate-900">
          <p className="text-gray-400 text-sm font-medium mb-1">
            © 2024 Developed by Akshay Gopan
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
