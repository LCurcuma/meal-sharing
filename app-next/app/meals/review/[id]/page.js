import ReviewClient from "../../../../components/review/Review";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:3001/api/meals");
    const meals = await res.json();
    return meals.map(meal => ({
        id: meal.id.toString(),
    }));
}

export default async function MealPage({ params }) {
    // Fetch meal data on the server
    const res = await fetch(`http://localhost:3001/api/meals/id=${params.id}`);
    const meal = await res.json();

    return <ReviewClient meal={meal} />;
}