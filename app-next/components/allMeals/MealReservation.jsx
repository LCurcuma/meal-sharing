"use client";

import "./allMealsStyle.css";
import "./styles.scss";
import React, { useState } from "react";
import Link from "next/link";


export default function Card({id, title, description, location, when, maxReservations, price, createdDate, availableReservations, imageURL}){

    const [showDetails, setShowDetails] = useState(false);

    function showAll(){
        setShowDetails((prev) => !prev);
    }
    
    return (
        <div className="mdc-card my-card-content" onClick={showAll}>
            <div className="mdc-card__primary-action" >
                <p className="availableReservations">Available reservations: {availableReservations}</p>
                <div className="images-plus-description">
                <img src={imageURL}/>
                <div className="main_content">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="additional_content" id={`addition-${id}`}>
                <p>Location: {location}</p>
                <p>When: {when}</p>
                <p>Max reservations: {maxReservations}</p>
                <p>Price: {price}</p>
                <p>Created: {createdDate}</p>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}
