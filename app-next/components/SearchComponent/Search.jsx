"use client";

import React, { useState, useEffect } from 'react';

export default function Search(){
    const [title, setTitle] = useState("");
    const [meals, setMeals] = useState();

    useEffect(() => {
        fetch(`http://localhost:3001/api/meals?title=${title}`)
        .then(data => data.json())
        .then(setMeals);
    }, [handleChange])

    function handleChange(e){
        setTitle(e.target.value);
        console.log(title);
    }

    return (
        <>
        <input type="text" placeholder="Write the name of the meal" onChange={handleChange}></input>
        </>
    )
}