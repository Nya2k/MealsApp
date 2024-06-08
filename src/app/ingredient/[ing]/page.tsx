'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'next/navigation'; 
import Link from 'next/link';
import Image from 'next/image';
import { GiMeal } from "react-icons/gi";

interface Meals{
  idMeal : number;
  strMeal : string;
  strMealThumb : string;
}

export default function Ingredient() {
    const params = useParams().ing;
    const decoded_param = decodeURIComponent(Array.isArray(params) ? params.join(' ') : params);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);
    
    const [meals, setMeals] = useState<Meals[]>([]);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${params}`)
        .then(res => {
            setMeals(res.data.meals);
        })
        .catch(err => {
            console.log("data meals error", err);
        });
    }, [params]);

    if (isLoading) {
        return (
          <div className="flex h-screen justify-center items-center">
            <GiMeal className="text-6xl text-[#153448] animate-pulse"/>
          </div>
        )
      }

    return (
        <div className="pb-5 md:pt-14 min-h-screen h-full bg-[#948979]">
            <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-b from-[#ffffff] text-white border-opacity-30 py-2 md:py-4 pt-[60px] md:pt-4">
                    <h1 className="w-full flex justify-center text-2xl md:text-3xl font-serif font-semibold text-[#32291b] drop-shadow-lg">Recipes with {decoded_param}</h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4 flex-row w-full py-3 px-2 md:px-5">
                {meals.map((meal) => (
                    <Link key={meal.idMeal} href={`/recipe/${meal.idMeal}`} passHref className="bg-[#ffffff] text-[#153448] border-2 border-[#ffffff] rounded shadow-lg p-2 md:p-4 hover:bg-transparent hover:shadow-md hover:shadow-[#ffffff] hover:text-white transition-all duration-300">
                        <Image src={meal.strMealThumb} alt={meal.strMeal} layout="responsive" width={100} height={100} className="w-full h-auto rounded"/>
                        <p className="w-full text-center mt-3 text-xs sm:text-sm md:text-base">{meal.strMeal}</p>
                    </Link>
                ))}
            </div>
            </div>
        </div>
    )
}