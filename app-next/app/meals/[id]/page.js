import MealClient from "../../../components/MealClient";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:3001/api/meals");
    const meals = await res.json();
    return meals.map(meal => ({
        id: meal.id.toString(),
    }));
}

export default async function MealPage({ params }) {
    // Fetch meal data on the server
    const meal_id = await params;
    const res = await fetch(`http://localhost:3001/api/meals/id=${meal_id.id}`);
    const meal = await res.json();

    return <MealClient meal={meal} />;
}