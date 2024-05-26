'use client'
import { useState, useEffect } from "react";
import axios from 'axios';

interface Breakfast{
  id : number;
  strMeal : string;
  strMealThumb : string;
}

export default function Home() {
  const [breakfasts, setBreakfast] = useState<Breakfast[]>([]);

  useEffect (() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast")
    .then(res => {
      setBreakfast(res.data.meals)
    }).catch(err => {
      console.log("error woi")
    })
  }, [])


  return (
    <div className="">
      <div className="relative w-full h-1/2">
        <img src="/hero-bg.webp" alt="hero-bg" className="object-cover w-full h-full opacity-70"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 text-white font-serif bg-black bg-opacity-50 pb-20">
          <p className="text-7xl font-bold ">Mom’s Recipes</p>
          <p className="text-4xl tracking-tight hover:tracking-wide transition-all">Heartfelt Meals, Homemade Happiness</p>
        </div>
      </div>

      <div className="flex flex-col justify-center mt-6">
        <div className="border-b-2 border-[#948979] border-opacity-30 py-2">
          <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#605441]">BREAKFAST</h1>
        </div>
        <div className="flex gap-4 flex-row overflow-x-scroll w-full py-3 px-5">
          {breakfasts.map((breakfast: any) => (
            <div className="bg-[#ffffff] min-w-56 max-w-64 border-2 border-[#948979] rounded shadow-lg p-4">
                <img src={breakfast.strMealThumb} alt="image" className="rounded"></img>
                <p className="w-full text-center mt-3 text-base">{breakfast.strMeal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}