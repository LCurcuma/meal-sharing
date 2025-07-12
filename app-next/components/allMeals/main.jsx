//didn't add the pages for add/edit/delete meals, because the features on the current page doesn't work

"use client";

import "./allMealsStyle.css";
import { useState, useEffect } from 'react';
import Card from "./MealMain";
import Link from "next/link";

export default function Main(){
    const [meals, setMeals] = useState([]);
    const pathname = '/meals';

    //doesn't work (doesn't update the meals list by filter)

        useEffect(() => {
            fetch("https://meal-sharing-0uag.onrender.com/api/meals?limit=3")
            .then(res => res.json())
            .then(setMeals);
        }, []);

        console.log(meals);


    return(
        <>
        <header>
            <p className="header_text">Meal-sharing project</p>
        </header>
        <main>
        <h1>Meals</h1>
        <div className="container">
        {(Array.isArray(meals) ? meals : [])?.map(meal => (
            <Card key={meal.id} id={meal.id} title={meal.title} description={meal.description} location={meal.location} when={meal.when} maxReservations={meal.max_reservations} price={meal.price} createdDate={meal.created_date} availableReservations={meal.available_reservations} imageURL={meal.image_url} />
        ))}
        </div>
        <div className="buttonContainer">
        <Link href={pathname} className="no_decoration"><button className="btn_go">All meals</button></Link>
        </div>
        </main>
        <footer>
            <p>Website was created for learning purposes</p>
            <p>All materials were taken from channels, that you can subscribe (there are many good recipes):</p>
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