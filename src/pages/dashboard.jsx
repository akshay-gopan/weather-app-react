import React, { useEffect, useState } from "react";
import Card from "../components/cards";
import { TiWeatherCloudy } from "react-icons/ti";
import { PiCompassRose } from "react-icons/pi";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { FaWind, FaRegEye } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { IoMdSpeedometer } from "react-icons/io";
import { TbTemperatureSun } from "react-icons/tb";
import { hourglass } from 'ldrs'




function Dashboard() {

    const [city, setCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [loading, setLoading] = useState(false)
    hourglass.register()
    async function getWeather() {

        
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        setLoading(true)
        fetch(url)
            
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let MT = Math.round(data.main.temp);


                const weather = {
                    location: `${data.name}`,
                    temperature: `${Math.round(MT)}°C`,
                    visibility: `${data.visibility} km`,
                    humidity: `${data.main.humidity} %`,
                    wind: `${data.wind.speed} km/h`,
                    condition: `${data.weather[0].main}`,
                    pressure: `${data.main.pressure} hPa`

                };
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
                
                setWeatherInfo(weather);
            

            });
    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            
            getWeather();
        };
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <>
            <div class="bg-slate-900 w-screen h-screen p-10 text-white">
                <div class="flex justify-center align-middle">
                    <div class="flex flex-row justify-center align-middle mx-auto gap-7 w-full h-[100px]">

                        <div class="w-1/5  self-center flex justify-end">
                            <div class="flex flex-row  gap-3 self-center w-fit px-5 py-3 bg-slate-800  text-white rounded-md ">
                                <TiWeatherCloudy class="self-center size-6" />
                                <h4 class="font-medium">Weather</h4>
                            </div>
                        </div>
                        <div class="w-3/5 self-center">
                            <input type="search" placeholder="Search..." value={city}
                                onChange={(e) => setCity(e.target.value)} onKeyDown={handleEnterKey} class="self-center bg-slate-800 text-white rounded-md px-5 py-3 w-full" />
                        </div>
                        <div class=" w-1/5 self-center">
                            <button class=" bg-slate-800 text-white rounded-md px-5 py-3 self-center" onClick={getWeather}>
                                <PiCompassRose class="self-center size-6" />

                            </button>
                        </div>
                    </div>

                </div>

                <div>
                    <div>
                        <h2 class="font-medium text-[30px] ml-10">Today Overview</h2>
                    </div>
                    { loading ? ( 
                        <div class="flex justify-center align-middle mt-20">
                            <l-hourglass
                            size="50"
                            bg-opacity="0.1"
                            speed="1" 
                            color="white" 
                            />

                        </div>                            
                             )
                    
                    : ( weatherInfo && (
                        <div class="flex flex-row mt-[10px]">
                            <div class="w-1/4 p-8">
                                <div class="flex flex-col justify-center align-middle border border-white rounded-md p-5">
                                    <div class="self-center">
                                        <TbTemperatureSun class="size-32" />

                                    </div>
                                    <p class="self-center text-white font-medium text-[60px]">{weatherInfo.temperature}</p>
                                    <p class="self-center text-white font-normal text-[30px]">{weatherInfo.condition}</p>
                                    <div class="self-center bg-white w-2/3 h-[1px] mt-4"></div>
                                    <div class="self-center flex flex-col gap-5 mt-7">
                                        <div class="flex flex-roow gap-3" >
                                            <CiLocationOn class="self-center size-7" />
                                            <p class="self-center font-normal text-[20px] ">{weatherInfo.location}</p>
                                        </div>
                                        <div class="flex flex-row gap-2">
                                            <CiCalendar class="self-center size-7" />
                                            <p class="self-center font-normal text-[20px] ">{formattedDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-3/4 flex flex-row justify-around">
                                <div class="flex flex-col gap-16 p-10 w-1/2">
                                    <div class="">
                                        <Card content="Wind Speed" value={weatherInfo.wind} icon={<FaWind class="size-12" />} />
                                    </div>
                                    <div>
                                        <Card content="Humidity" value={weatherInfo.humidity} icon={<WiHumidity class="size-12" />} />
                                    </div>
                                </div>
                                <div class="flex flex-col gap-16 p-10 w-1/2">
                                    <div>
                                        <Card content="Pressure" value={weatherInfo.pressure} icon={<IoMdSpeedometer class="size-12" />} />
                                    </div>
                                    <div>
                                        <Card content="Visibility" value={weatherInfo.visibility} icon={<FaRegEye class="size-12" />} />
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>

    );
}

export default Dashboard;