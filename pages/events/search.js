import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Search result</h1>
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const res = await fetch(`${API_URL}/eventss`);
  const events = await res.json();

  const filteredEvents = events.data.filter((evt) => {
    if (evt.attributes.name.toLowerCase().includes(term.toLowerCase()))
      return evt;
  });

  return {
    props: { events: filteredEvents },
  };
}
