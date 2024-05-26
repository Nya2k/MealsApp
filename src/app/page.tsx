'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';

interface Category{
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string
}

interface Area{
  strArea: string;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    axios.get("https:www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => {
        setCategories(res.data.categories);
      })
      .catch(err => {
        console.log("data category error", err);
      });
  }, []);

  useEffect(() => {
    axios.get("https:www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(res => {
        setAreas(res.data.meals);
      })
      .catch(err => {
        console.log("data area error", err);
      });
  }, []);

  return (
    <div className="md:pb-5">
      <div className="relative w-full h-full">
        <img src="/hero-bg.webp" alt="hero-bg" className="-mt-14 object-cover w-full h-full opacity-70 object-center"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 text-white font-serif bg-black bg-opacity-50">
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold ">Mom’s Recipes</p>
          <p className="text-xl sm:text-2xl md:text-4xl tracking-tight hover:tracking-wide transition-all duration-500">Heartfelt Meals, Homemade Happiness</p>
        </div>
      </div>
      {}
      <div className="flex flex-col justify-center mt-4 md:mt-6">
        <div className="py-2 border-b-2 border-[#948979] border-opacity-30">
          <h1 className="w-full flex justify-center text-xl md:text-3xl font-serif font-semibold text-[#153448]">RECIPES CATEGORY</h1>
        </div>
        <div className="flex gap-1 md:gap-4 flex-col w-full py-3 px-2 md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 flex-col w-full py-3 px-2 md:px-5">
        {categories.map((category: any) => (
          <Link key={category.strCategory} href={`/category/${category.strCategory}`} passHref className="bg-[#ffffff] w-full border-2 border-[#948979] rounded shadow-lg p-2 md:p-4 flex flex-col md:flex-row gap-3 items-center hover:bg-[#edeae4] transition-all duration-300 cursor-pointer">
            <img src={category.strCategoryThumb} alt={category.strCategory} className="h-10 md:h-20"/>
            <div className="flex flex-col gap-1">
              <p className="text-base sm:text-lg md:text-xl font-semibold font-serif text-[#153448] text-center md:text-start">{category.strCategory}</p>
              <p className="text-justify text-xs md:text-sm opacity-95 text-[#3C5B6F]">{category.strCategoryDescription}</p>
            </div>
          </Link>
        ))}
        </div>
        </div>
      </div>

      <div className="flex flex-col justify-center md:mt-6">
        <div className="py-2 border-b-2 border-[#948979] border-opacity-30">
          <h1 className="w-full flex justify-center text-xl md:text-3xl font-serif font-semibold text-[#153448]">RECIPES AREA</h1>
        </div>
        <div className="flex gap-1 md:gap-4 flex-col w-full py-1 px-2 md:px-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-4 flex-col w-full py-3 px-2 md:px-5">
            {areas.map ((area: any) => (
              <Link key={area.strArea} href={`/area/${area.strArea}`} passHref className="bg-[#ffffff] w-full border-2 border-[#948979] rounded shadow-lg p-2 md:p-4 flex flex-col md:flex-row gap-3 items-center hover:bg-[#e2ded7] transition-all duration-300">
                <div className="flex flex-col gap-1">
                  <p className="text-base sm:text-lg md:text-lg font-medium  text-[#153448] text-center md:text-start">{area.strArea}</p>
                </div>
              </Link>
            ))}
        </div>
        </div>
      </div>
    </div>
  )
}