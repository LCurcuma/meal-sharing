"use client";
import React, { useState } from "react";
import './allMeals/allMealsStyle.css'
import formatDate from "@/utils/formatData";

export default function MealClient({ meal }) {
    const [form, setForm] = useState({ contact_name: "", contact_email: "", contact_phonenumber: "", number_of_guests: "", created_date: formatDate(Date.now()) });
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("http://localhost:3001/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    meal_id: meal.id,
                    ...form,
                }),
            });
            if (res.ok) {
                alert("Reservation successful!");
                setForm({ contact_name: "", contact_email: "", contact_phonenumber: "", number_of_guests: "", created_date: formatDate(Date.now()) });
            } else {
                alert("Reservation failed. Please try again.");
            }
        } catch {
            alert("An error occurred. Please try again.");
        }
        setSubmitting(false);
    }

    const availableReservations =
        meal.max_reservations - (meal.reservations_count || 0);

    return (
        <div>
            <h2>{meal.title}</h2>
            <p>{meal.description}</p>
            <p>Location: {meal.location}</p>
            <p>Date: {meal.when}</p>
            <p>
                Available reservations:{" "}
                {availableReservations > 0 ? availableReservations : 0}
            </p>
            {availableReservations > 0 ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="contact_name"
                        placeholder="Name"
                        value={form.contact_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="contact_email"
                        placeholder="Email"
                        value={form.contact_email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="contact_phonenumber"
                        placeholder="Phone number"
                        value={form.contact_phonenumber}
                        onChange={handleChange}
                        required
                    />
                    <input
                    type="text"
                    name="number_of_guests"
                    placeholder="Number of guests"
                    value={form.number_of_guests}
                    onChange={handleChange}
                    required
                    />
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Booking..." : "Book seat"}
                    </button>
                </form>
            ) : (
                <div>No available reservations for this meal.</div>
            )}
        </div>
    );
}