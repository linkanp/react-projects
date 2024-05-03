import Link from "next/link";

export default function Meals() {
    return (
      <main>
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          Meals Page
        </h1>
        <uL>
            <li><Link href='/meals/meal-1'>Meal One</Link></li>
            <li><Link href='/meals/meal-2'>Meal Two</Link></li>
            <li><Link href='/meals/meal-3'>Meal Three</Link></li>
        </uL>
      </main>
    );
  }
  