'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'next/navigation'; 
import Link from 'next/link';

interface Meals{
  idMeal : number;
  strMeal : string;
  strMealThumb : string;
}

export default function Ingredient() {
    const params = useParams().ing;
    const decoded_param = decodeURIComponent(Array.isArray(params) ? params.join(' ') : params);
    
    const [meals, setMeals] = useState<Meals[]>([]);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${params}`)
        .then(res => {
            setMeals(res.data.meals);
        })
        .catch(err => {
            console.log("data meals error", err);
        });
    }, []);

    return (
        <div className="pb-5 md:mt-14">
            <div className="flex flex-col justify-center">
                <div className="border-b-2 border-[#948979] border-opacity-30 py-2 md:py-4">
                    <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#153448]">Recipes with {decoded_param}</h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4 flex-row w-full py-3 px-2 md:px-5">
                {meals && meals.length > 0 ? (
                    meals.map((meal) => (
                        <Link key={meal.idMeal} href={`/recipe/${meal.idMeal}`} passHref className="bg-[#ffffff] text-[#153448] border-2 border-[#948979] rounded shadow-lg p-2 md:p-4 hover:bg-[#948979] hover:text-white transition-all duration-300">
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto rounded" />
                            <p className="w-full text-center mt-3 text-xs sm:text-sm md:text-base">{meal.strMeal}</p>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full flex justify-center items-center text-[#3C5B6F]">No recipe with {decoded_param} found</p>
                )}
            </div>
            </div>
        </div>
    )
}