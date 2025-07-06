//didn't add the pages for add/edit/delete meals, because the features on the current page doesn't work

"use client";

import "./allMealsStyle.css";
import { useState, useEffect } from 'react';
import Card from "./Meal";

export default function AllMeals(){
    const [meals, setMeals] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterForAll, setFilterForAll] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortDir, setSortDir] = useState('');
    const [filterValue, setFilterValue] = useState('');

        useEffect(() => {
            fetch("http://localhost:3001/all-meals")
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
        </>
    )
}