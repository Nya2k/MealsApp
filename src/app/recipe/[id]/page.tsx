'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'next/navigation'; 

interface Recipe{
    idMeal: number;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strIngredient16: string;
    strIngredient17: string;
    strIngredient18: string;
    strIngredient19: string;
    strIngredient20: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
    strMeasure16: string;
    strMeasure17: string;
    strMeasure18: string;
    strMeasure19: string;
    strMeasure20: string;
}

export default function Recipe() {
    const params = useParams().id;
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params}`)
        .then(res => {
            setRecipes(res.data.meals);
        })
        .catch(err => {
            console.log("data recipe error", err);
        });
    }, []);

    const getIngredients = (recipe : Recipe) => {
        const ingredients = [];
        for (let i=1; i<=20; i++){
            const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
            const measure = recipe[`strMeasure${i}` as keyof Recipe];
            if (ingredient !== "" && ingredient != null && measure !== "" && measure != null){
                ingredients.push({ingredient, measure});
            }
        }
        return ingredients;
    };

    
    return (
        <div className="pb-5">
            {recipes.map((recipe: any) => {
                const ingredients = getIngredients(recipe);
        return (
            <div className="mt-14 flex flex-col gap-5">
                <div className="header grid grid-cols-1 md:grid-cols-2 p-7">
                    <div className="w-full flex justify-center">
                        <img src={recipe.strMealThumb} alt="recipe" className="object-contain rounded-lg min-h-72 max-h-80"/>
                    </div>
                    <div className="xl:-ml-20">
                        <p className="w-full flex text-center pt-5 md:text-start text-4xl md:text-5xl font-serif font-semibold text-[#153448] pb-7">{recipe.strMeal}</p>
                        <p className="text-lg opacity-95 text-[#3C5B6F]">Category : {recipe.strCategory}</p>
                        <p className="text-lg opacity-95 text-[#3C5B6F]">Area : {recipe.strArea}</p>
                        <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="mt-7 bg-[#3C5B6F] text-white rounded-full shadow-lg px-3 py-1 text-center inline-block">Watch Tutorial</a>
                        <div className="flex flex-row justify-end pt-9 gap-2">
                            {recipe.strTags && recipe.strTags.split(',').map((tag: string) => (
                                <p className="border-2 border-[#948979] rounded-full shadow-lg px-3 py-1">{tag}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="ingredient">
                    <div className="border-b-2 border-[#948979] border-opacity-30 py-2 md:py-4">
                        <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#153448]">Ingredients</h1>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 md:gap-4 flex-row w-full py-3 px-5 md:px-7">
                        {ingredients.map((ingredient: any) =>(
                            <div key='1' className="bg-[#ffffff] border-2 border-[#DFD0B8] rounded shadow-lg p-2 md:p-4">
                                <img src={`https://www.themealdb.com/images/ingredients/${ingredient.ingredient}.png`} alt={ingredient.ingredient} className="w-full h-auto rounded"></img>
                                <p className="text-[#153448] w-full text-center pt-3 text-xs sm:text-sm md:text-base">{ingredient.ingredient}</p>
                                <p className="text-[#3C5B6F] text-center text-sm md:text-base opacity-95 pt-2">{ingredient.measure}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="instruction">
                    <div className="border-b-2 border-[#948979] border-opacity-30 py-2 md:py-4">
                        <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#153448]">Instruction</h1>
                    </div>
                    <div className="px-5 md:px-40 pt-5">
                        <div className="bg-[#ffffff] border-2 border-[#3C5B6F] rounded shadow-lg p-2 md:p-5">
                            {recipe.strInstructions.split('\n').map((inst: string, index: number) => (
                                inst ? (<p key={index}>{index + 1}. {inst.trim()}</p>) : null
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            )})}
        </div>
    );
}