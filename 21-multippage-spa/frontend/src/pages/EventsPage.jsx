import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventsPage() {
    const { events } = useLoaderData();

    return <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
        {(data) => <EventsList events={data} />}
        </Await>
    </Suspense>
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        throw json({ message: 'Could not fetch events.' }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.events;
    }
}
export function eventLoader() {
    return defer({ 
        events: loadEvents(),
    });
}