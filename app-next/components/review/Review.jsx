"use client";
import React, { useState } from "react";
import '../allMeals/allMealsStyle.css'
import formatDate from "@/utils/formatData";
import Card from "../allMeals/MealReservation";
import Link from "next/link";

export default function ReviewClient({ meal }) {
    const [form, setForm] = useState({ title: "", description: "", stars: "", created_date: formatDate(Date.now()) });
    const [submitting, setSubmitting] = useState(false);

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
                <form onSubmit={handleSubmit}>
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
                    <Link href="/meals" className="no_decoration"><button className="btn_back">Back</button></Link>
                </form>
        </main>
        <footer className="footer_without_content"></footer>
        </>
    );
}