"use client";
import React, { useState } from "react";
import './allMeals/allMealsStyle.css'
import formatDate from "@/utils/formatData";
import Card from "./allMeals/MealReservation";
import Link from "next/link";

export default function MealClient({ meal }) {
    const [form, setForm] = useState({ contact_name: "", contact_email: "", contact_phonenumber: "", number_of_guests: "", created_date: formatDate(Date.now()) + ' 00:00:00' });
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("https://meal-sharing-0uag.onrender.com/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    meal_id: meal.id,
                    ...form,
                    number_of_guests: parseInt(form.number_of_guests, 10),
                }),
            });
            if (res.ok) {
                alert("Reservation successful!");
                setForm({ contact_name: "", contact_email: "", contact_phonenumber: "", number_of_guests: "", created_date: formatDate(Date.now())+ ' 00:00:00' });
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
        <>
        <header>
            <a className="header_text">Meal-sharing project</a>
        </header>
        <main>
            <Card key={meal.id} id={meal.id} title={meal.title} description={meal.description} location={meal.location} when={meal.when} maxReservations={meal.max_reservations} price={meal.price} createdDate={meal.created_date} availableReservations={meal.available_reservations} imageURL={meal.image_url}/>
            {availableReservations > 0 ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="contact_name"
                        placeholder="Name"
                        value={form.contact_name}
                        onChange={handleChange}
                        className="input_reservation"
                        required
                    />
                    <input
                        type="email"
                        name="contact_email"
                        placeholder="Email"
                        value={form.contact_email}
                        onChange={handleChange}
                        className="input_reservation"
                        required
                    />
                    <input
                        type="tel"
                        name="contact_phonenumber"
                        placeholder="Phone number"
                        value={form.contact_phonenumber}
                        onChange={handleChange}
                        className="input_reservation"
                        required
                    />
                    <input
                    type="number"
                    name="number_of_guests"
                    placeholder="Number of guests"
                    value={form.number_of_guests}
                    onChange={handleChange}
                        className="input_reservation"
                    required
                    />
                    <button className="btn_go" type="submit" disabled={submitting}>
                        {submitting ? "Booking..." : "Book meal"}
                    </button>
                    <Link href="/meals"><button className="btn_back">Back</button></Link>
                </form>
            ) : (
                <>
                <div className="no_reservations">No available reservations for this meal.</div>
                    <Link href="/meals" className="no_decoration"><button className="btn_go">Back</button></Link>
                </>
            )}
        </main>
        <footer className="footer_without_content"></footer>
        </>
    );
}