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

export default function Category() {
    const params = useParams().ctr;
    const [meals, setMeals] = useState<Meals[]>([]);
    const [desc, SetDesc] = useState<string>("");

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params}`)
        .then(res => {
            setMeals(res.data.meals);
        })
        .catch(err => {
            console.log("data meals error", err);
        });
    }, []);
    
    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(res => {
            const category = res.data.categories.find((category: any) => category.strCategory === params);
            SetDesc(category.strCategoryDescription);
        })
        .catch(err => {
            console.log("category description error", err);
        });
    }, []);

    return (
        <div className="pb-5 md:mt-14">
            <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-b from-[#e8ddcb] text-white border-opacity-30 py-2 md:py-4 pt-[60px] md:pt-4">
                    <h1 className="w-full flex justify-center text-2xl md:text-3xl font-serif font-semibold text-[#32291b] drop-shadow-lg">{params} Recipes</h1>
                    <div className="w-full flex justify-center py-4 px-2 md:px-5 ">
                        <p className="text-xs sm:text-sm md:text-base border-2 text-[#32291b] border-[#948979] p-2 rounded shadow-lg">{desc}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4 flex-row w-full py-3 px-2 md:px-5">
                    {meals.map((meal: any) => (
                        <Link key={meal.idMeal} href={`/recipe/${meal.idMeal}`} passHref className="bg-[#ffffff] text-[#153448] border-2 border-[#948979] rounded shadow-lg p-2 md:p-4 hover:bg-[#948979] hover:shadow-xl hover:shadow-[#948979] hover:text-white transition-all duration-300">
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto rounded"></img>
                            <p className="w-full text-center mt-3 text-xs sm:text-sm md:text-base">{meal.strMeal}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}