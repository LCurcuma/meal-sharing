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

    //doesn't work (doesn't update the meals list by filter)
    async function filtering(filter, filterValue){
            if(filter && filterValue){
            const data = await fetch(`http://localhost:3001/api/meals?${filter}=${filterValue}`)
            .then(res => res.json());
            setMeals(data);
        }else{
            const data = await fetch("http://localhost:3001/all-meals")
            .then(res => res.json())
            .then(setMeals);
        }
    }

        useEffect(() => {
            fetch("http://localhost:3001/all-meals")
            .then(res => res.json())
            .then(setMeals);
        }, []);

        //changed all if/else for filters to one useEffect
        useEffect(() => {
            fetch(`http://localhost:3001/api/meals?${filter}=${filterValue}`)
            .then(res => res.json())
            .then(setMeals);
        }, [filtering]);

        //changed all if/else for sortKey and sortDir
        useEffect(() => {
            fetch(`http://localhost:3001/api/meals?sortKey=${sortKey}&sortDir=${sortDir}`)
            .then(res => res.json())
            then(setMeals);
        })

    function onSelectFilter(e){
        setFilter(e.target.value);
        console.log(filter);
    }

    function onSelectFilterAll(e){
        setFilterForAll(e.target.value);
    }

    //doesn't work (also doesn't update the meals list)
    async function onSelectSortKey(e){
        setSortKey(e.target.value);
    }

    function onSelectSortDir(e){
        setSortDir(e.target.value);
    }

    function onFilterValueChange(e){
        setFilterValue(e.target.value);
        filtering(filter, filterValue);
    }

    return(
        <>
        <div className="buttonsLeft">
            <a href="http://localhost:3001/add-meal"><button>Add meal</button></a>
            <a href="http://localhost:3001/edit-meal"><button>Edit meal</button></a>
            <a href="http://localhost:3001/delete-meal"><button>Delete meal</button></a>
        </div>
        <div className="buttonsCenter">
            <input type="text" placeholder="Input filtering words" onChange={onFilterValueChange}></input>
            <select onSelect={onSelectFilter}>
                <option value="">filter by</option>
                <option value="maxPrice">maximum price</option>
                <option value="title">title</option>
                <option value="dateAfter">date after</option>
                <option value="dateBefore">date before</option>
                <option value="limit">limit</option>
                <option value="id">id</option>
            </select>
            <select onSelect={onSelectFilterAll}>
                <option value="">filter all meals by</option>
                <option value="first">first meal</option>
                <option value="last">last meal</option>
                <option value="future">future meals</option>
                <option value="past"> past meals</option>
                <option value="available_reservations">meals with available reservations</option>
            </select>
            <select onSelect={onSelectSortKey}>
                <option value="">sort by</option>
                <option value="when">date</option>
                <option value="max_reservations">available reservations</option>
                <option value="price">price</option>
            </select>
            <select onSelect={onSelectSortDir}>
                <option value="asc">ascending</option>
                <option value="desc">descending</option>
            </select>
        </div>
        <h1>Meals</h1>
        <div className="container">
        {meals.map(meal => (
            <Card key={meal.id} id={meal.id} title={meal.title} description={meal.description} location={meal.location} when={meal.when} maxReservations={meal.max_reservations} price={meal.price} createdDate={meal.created_date}/>
        ))}
        </div>
        </>
    )
}