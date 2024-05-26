'use client'
import { useState, useEffect } from "react";
import axios from 'axios';

interface Recipe{
    idMeal: number;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
}

export default function Recipe() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        axios.get("https:www.themealdb.com/api/json/v1/1/lookup.php?i=52772")
        .then(res => {
            setRecipes(res.data.meals);
        })
        .catch(err => {
            console.log("data recipe error", err);
        });
    }, []);

    return (
        <div className="pb-5">
            {recipes.map((recipe: any) => (
            <div className="mt-14 flex flex-col gap-7">
                <div className="header flex gap-10 flex-row items-center md:h-96 p-10">
                    <img src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg" alt="recipe" className="object-contain h-full w-auto rounded-lg"/>
                    <div className="w-full">
                        <p className="w-full flex justify-start text-xl md:text-5xl font-serif font-semibold text-[#153448] pb-7">{recipe.strMeal}</p>
                        <p className="md:text-lg opacity-95 text-[#3C5B6F]">Category : {recipe.strCategory}</p>
                        <p className="md:text-lg opacity-95 text-[#3C5B6F]">Area : {recipe.strArea}</p>
                        <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="mt-7 bg-[#3C5B6F] text-white rounded-full shadow-lg px-3 py-1 text-center inline-block">Watch Tutorial</a>
                        <div className="flex flex-row justify-end pt-9 gap-2">
                            {recipe.strTags.split(',').map((tag: string) => (
                                <p className="border-2 border-[#948979] rounded-full shadow-lg px-3 py-1">{tag}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="ingredient">
                    <div className="border-b-2 border-[#948979] border-opacity-30 py-2 md:py-4">
                        <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#153448]">Ingredients</h1>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4 flex-row w-full py-3 px-2 md:px-5">
                    
                            <div key='1' className="bg-[#ffffff] border-2 border-[#DFD0B8] rounded shadow-lg p-2 md:p-4">
                                <img src='https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg' alt='gambar' className="w-full h-auto rounded"></img>
                                <p className="text-[#153448] w-full text-center mt-3 text-xs sm:text-sm md:text-base">judul</p>
                            </div>
                            <div key='1' className="bg-[#ffffff] border-2 border-[#DFD0B8] rounded shadow-lg p-2 md:p-4">
                                <img src='https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg' alt='gambar' className="w-full h-auto rounded"></img>
                                <p className="text-[#153448] w-full text-center mt-3 text-xs sm:text-sm md:text-base">judul</p>
                            </div>
                            <div key='1' className="bg-[#ffffff] border-2 border-[#DFD0B8] rounded shadow-lg p-2 md:p-4">
                                <img src='https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg' alt='gambar' className="w-full h-auto rounded"></img>
                                <p className="text-[#153448] w-full text-center mt-3 text-xs sm:text-sm md:text-base">judul</p>
                            </div>

                    </div>
                </div>

                <div className="instruction">
                    <div className="border-b-2 border-[#948979] border-opacity-30 py-2 md:py-4">
                        <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#153448]">Instruction</h1>
                    </div>
                    <div className="px-40 pt-5">
                        <div className="bg-[#ffffff] border-2 border-[#3C5B6F] rounded shadow-lg p-2 md:p-5">
                            {recipe.strInstructions.split('.').map((inst: string, index: number) => (
                                <p>{index + 1}. {inst}</p>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            ))}
        </div>
    );
}