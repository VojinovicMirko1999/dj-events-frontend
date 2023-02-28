import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events && events.length === 0 && <h3>No events to show</h3>}

      {events && events.map((evt) => <EventItem key={evt.id} evt={evt} />)}

      {events && events.length > 0 && (
        <Link className="btn-secondary" href="/events">
          View All Events
        </Link>
      )}
    </Layout>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();

//   return {
//     props: { events },
//   };
// }

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/eventss?populate=image`);
  const events = await res.json();

  return {
    props: { events: events.data },
    revalidate: 1,
  };
}
