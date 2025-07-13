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
        <div className="my-card-content" onClick={showAll}>
            <div className="availableReservationsContainer" >
                <p className="availableReservations">Available reservations: {parseInt(availableReservations) < 0 ? "0" : availableReservations}</p>
                </div>
                <div className="images-plus-description">
                <img src={imageURL}/>
                <div className="main_content">
                <h2>{title}</h2>
                <p>{description}</p>
                {showDetails && ( 
                <div className="additional_content" id={`addition-${id}`}>
                <p>Location: {location}</p>
                <p>When: {when}</p>
                <p>Max reservations: {maxReservations}</p>
                <p>Price: {price}</p>
                <p>Created: {createdDate}</p>
                <div className="btns">
                <Link href={'/meals/'+id} className="no_decoration"><button className="btn">Make reservation</button></Link>
                <Link href={'/meals/review/'+id} className="no_decoration"><button className="btn">Review meal</button></Link>
                </div>
                </div>
                )}
                </div>
                </div>
            </div>
    )
}
