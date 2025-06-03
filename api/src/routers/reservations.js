//there's week2 assignment

import "dotenv/config";
import express from "express";
import knex from "../database_client.js";
import bodyParser from "body-parser";

const reservationsRouter = express.Router();
reservationsRouter.use(express.json());
reservationsRouter.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);

reservationsRouter.get("/reservations", async (req, res) => {
  try {
    const reservations = await knex.raw(
      "SELECT * FROM reservation ORDER BY id ASC;"
    );
    if (reservations[0].length === 0) {
      return res.status(404).json({ error: "No reservations found" });
    }
    res.json(reservations[0]);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationsRouter.post("/reservations", async (req, res) => {
  try {
    const reservation = req.body;
    console.log("Received reservation data:", reservation);
    const addedReservation = await knex.table("reservation").insert({
      number_of_guests: reservation.number_of_guests,
      meal_id: reservation.meal_id,
      created_date: reservation.created_date,
      contact_phonenumber: reservation.contact_phonenumber,
      contact_name: reservation.contact_name,
      contact_email: reservation.contact_email
    });
    res.status(201).send("reservation created successfully");
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationsRouter.get("/reservations/:id", async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await knex.raw(
      `SELECT * FROM reservation WHERE id = ${reservationId};`
    );
    if (reservation[0].length === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation[0][0]);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationsRouter.put("/reservations/:id", async (req, res) => {
  const reservationId = req.params.id;
  const updatedReservation = req.body;
  try {
    const result = await knex("reservation")
      .where({ id: reservationId })
      .update({
        number_of_guests: updatedReservation.number_of_guests,
        meal_id: updatedReservation.meal_id,
        created_date: updatedReservation.created_date,
        contact_phonenumber: updatedReservation.contact_phonenumber,
        contact_name: updatedReservation.contact_name,
        contact_email: updatedReservation.contact_email
      });

    if (result === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).send("Reservation updated successfully");
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reservationsRouter.delete("/reservations/:id", async (req, res) => {
  const reservationId = req.params.id;
  try {
    const result = await knex("reservation").where({ id: reservationId }).del();
    if (result === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).send("Reservation deleted successfully");
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default reservationsRouter;
