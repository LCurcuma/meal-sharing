import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});

//---week1 homework---
app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

app.get("/future-meals", async (req, res) => {
  try {
    const futureMeals = await knex.raw(
      "SELECT * FROM meal WHERE `when` > NOW() ORDER BY `when` ASC;"
    );
    res.json(futureMeals[0]);
  } catch (error) {
    console.error("Error fetching future meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/past-meals", async (req, res) => {
  try {
    const pastMeals = await knex.raw(
      "SELECT * FROM meal WHERE `when` < NOW() ORDER BY `when` ASC;"
    );
    res.json(pastMeals[0]);
  } catch (error) {
    console.error("Error fetching future meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/all-meals", async (req, res) => {
  try {
    const [meals] = await knex.raw("SELECT meal.id, meal.title, meal.description, meal.location, meal.when, meal.max_reservations, meal.price, meal.created_date, COALESCE(meal.max_reservations - SUM(reservation.number_of_guests), meal.max_reservations) AS available_reservations, image_url FROM meal LEFT JOIN reservation ON meal.id=reservation.meal_id GROUP BY meal.id ORDER BY meal.id ASC");
    if (meals.length === 0) {
      return res.status(404).json({ error: "No meals found" });
    }
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/first-meal", async (req, res) => {
  try {
    const firstMeal = await knex.raw(
      "SELECT * FROM meal ORDER BY id ASC LIMIT 1"
    );
    if (firstMeal[0].length === 0) {
      return res.status(404).json({ error: "No meals found" });
    }
    res.json(firstMeal[0]);
  } catch (error) {
    console.error("Error fetching first meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/last-meal", async (req, res) => {
  try {
    const lastMeal = await knex.raw(
      "SELECT * FROM meal ORDER BY id DESC LIMIT 1"
    );
    if (lastMeal[0].length === 0) {
      return res.status(404).json({ error: "No meals found" });
    }
    res.json(lastMeal[0]);
  } catch (error) {
    console.error("Error fetching last meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//---week2 homework---
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";

app.use("/api", mealsRouter);
app.use("/api", reservationsRouter);

//---week3 homework---
import reviewsRouter from "./routers/reviews.js";
app.use("/api", reviewsRouter);