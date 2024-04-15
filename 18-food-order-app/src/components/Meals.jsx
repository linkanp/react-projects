
import MealItem from './MealItem.jsx';
import Error from './Error.jsx';
import useHTTP from '../hooks/useHTTP.jsx';

const defaultConfig = {};

export default function Meals(){
    const { data, isLoading, error } = useHTTP('http://localhost:3000/meals', defaultConfig, []);
    if (isLoading) {
        return <p className='center'>Loading meals...</p>
    }
    if (error) {
        return <Error title="Failed to featch meals" message={error} />
    }
    return <>
        <ul id='meals'>
            {data.map((meal) => <MealItem key={meal.id} meal={meal} />)}
        </ul>
    </>
}