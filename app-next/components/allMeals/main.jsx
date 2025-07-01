//didn't add the pages for add/edit/delete meals, because the features on the current page doesn't work

"use client";

import "./allMealsStyle.css";
import { useState, useEffect } from 'react';
import Card from "./Meal";
import { usePathname } from "next/navigation";

export default function AllMeals(){
    const [meals, setMeals] = useState([]);
    const pathname = usePathname()+'meals';

    //doesn't work (doesn't update the meals list by filter)

        useEffect(() => {
            fetch("http://localhost:3001/api/meals?limit=2")
            .then(res => res.json())
            .then(setMeals);
        }, []);


    return(
        <>
        <h1>Meals</h1>
        <div className="container">
        {(Array.isArray(meals) ? meals : [])?.map(meal => (
            <Card key={meal.id} id={meal.id} title={meal.title} description={meal.description} location={meal.location} when={meal.when} maxReservations={meal.max_reservations} price={meal.price} createdDate={meal.created_date}/>
        ))}
        </div>
        <div className="buttonContainer">
        <a href={pathname}><button>All meals</button></a>
        </div>
        </>
    )
}