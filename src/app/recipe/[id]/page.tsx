'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'next/navigation'; 
import Link from "next/link";
import Image from 'next/image';
import { GiMeal } from "react-icons/gi";

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params}`)
        .then(res => {
            setRecipes(res.data.meals);
        })
        .catch(err => {
            console.log("data recipe error", err);
        });
    }, [params]);

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

    if (isLoading) {
        return (
          <div className="flex h-screen justify-center items-center">
            <GiMeal className="text-6xl text-[#153448] animate-pulse"/>
          </div>
        )
      }
    
    return (
        <div className="pb-5">
            {recipes.map((recipe: any) => {
                const ingredients = getIngredients(recipe);
        return (
            <div key={recipe.idMeal} className="mt-14 flex flex-col gap-5">
                <div className="header grid grid-cols-1 md:grid-cols-2 p-7">
                    <div className="w-full flex justify-center">
                        <Image src={recipe.strMealThumb} alt="recipe" className="object-contain rounded-lg min-h-72 max-h-80" width={300} height={300}/>
                    </div>
                    <div className="xl:-ml-20 flex flex-col">
                        <p className="w-full flex text-center pt-5 md:text-start text-4xl md:text-5xl font-serif font-semibold text-[#153448] pb-7">{recipe.strMeal}</p>
                        <Link key={recipe.strCategory} href={`/category/${recipe.strCategory}`} passHref className="w-fit text-lg opacity-95 text-[#3C5B6F] hover:font-semibold">Category : {recipe.strCategory}</Link>
                        <Link key={recipe.strArea} href={`/area/${recipe.strArea}`} passHref className="w-fit text-lg opacity-95 text-[#3C5B6F] hover:font-semibold">Area : {recipe.strArea}</Link>
                        <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="w-1/4 min-w-44 mt-7 bg-[#3C5B6F] text-white rounded-full shadow-lg px-3 py-1 text-center inline-block hover:bg-[#153448] transition-colors duration-200">Watch Tutorial</a>
                        <div className="flex flex-row pt-9 gap-2">
                            {recipe.strTags && recipe.strTags.split(',').map((tag: string, index: number) => (
                                <p key={index} className="border-2 border-[#948979] text-[#3C5B6F] rounded-full shadow-lg px-3 py-1">#{tag}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="ingredient">
                    <div className="border-b-2 border-[#948979] border-opacity-30 py-2 md:py-4">
                        <h1 className="w-full flex justify-center text-2xl font-serif font-semibold text-[#153448]">Ingredients</h1>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 md:gap-4 flex-row w-full py-3 px-5 md:px-7">
                        {ingredients.map((ingredient: any, index: number) =>(
                            <Link key={index} href={`/ingredient/${ingredient.ingredient}`} passHref className="bg-[#ffffff] border-2 border-[#DFD0B8] rounded shadow-lg p-2 md:p-4 text-[#153448] hover:bg-[#DFD0B8] transition-all duration-300">
                                <Image src={`https://www.themealdb.com/images/ingredients/${ingredient.ingredient}.png`} alt={ingredient.ingredient} className="w-full h-auto rounded" width={200} height={200}/>
                                <p className="w-full text-center pt-3 text-xs sm:text-sm md:text-base">{ingredient.ingredient}</p>
                                <p className="text-[#3C5B6F] text-center text-sm md:text-base opacity-95 pt-2">{ingredient.measure}</p>
                            </Link>
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