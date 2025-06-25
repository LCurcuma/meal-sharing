"use client";

import "./allMealsStyle.css";
import "./styles.scss";
import React, { useState } from "react";

export default function Card({id, title, description, location, when, maxReservations, price, createdDate}){

    const [showDetails, setShowDetails] = useState(false);

    function showAll(){
        setShowDetails((prev) => !prev);
    }
    
    return (
        <div className="mdc-card my-card-content" onClick={showAll}>
            <div className="mdc-card__primary-action" >
                <img src="https://www.dish-works.com/wp-content/uploads/bb-plugin/cache/Hatch-Chile-Chilaquiles_shot-1-square-7a40679e66b01fbfcde6429f39d329eb-ulojni6d457q.jpg"/>
                <h2>{title}</h2>
                <p>{description}</p>
                {showDetails && ( 
                <div className="additional_content" id={`addition-${id}`}>
                <p>Location: {location}</p>
                <p>When: {when}</p>
                <p>Max reservations: {maxReservations}</p>
                <p>Price: {price}</p>
                <p>Created: {createdDate}</p>
                </div>
                )}
            </div>
        </div>
    )
}
