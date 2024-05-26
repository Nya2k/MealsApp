'use client'
import { useState, useEffect } from "react";
import axios from 'axios';

interface Category{
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string
}

interface Breakfast{
  id : number;
  strMeal : string;
  strMealThumb : string;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [breakfasts, setBreakfast] = useState<Breakfast[]>([]);

  useEffect(() => {
    axios.get("https:www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => {
        setCategories(res.data.categories);
      })
      .catch(err => {
        console.log("data category error", err);
      });
  }, []);

  useEffect (() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast")
    .then(res => {
      setBreakfast(res.data.meals)
    }).catch(err => {
      console.log("data breakfast error")
    })
  }, [])

  return (
    <div>
      <div className="relative w-full h-full">
        <img src="/hero-bg.webp" alt="hero-bg" className="-mt-14 object-cover w-full h-full opacity-70 object-center"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 text-white font-serif bg-black bg-opacity-50">
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold ">Mom’s Recipes</p>
          <p className="text-xl sm:text-2xl md:text-4xl tracking-tight hover:tracking-wide transition-all">Heartfelt Meals, Homemade Happiness</p>
        </div>
      </div>
      {}
      <div className="flex flex-col justify-center mt-6">
        <div className="py-2">
          <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#153448]">CATEGORY</h1>
        </div>
        <div className="flex gap-1 md:gap-4 flex-col w-full py-3 px-2 md:px-5">
        <div className="grid grid-cols-2 gap-1 md:gap-4 flex-col w-full py-3 px-2 md:px-5">
          {categories.map((category: any) =>(
            <div className="bg-[#ffffff] w-full border-2 border-[#948979] rounded shadow-lg p-2 md:p-4 flex flex-col md:flex-row gap-3 items-center hover:bg-[#e9e5de]">
              <img src={category.strCategoryThumb} alt="beef" className="h-10 md:h-20"/>
              <div className="flex flex-col gap-1">
                <p className="text-base sm:text-lg md:text-xl font-semibold font-serif text-[#153448] text-center md:text-start">{category.strCategory}</p>
                <p className="text-justify text-xs md:text-sm opacity-95 text-[#3C5B6F]">{category.strCategoryDescription}</p>
              </div>
            </div>
            ))}
        </div>
        </div>
      </div>

      <div className="flex flex-col justify-center mt-6">
        <div className="border-b-2 border-[#948979] border-opacity-30 py-2">
          <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#153448]">BREAKFAST</h1>
        </div>
        <div className="flex gap-1 md:gap-4 flex-row overflow-x-scroll w-full py-3 px-2 md:px-5">
          {breakfasts.map((breakfast: any) => (
            <div key={breakfast.idMeal} className="bg-[#ffffff] min-w-28 md:min-w-56 md:max-w-64 border-2 border-[#948979] rounded shadow-lg p-2 md:p-4">
                <img src={breakfast.strMealThumb} alt={breakfast.strMeal} className="rounded"></img>
                <p className="text-[#153448] w-full text-center mt-3 text-xs sm:text-sm md:text-base">{breakfast.strMeal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}