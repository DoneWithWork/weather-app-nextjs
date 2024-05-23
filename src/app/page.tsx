import React, { Suspense } from "react";
import Navbar from "./Components/Navbar";
import CardFallback from "./Components/CardFallback";
import Timer from "@/components/Timer";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/utils/Icons";
import { Calendar, Droplet } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BiWater } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";

//grab the data
type WeatherDataProps = {
  country: string;
};
async function GetForecastData({ country }: WeatherDataProps) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=25.23310645&lon=-55.1833741910576&units=metric&cnt=5&appid=${process.env.WEATHER_API_KEY}`,
    {}
  );
  const data = await res.json();

  return data;
}
async function GetWeatherData({ country }: WeatherDataProps) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=25.23310645&lon=-55.1833741910576&units=metric&appid=${process.env.WEATHER_API_KEY}`,
    {}
  );
  const data = await res.json();

  return data;
}

export default async function Home() {
  const data = await GetWeatherData({ country: "Malaysia" });
  const data2 = await GetForecastData({ country: "Malaysia" });
  const Temp = {
    main: data.main,
    dt: data.dt,
    weather: data.weather,
  };
  const Forecast = {
    list: data2.list,
  };

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <div className="w-full max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search"
          className="w-full 
          bg-black
          placeholder:text-white px-2  shadow-sm focus:outline-white bg-none  rounded-md mt-10 py-2"
        />
      </div>
      <Suspense fallback={<CardFallback />}>
        <TemperatureCard data={Temp} />
      </Suspense>
      <Suspense fallback={<CardFallback />}>
        <ForecastCard data={Forecast} />
      </Suspense>
    </main>
  );
}

// Remove the unused TemperatureCardProps type declaration
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function ForecastCard({ data }: any) {
  const { list } = data;
  console.log(list);
  const getIcon = (info: string) => {
    switch (info) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };
  return (
    <div className="w-full">
      <div className="max-w-xl mx-auto border border-white shadow-xl rounded-md px-2 h-full">
        <div className=" mt-2 flex flex-row items-center font-semibold gap-3">
          <Calendar size={30} />
          <p>3 hourly forecast</p>
        </div>
        <div className="w-full">
          {list.map((data: any, index: number) => (
            <div key={index} className="border-b-2 m-2 space-y-2">
              <p>{new Date(data.dt_txt).toLocaleTimeString()}</p>
              <div className="w-full">
                <p className="text-center text-2xl font-semibold">
                  {data.main.temp}°C
                </p>
              </div>

              <p>{data.weather[0].description}</p>
              <span>{getIcon(data.weather[0].main)}</span>
              <p className="flex flex-row items-center gap-2">
                {data.main.humidity}%
                <Droplet size={25} />
              </p>

              <p>Probability of Precipitation: {data.pop * 100}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemperatureCard({ data }: any) {
  const { main, dt, weather } = data;
  const date = new Date(dt * 1000);
  let dayOfWeek = date.getDay();
  let dayName = daysOfWeek[dayOfWeek];

  const getIcon = () => {
    switch (weather[0].main) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };
  return (
    <div className="text-white w-full ">
      <div className=" max-w-xl mx-auto border border-white shadow-xl rounded-md px-2 h-full">
        <div className="flex flex-row justify-between py-2 px-2">
          <p>{dayName}</p>
          <Timer time={dt} />
        </div>
        <div className="w-full h-[70px] flex flex-col justify-center ">
          <p className="text-center font-bold text-4xl">{main.temp}°</p>
        </div>
        <div>
          <span>{getIcon()}</span>
          <p>{weather[0].description}</p>
        </div>
        <div>
          <p>
            Low: {main.temp_min}° High: {main.temp_max}°
          </p>
        </div>
      </div>
    </div>
  );
}
