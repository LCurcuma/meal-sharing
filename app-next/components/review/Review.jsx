"use client";
import React, { useState } from "react";
import '../allMeals/allMealsStyle.css'

export default function ReviewClient({ meal }) {
    const [form, setForm] = useState({ title: "", description: "", stars: "", created_date: Date.now() });
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("http://localhost:3001/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    meal_id: meal.id,
                    ...form,
                }),
            });
            if (res.ok) {
                alert("Review sent!");
                setForm({ title: "", description: "", stars: "", created_date: Date.now() });
            } else {
                alert("Sending review failed. Please try again.");
            }
        } catch {
            alert("An error occurred. Please try again.");
        }
        setSubmitting(false);
    }

    return (
        <div>
            <h2>{meal.title}</h2>
            <p>{meal.description}</p>
            <p>Location: {meal.location}</p>
            <p>Date: {meal.when}</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="stars"
                        placeholder="Stars (from 1 to 5)"
                        value={form.stars}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Sending review..." : "Send review"}
                    </button>
                </form>
        </div>
    );
}