//there's week3 assignment

import "dotenv/config";
import express from "express";
import knex from "../database_client.js";
import bodyParser from "body-parser";

const reviewsRouter = express.Router();
reviewsRouter.use(express.json());
reviewsRouter.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);

reviewsRouter.get("/reviews", async (req, res) => {
  try {
    const reviews = await knex.raw(
      "SELECT * FROM _review ORDER BY id ASC;"
    );
    if (reviews[0].length === 0) {
      return res.status(404).json({ error: "No reviews found" });
    }
    res.json(reviews[0]);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reviewsRouter.get("/meals/:mealId/reviews", async (req, res) => {
    try{
        const mealId = req.params.mealId;
        const reviews = await knex.raw(
            `SELECT * FROM _review WHERE meal_id = ${mealId} ORDER BY created_date DESC;`);
            console.log("Reviews for meal ID:", mealId, reviews[0]);
        res.json(reviews[0]);
    }   catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
    
});

reviewsRouter.post("/reviews", async (req, res) => {
  try {
    const reviews = req.body;
    console.log("Received reviews data:", reviews);
    const addedReview = await knex.table("_review").insert({
      title: reviews.title,
      description: reviews.description,
      meal_id: reviews.meal_id,
      stars: reviews.stars,
        created_date: reviews.created_date
    });
    res.status(201).send("review created successfully");
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reviewsRouter.get("/reviews/:id", async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await knex.raw(
      `SELECT * FROM _review WHERE id = ${reviewId};`
    );
    if (review[0].length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review[0][0]);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reviewsRouter.put("/reviews/:id", async (req, res) => {
  const reviewId = req.params.id;
  const updatedReview = req.body;
  try {
    const result = await knex("_review")
      .where({ id: reviewId })
      .update({
      title: reviews.title,
      description: reviews.description,
      meal_id: reviews.meal_id,
      stars: reviews.stars,
        created_date: reviews.created_date
      });

    if (result === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).send("Review updated successfully");
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

reviewsRouter.delete("/reviews/:id", async (req, res) => {
  const reviewId = req.params.id;
  try {
    const result = await knex("_review").where({ id: reviewId }).del();
    if (result === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).send("Review deleted successfully");
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default reviewsRouter;
