import ReviewClient from "../../../../components/review/Review";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:3001/api/meals");
    const meals = await res.json();
    return meals.map(meal => ({
        id: meal.id.toString(),
        title: meal.title,
        description: meal.description, 
        location: meal.location,
        when: meal.when,
        max_reservations: meal.max_reservations,
        price: meal.price,
        created_date: meal.created_date,
        image_url: meal.image_url,
        available_reservations: meal.available_reservations
    }));
}

export default async function MealPage({ params }) {
    // Fetch meal data on the server
    const meal_id = await params;
    const res = await fetch(`http://localhost:3001/api/meals/${meal_id.id}`);
    const meal = await res.json();

    return <ReviewClient meal={meal} />;
}