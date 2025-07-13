"use client";
import React, { useState } from "react";
import '../allMeals/allMealsStyle.css'
import formatDate from "@/utils/formatData";

export default function AddingClient() {
    const [form, setForm] = useState({ title: "", description: "", location: "", when: "", max_reservations:"", price: "", created_date: formatDate(Date.now()), image_url: "" });
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("https://meal-sharing-0uag.onrender.com/api/meals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                }),
            });
            if (res.ok) {
                alert("Meal data sent!");
                setForm({ title: "", description: "", location: "", when: "", max_reservations: "", price: "", created_date: formatDate(Date.new()), image_url: "" });
            } else {
                alert("Sending review failed. Please try again.");
            }
        } catch {
            alert("An error occurred. Please try again.");
        }
        setSubmitting(false);
    }

    return (
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
                        name="location"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="when"
                        placeholder="When"
                        value={form.when}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="max_reservations"
                        placeholder="Reservations"
                        value={form.max_reservations}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="image_url"
                        placeholder="URL"
                        value={form.image_url}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Sending meal data..." : "Add meal"}
                    </button>
                </form>
    );
}