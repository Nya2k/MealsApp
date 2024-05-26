'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'next/navigation'; 

interface Meals{
  idMeal : number;
  strMeal : string;
  strMealThumb : string;
}

export default function Category() {
    const params = useParams().area;
    const [meals, setMeals] = useState<Meals[]>([]);

    useEffect(() => {
        axios.get(`https:www.themealdb.com/api/json/v1/1/filter.php?a=${params}`)
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
                    <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#153448]">{params} Recipes</h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4 flex-row w-full py-3 px-2 md:px-5">
                    {meals.map((meal: any) => (
                        <div key={meal.idMeal} className="bg-[#ffffff] border-2 border-[#948979] rounded shadow-lg p-2 md:p-4">
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto rounded"></img>
                            <p className="text-[#153448] w-full text-center mt-3 text-xs sm:text-sm md:text-base">{meal.strMeal}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}