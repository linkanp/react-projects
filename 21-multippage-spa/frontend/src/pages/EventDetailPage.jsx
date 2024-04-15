import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";


export default function EventDetailPage() {
    const data = useRouteLoaderData('event-details');
    return <>
        <EventItem event={data.event} />
    </>
}

export async function loader({request, params}) {
    const id = params.id;
    const response = await fetch('http://localhost:8080/events/'+ id);
    if (!response.ok) {
        throw json(
            { message: 'Cound not fetch event details!' },
            { status: 500 }
        );
    } else {
        return response;
        
    }
}

export async function action({request, params}) {
    const eventId = params.id;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
    });
    if (!response.ok) {
        throw json({ message: 'Could not delete event.' }, { status: 500 });
    }
    return redirect('/events');
}