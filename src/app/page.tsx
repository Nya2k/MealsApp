'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { GiMeal } from "react-icons/gi";

interface Meal{
  idMeal : number;
  strMeal : string;
  strMealThumb : string;
  strCategory: string;
  strArea: string;
}

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
  const [randomMeal, setRandomMeal] = useState<Meal>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isExpand, setIsExpand] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const image = "/hero-bg.webp";
  const styling = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 1000);
}, []);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => {
        setCategories(res.data.categories);
      })
      .catch(err => {
        console.log("data category error", err);
      });
  }, []);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(res => {
        setAreas(res.data.meals);
      })
      .catch(err => {
        console.log("data area error", err);
      });
  }, []);

  const handleRandomMeal = () => {
    setIsRandom(true);
  }

  useEffect(() => {
    if(isRandom){
      axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => {
          setRandomMeal(res.data.meals[0]);
          setIsRandom(false);
        })
        .catch(err => {
          console.log("random meal error", err);
        });
    }
  }, [isRandom]);

  useEffect(() => {
    const handleExpand = () => {
      setIsExpand(window.innerWidth > 1024);
    };
    handleExpand();
    window.addEventListener('resize', handleExpand);
    return () => {
      window.removeEventListener('resize', handleExpand);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <GiMeal className="text-6xl text-[#153448] animate-pulse"/>
      </div>
    )
  }

  return (
    <div className="md:pb-5">
      <div className="h-screen bg-cover bg-center" style={styling}>
        <div className="h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center z-10 text-white font-serif">
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold ">Mom’s Recipes</p>
            <p className="text-xl sm:text-2xl md:text-4xl tracking-tight hover:tracking-wide transition-all duration-500">Heartfelt Meals, Homemade Happiness</p>
          </div>
      </div>
      </div>

      <div className="flex flex-col justify-center md:mt-6">
       <div className="py-2 border-b-2 border-[#948979] border-opacity-30">
          <h1 className="w-full flex justify-center text-xl md:text-3xl font-serif font-semibold text-[#153448]">Random Meal</h1>
          <p className="w-full flex justify-center text-xs md:text-base font-serif font-semibold text-[#153448]">click the button to get a random meal!</p>
        </div>
        {(randomMeal ? (
        <div className="flex flex-row justify-center py-4 gap-3">
          <Link key={randomMeal.idMeal} href={`/recipe/${randomMeal.idMeal}`} passHref className="flex items-center text-[#153448] border-2 border-[#948979] rounded shadow-lg p-2 md:p-4 hover:bg-[#e8ddcb] hover:shadow-xl hover:shadow-[#948979] hover:text-[#153448] transition-all duration-300">
            <Image src={randomMeal.strMealThumb} alt={randomMeal.strMeal} className="rounded h-20 md:h-40 w-auto" height={200} width={200}/>
            <div className="w-2/3 ml-4">
              <p className="text-lg font-bold">{randomMeal.strMeal}</p>
              <p className="mt-1 text-xs sm:text-sm md:text-base">Category: {randomMeal.strCategory}</p>
              <p className="text-xs sm:text-sm md:text-base">Area: {randomMeal.strArea}</p>
            </div>
          </Link>
          <div className="flex items-center">
            <button onClick={handleRandomMeal} className="bg-[#948979] text-white border-2 border-[#948979] h-1/4 rounded shadow-lg p-2 md:p-4 hover:bg-[#6f6555] hover:shadow-lg hover:shadow-[#948979] hover:border-[#6f6555] hover:text-white transition-all duration-300 flex items-center">Random</button>
          </div>
        </div>
        ) : (
        <div className="flex justify-center items-center py-3 px-2 md:px-5">
          <button onClick={handleRandomMeal} className="bg-[#948979] text-white border-2 border-[#948979] h-1/4 rounded shadow-lg p-2 md:p-4 hover:bg-[#6f6555] hover:shadow-lg hover:shadow-[#948979] hover:border-[#6f6555] hover:text-white transition-all duration-300 flex items-center">Random</button>
        </div>
        ))}
      </div> 
      
      <div className="flex flex-col justify-center mt-4 md:mt-6">
        <div className="py-2 border-b-2 border-[#948979] border-opacity-30">
          <h1 className="w-full flex justify-center text-xl md:text-3xl font-serif font-semibold text-[#153448]">Recipes Category</h1>
        </div>
        <div className="flex gap-1 md:gap-4 flex-col w-full py-3 px-2 md:px-5">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-1 md:gap-4 flex-col w-full py-3 px-2 md:px-5">
        {categories.map((category: any) => (
          isExpand ? (
            <Link key={category.strCategory} href={`/category/${category.strCategory}`} passHref className="group relative bg-[#ffffff] w-full border-2 border-[#948979] rounded shadow-lg p-2 hover:bg-[#948979] hover:text-white transition-all duration-500 cursor-pointer">
              <div className="cover group-hover:hidden flex flex-col md:p-4 md:flex-row gap-3 items-center transition-all duration-500">
                <Image src={category.strCategoryThumb} alt={category.strCategory} className="h-10 md:h-20 w-auto" height={200} width={200}/>
                <div className="flex flex-col gap-1">
                  <p className="text-base sm:text-lg xl:text-xl font-semibold font-serif text-[#153448] text-center md:text-start">{category.strCategory}</p>
                </div>
              </div>
              <div className="desc hidden group-hover:block absolute top-0 left-0 right-0 bottom-0 px-5 py-4 overflow-y-auto transition-all duration-500">
                <p className="text-justify overflow-y-auto text-xs md:text-base opacity-95 text-white">{category.strCategoryDescription}</p>
              </div>
            </Link>
          ) : (
            <Link key={category.strCategory} href={`/category/${category.strCategory}`} passHref className="bg-[#ffffff] w-full border-2 border-[#948979] rounded shadow-lg p-2 md:p-4 flex flex-col gap-3 items-center hover:bg-[#edeae4] transition-all duration-300 cursor-pointer">
              <Image src={category.strCategoryThumb} alt={category.strCategory} className="h-10 md:h-20 w-auto" height={200} width={200}/>
              <div className="flex flex-col gap-1">
                <p className="text-base sm:text-lg font-semibold font-serif text-[#153448] text-start">{category.strCategory}</p>
                <p className="text-justify text-xs opacity-95 text-[#3C5B6F]">{category.strCategoryDescription}</p>
              </div>
            </Link>
          )
        ))}
        </div>
        </div>
      </div>

      <div className="flex flex-col justify-center md:mt-6">
        <div className="py-2 border-b-2 border-[#948979] border-opacity-30">
          <h1 className="w-full flex justify-center text-xl md:text-3xl font-serif font-semibold text-[#153448]">Recipes Area</h1>
        </div>
        <div className="flex gap-1 md:gap-4 flex-col w-full py-1 px-2 md:px-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-4 flex-col w-full py-3 px-2 md:px-5">
            {areas.map ((area: any) => (
              <Link key={area.strArea} href={`/area/${area.strArea}`} passHref className="bg-[#ffffff] text-[#153448] w-full border-2 border-[#948979] rounded shadow-lg p-2 md:p-4 flex flex-col md:flex-row gap-3 items-center hover:bg-[#948979] hover:text-white transition-all duration-300">
                <div className="flex flex-col gap-1">
                  <p className="text-base sm:text-lg md:text-lg font-medium  text-center md:text-start">{area.strArea}</p>
                </div>
              </Link>
            ))}
        </div>
        </div>
      </div>
    </div>
  )
}


