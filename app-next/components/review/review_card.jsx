"use client";

import "../allMeals/allMealsStyle.css";
import "../allMeals/styles.scss";
import React from "react";


export default function ReviewCard({title, description, stars, createdDate}){
    

    function showAll(){
        setShowDetails((prev) => !prev);
    }
    
    return (
        <div className="my-card-content" onClick={showAll}>
                <div className="images-plus-description">
                <div className="main_content">
                <p>Stars: {stars}</p>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>Created: {createdDate}</p>
                </div>
                </div>
            </div>
    )
}
