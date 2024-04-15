
export async function getMeals(){
    const mealResponse = await fetch('http://localhost:3000/meals');
    if (!mealResponse.ok) {
        throw new Error('Failed to load meals');
    }
    const mealData = await mealResponse.json();
    return mealData;
}