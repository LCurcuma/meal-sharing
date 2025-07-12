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
    const meals = await knex.raw("SELECT _meal.id, _meal.title, _meal.description, _meal.location, _meal.when, _meal.max_reservations, _meal.price, _meal.created_date, COALESCE(CAST(_meal.max_reservations AS INTEGER) - SUM(CAST(_reservation.number_of_guests AS INTEGER)), CAST(_meal.max_reservations AS INTEGER)) AS available_reservations, _meal.image_url FROM _meal LEFT JOIN _reservation ON _meal.id::integer=_reservation.meal_id::integer GROUP BY _meal.id, _meal.title, _meal.description, _meal.location, _meal.when, _meal.max_reservations, _meal.price, _meal.created_date, _meal.image_url ORDER BY _meal.id ASC");
    const data = await meals.rows;
  // const SHOW_TABLES_QUERY =
  //   process.env.DB_CLIENT === "pg"
  //     ? "SELECT * FROM _meal;"
  //     : "SHOW TABLES;";
  // const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json(data);
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
      "SELECT * FROM _meal WHERE `when` > NOW() ORDER BY `when` ASC;"
    );
    res.json(futureMeals[0]);
  } catch (error) {
    console.error("Error fetching future meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/past-meals", async (req, res) => {
  try {
    const data1 = await knex.raw(
      "SELECT * FROM _meal WHERE `when` < NOW() ORDER BY `when` ASC;"
    );
    const pastMeals = await data1.rows;
    res.json(pastMeals);
  } catch (error) {
    console.error("Error fetching future meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/all-meals", async (req, res) => {
  try {
    const data = await knex.raw("SELECT _meal.id, _meal.title, _meal.description, _meal.location, _meal.when, _meal.max_reservations, _meal.price, _meal.created_date, COALESCE(CAST(_meal.max_reservations AS INTEGER) - SUM(CAST(_reservation.number_of_guests AS INTEGER)), CAST(_meal.max_reservations AS INTEGER)) AS available_reservations, _meal.image_url FROM _meal LEFT JOIN _reservation ON _meal.id::integer=_reservation.meal_id::integer GROUP BY _meal.id ORDER BY _meal.id ASC");
    const meals = await data.rows;
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
    const data = await knex.raw(
      "SELECT * FROM _meal ORDER BY id ASC LIMIT 1"
    );
    const firstMeal = await data.rows;
    if (firstMeal.length === 0) {
      return res.status(404).json({ error: "No meals found" });
    }
    res.json(firstMeal);
  } catch (error) {
    console.error("Error fetching first meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/last-meal", async (req, res) => {
  try {
    const data = await knex.raw(
      "SELECT * FROM _meal ORDER BY id DESC LIMIT 1"
    );
    const lastMeal = await data.rows;
    if (lastMeal.length === 0) {
      return res.status(404).json({ error: "No meals found" });
    }
    res.json(lastMeal);
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