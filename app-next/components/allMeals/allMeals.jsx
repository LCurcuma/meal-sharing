//didn't add the pages for add/edit/delete meals, because the features on the current page doesn't work

"use client";

import "./allMealsStyle.css";
import { useState, useEffect } from 'react';
import Card from "./Meal";
import Link from "next/link";

export default function AllMeals(){
    const [meals, setMeals] = useState([]);
    const [title, setTitle] = useState("");
    const [key, setKey] = useState("");
    const [direction, setDirection] = useState("asc")

    useEffect(() => {
        let url = "";

        if(key === ""){
            if(title === "" ){
                url = 'https://meal-sharing-0uag.onrender.com/all-meals';
            } else {
                url = `https://meal-sharing-0uag.onrender.com/api/meals?title=${title}`;
            }
        } else {
            if(title === ""){
                url = `https://meal-sharing-0uag.onrender.com/api/meals?sortKey=${key}&sortDir=${direction}`;
            } else {
                url = `https://meal-sharing-0uag.onrender.com/api/meals?title=${title}&sortKey=${key}&sortDir=${direction}`;
            }
        }

        fetch(url)
        .then(res => res.json())
        .then(setMeals);
    }, [title, key, direction])
            
    function handleChange(e){
        setTitle(e.target.value);
    }

    function handleKeyChange(e){
        setKey(e.target.value);
    }

    function toggleDir(){
        if(direction === 'asc'){
            setDirection('desc');
            console.log(direction);
        } else {
            setDirection('asc');
        }
    }
    

    return(
        <>
        <header>
            <a className="header_text">Meal-sharing project</a>
        </header>
        <main>
        <h1>Meals</h1>
        <div className="input_field">
        <input type="text" placeholder="Write the name of the meal" onChange={handleChange} className="input"></input>
        <select onChange={handleKeyChange} value={key} className="select">
            <option value="">default</option>
            <option value="`when`">by date</option>
            <option value="max_reservations">by amount of reservations</option>
            <option value="price">by price</option>
        </select>
        {key !== "" &&
        <button onClick={toggleDir} className="direction">{direction}</button>
        }
        </div>
        <div className="container">
        {(Array.isArray(meals) ? meals : [])?.map(meal => (
            <Card key={meal.id} id={meal.id} title={meal.title} description={meal.description} location={meal.location} when={meal.when} maxReservations={meal.max_reservations} price={meal.price} createdDate={meal.created_date} availableReservations={meal.available_reservations} imageURL={meal.image_url}/>
        ))}
        </div>
        <Link href="/" className="no_decoration"><button className="btn_back">To Main Page</button></Link>
        </main>
        <footer>
            <p>Website was created for learning purposes</p>
            <p>All materials were taken from channels, that you can subscribe to (there are many good recipes):</p>
            <ul>
            <li><Link href="https://www.youtube.com/@SugarHighScore" className="no_decoration">Sugar High Score</Link></li>
            <li><Link href="https://www.youtube.com/@XueRen-" className="no_decoration">Xue Ren雪人</Link></li>
            <li><Link href="https://www.youtube.com/@whipsugar" className="no_decoration">ホイップシュガーのアイシングクッキーチャンネル</Link></li>
            <li><Link href="https://www.youtube.com/@BEMBUMKITCHEN" className="no_decoration">BEMBUM KITCHEN</Link></li>
            <li><Link href="https://www.youtube.com/@colby-jack-rabbit" className="no_decoration">Colby Jack Rabbit</Link></li>
            <li><Link href="https://www.youtube.com/@meringue__s" className="no_decoration">머랭쓰 Meringue’s</Link></li>
            <li><Link href="https://www.youtube.com/@SugarBean" className="no_decoration">Sugar Bean 슈가빈</Link></li>
            <li><Link href="https://www.youtube.com/@bakingmonster3453" className="no_decoration">베이몬 Baking Monster</Link></li>
            <li><Link href="https://www.youtube.com/@누빗nubittime" className="no_decoration">누빗 nubittime</Link></li>
            </ul>
        </footer>
        </>
    )
}