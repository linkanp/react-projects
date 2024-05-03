export default function MealsDetails( {params}) {
    return (
      <main>
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          Meals Deatils Page
        </h1>
        <p>{params.mealSlug}</p>
      </main>
    );
  }
  