"use client";
import React, { useState, useEffect } from "react";
import '../allMeals/allMealsStyle.css';
import '../allMeals/styles.scss';
import formatDate from "@/utils/formatData";
import Card from "../allMeals/MealReservation";
import Link from "next/link";
import ReviewCard from "./review_card";
import './styles.scss';

export default function ReviewClient({ meal }) {
    const [form, setForm] = useState({ title: "", description: "", stars: "", created_date: formatDate(Date.now()) });
    const [submitting, setSubmitting] = useState(false);
    const [reviewsData, setReviewsData] = useState([]);

    const mealId = meal.id;
    useEffect(() => {
        const url = `https://meal-sharing-0uag.onrender.com/api/meals/${mealId}/reviews`;
        fetch(url)
        .then(res => res.json())
        .then(setReviewsData);
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("https://meal-sharing-0uag.onrender.com/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    meal_id: meal.id,
                    ...form,
                }),
            });
            if (res.ok) {
                alert("Review sent!");
                setForm({ title: "", description: "", stars: "", created_date: formatDate(Date.now()) });
            } else {
                alert("Sending review failed. Please try again.");
            }
        } catch {
            alert("An error occurred. Please try again.");
        }
        setSubmitting(false);
    }

    return (
        <>
        <header>
            <a className="header_text">Meal-sharing project</a>
        </header>
        <main>
            <Card key={meal.id} id={meal.id} title={meal.title} description={meal.description} location={meal.location} when={meal.when} maxReservations={meal.max_reservations} price={meal.price} createdDate={meal.created_date} availableReservations={parseInt(meal.available_reservations) < 0 ? "0" : meal.available_reservations} imageURL={meal.image_url}/>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        className="input_reservation"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        className="input_reservation"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="stars"
                        placeholder="Stars (from 1 to 5)"
                        value={form.stars}
                        className="input_reservation"
                        onChange={handleChange}
                        required
                    />
                    <button className="btn_go" type="submit" disabled={submitting}>
                        {submitting ? "Sending review..." : "Send review"}
                    </button>
                </form>
                <p className="p_review">Reviews from users</p>
                        <div className="container">
                        {(Array.isArray(reviewsData) && reviewsData.length===0 ? (
                            <p className="p_review">There's no review</p>
                        ) : (
                            reviewsData?.map(review => (
                            <ReviewCard key={review.id} title={review.title} description={review.description} stars={review.stars} createdDate={review.created_date}/>
                        ))
                    ))}
                        </div>
                <Link href="/meals" className="no_decoration static"><button className="btn_round">Back</button></Link>
        </main>
        <footer className="footer_without_content"></footer>
        </>
    );
}