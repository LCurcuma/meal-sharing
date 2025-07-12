//there's week2 assignment, except for the week3 part
import "dotenv/config";
import express from "express";
import knex from "../database_client.js";
import bodyParser from "body-parser";

const mealsRouter = express.Router();
mealsRouter.use(express.json());
mealsRouter.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);

mealsRouter.get("/meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT _meal.id, _meal.title, _meal.description, _meal.location, _meal.when, _meal.max_reservations, _meal.price, _meal.created_date, COALESCE(_meal.max_reservations - SUM(_reservation.number_of_guests), _meal.max_reservations) AS available_reservations, _meal.image_url FROM _meal LEFT JOIN _reservation ON _meal.id::integer=_reservation.meal_id::integer GROUP BY _meal.id ORDER BY _meal.id ASC");
    if (meals[0].length === 0) {
      return res.status(404).json({ error: "No meals found" });
    }

    //---the start of week3 assignments part (filtering meals, that cost less than or equal to maxPrice)---
    if ("maxPrice" in req.query) {
      const [maxPrice] = req.query.maxPrice.toString().split(" ");
      console.log("Max Price:", maxPrice);
      if (!maxPrice || isNaN(maxPrice) || Number(maxPrice) < 0) {
        return res.status(400).json({ error: "Invalid maxPrice parameter" });
      }
      const filteredMeals = await knex.raw(
        `SELECT * FROM _meal WHERE price <= ${Number(maxPrice)} ORDER BY id ASC;`
      );
      if (filteredMeals.length === 0) {
        return res
          .status(404)
          .json({ error: "No meals found within the specified price range" });
      }
      return res.json(filteredMeals[0]);
    } else if ("availableReservations" in req.query) {
      const filter = ["true", "false"];
      const availableReservations = req.query.availableReservations
        .toString()
        .toLowerCase();
      if (!filter.includes(availableReservations)) {
        return res
          .status(400)
          .json({ error: "Invalid availableReservations parameter" });
      }
      if (availableReservations === "true") {
        const availableMeals = await knex.raw(
          `SELECT * FROM _meal WHERE max_reservations > 0 ORDER BY id ASC;`
        );
        if (availableMeals[0].length === 0) {
          return res
            .status(404)
            .json({ error: "No meals with available reservations found" });
        }
        return res.json(availableMeals[0]);
      } else if (availableReservations === "false") {
        const unavailableMeals = await knex.raw(
          `SELECT * FROM _meal WHERE max_reservations = 0 ORDER BY id ASC;`
        );
        if (unavailableMeals[0].length === 0) {
          return res
            .status(404)
            .json({ error: "No meals without available reservations found" });
        }
        return res.json(unavailableMeals[0]);
      }
    } else if ("title" in req.query) {
      const title = req.query.title.toString().toLowerCase();
      if (!title) {
        return res.status(400).json({ error: "Invalid title parameter" });
      }
      const mealsByTitle = await knex.raw(
        `SELECT _meal.id, _meal.title, _meal.description, _meal.location, _meal.when, _meal.max_reservations, _meal.price, _meal.created_date, COALESCE(_meal.max_reservations - SUM(_reservation.number_of_guests), _meal.max_reservations) AS available_reservations, _meal.image_url FROM _meal LEFT JOIN _reservation ON _meal.id::integer=_reservation.meal_id::integer WHERE LOWER(title) LIKE '%${title}%' GROUP BY _meal.id ORDER BY _meal.id ASC;`
      );
      if (mealsByTitle[0].length === 0) {
        return res
          .status(404)
          .json({ error: "No meals found with the specified title" });
      }
      return res.json(mealsByTitle[0]);
    } else if ("dateAfter" in req.query) {
      const dateAfter = req.query.dateAfter.toString();
      if (!dateAfter || isNaN(Date.parse(dateAfter))) {
        return res.status(400).json({ error: "Invalid dateAfter parameter" });
      }
      const mealsAfterDate = await knex.raw(
        `SELECT * FROM _meal WHERE \`when\` > '${dateAfter}' ORDER BY id ASC;`
      );
      if (mealsAfterDate[0].length === 0) {
        return res
          .status(404)
          .json({ error: "No meals found after the specified date" });
      }
      return res.json(mealsAfterDate[0]);
    } else if ("dateBefore" in req.query) {
      const dateBefore = req.query.dateBefore.toString();
      if (!dateBefore || isNaN(Date.parse(dateBefore))) {
        return res.status(400).json({ error: "Invalid dateBefore parameter" });
      }
      const mealsBeforeDate = await knex.raw(
        `SELECT * FROM _meal WHERE \`when\` < '${dateBefore}' ORDER BY id ASC;`
      );
      if (mealsBeforeDate[0].length === 0) {
        return res
          .status(404)
          .json({ error: "No meals found before the specified date" });
      }
      return res.json(mealsBeforeDate[0]);
    } else if ("limit" in req.query) {
      const limit = parseInt(req.query.limit, 10);
      if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({ error: "Invalid limit parameter" });
      }
      const limitedMeals = await knex.raw(
        `SELECT _meal.id, _meal.title, _meal.description, _meal.location, _meal.when, _meal.max_reservations, _meal.price, _meal.created_date, COALESCE(_meal.max_reservations - SUM(_reservation.number_of_guests), _meal.max_reservations) AS available_reservations, _meal.image_url FROM _meal LEFT JOIN _reservation ON _meal.id::integer=reservation.meal_id::integer GROUP BY _meal.id ORDER BY _meal.id ASC LIMIT ${limit};`
      );
      if (limitedMeals[0].length === 0) {
        return res.status(404).json({ error: "No meals found" });
      }
      return res.json(limitedMeals[0]);
    } else if ("sortKey" in req.query) {
      const sortKey = req.query.sortKey.toString().toLowerCase();
      const validSortKeys = ["`when`", "max_reservations", "price"];
      if (!validSortKeys.includes(sortKey)) {
        return res.status(400).json({ error: "Invalid sortKey parameter" });
      }
      if ("sortDir" in req.query) {
        const sortDir = req.query.sortDir.toString().toLowerCase();
        if (sortDir !== "asc" && sortDir !== "desc") {
          return res.status(400).json({ error: "Invalid sortDir parameter" });
        }
        const sortedMeals = await knex.raw(
          `SELECT _meal.id, _meal.title, _meal.description, _meal.location, _meal.when, _meal.max_reservations, _meal.price, _meal.created_date, COALESCE(_meal.max_reservations - SUM(_reservation.number_of_guests), _meal.max_reservations) AS available_reservations, _meal.image_url FROM _meal LEFT JOIN _reservation ON _meal.id::integer=_reservation.meal_id::integer GROUP BY _meal.id ORDER BY ${sortKey} ${req.query.sortDir.toUpperCase()};`
        );
        return res.json(sortedMeals[0]);
      }
      const sortedMeals = await knex.raw(
        `SELECT _meal.id, _meal.title, _meal.description, _meal.location, _meal.when, _meal.max_reservations, _meal.price, _meal.created_date, COALESCE(_meal.max_reservations - SUM(_reservation.number_of_guests), _meal.max_reservations) AS available_reservations, _meal.image_url FROM _meal LEFT JOIN _reservation ON _meal.id::integer=_reservation.meal_id::integer GROUP BY _meal.id ORDER BY ${sortKey} ASC;`

      );
      if (sortedMeals[0].length === 0) {
        return res.status(404).json({ error: "No meals found" });
      }
      return res.json(sortedMeals[0]);
    }
    //---the end of week3 assignments part---
    res.json(meals[0]);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mealsRouter.post("/meals", async (req, res) => {
  try {
    const meal = req.body;
    console.log("Received meal data:", meal);
    const addedMeal = await knex.table("_meal").insert({
      title: meal.title,
      description: meal.description,
      when: meal.when,
      location: meal.location,
      max_reservations: meal.max_reservations,
      price: meal.price,
      created_date: meal.created_date,
      image_url: meal.image_url,
    });
    res.status(201).send("meal created successfully");
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mealsRouter.get("/meals/:id", async (req, res) => {
  const mealId = req.params.id;
  try {
    const meal = await knex.raw(`SELECT _meal.id, _meal.title, _meal.description, _meal.location, _meal.when, _meal.max_reservations, _meal.price, _meal.created_date, COALESCE(_meal.max_reservations - SUM(_reservation.number_of_guests), _meal.max_reservations) AS available_reservations, _meal.image_url FROM _meal LEFT JOIN _reservation ON _meal.id::integer=_reservation.meal_id::integer WHERE _meal.id=${mealId} GROUP BY _meal.id `);
    if (meal[0].length === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json(meal[0][0]);
  } catch (error) {
    console.error("Error creating meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mealsRouter.put("/meals/:id", async (req, res) => {
  const mealId = req.params.id;
  const updatedMeal = req.body;
  try {
    const result = await knex("_meal").where({ id: mealId }).update({
      title: updatedMeal.title,
      description: updatedMeal.description,
      when: updatedMeal.when,
      location: updatedMeal.location,
      max_reservations: updatedMeal.max_reservations,
      price: updatedMeal.price,
      created_date: updatedMeal.created_date,
    });

    if (result === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.status(200).send("Meal updated successfully");
  } catch (error) {
    console.error("Error updating meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mealsRouter.delete("/meals/:id", async (req, res) => {
  const mealId = req.params.id;
  try {
    const result = await knex("_meal").where({ id: mealId }).del();
    if (result === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.status(200).send("Meal deleted successfully");
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default mealsRouter;
