import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events && events.length === 0 && <h3>No events to show</h3>}

      {events && events.map((evt) => <EventItem key={evt.id} evt={evt} />)}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

// export async function getServerSideProps({ query: { page = 1 } }) {
//   // Calculate start page
//   const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

//   // Fetch total/count
//   const totalRes = await fetch(`${API_URL}/eventss`);
//   const total = await totalRes.json();

//   //Fetch events
//   const res = await fetch(
//     `${API_URL}/eventss?populate=image&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
//   );
//   const events = await res.json();

//   return {
//     props: {
//       events: events.data,
//       page: +page,
//       total: total.meta.pagination.total,
//     },
//   };
// }

export async function getServerSideProps({ query: { page = 1 }, req }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/eventss`);
  const total = await totalRes.json();

  //Fetch events
  const res = await fetch(
    `${API_URL}/eventss?populate=image&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
  );
  const events = await res.json();

  return {
    props: {
      events: events.data,
      page: +page,
      total: total.meta.pagination.total,
    },
  };
}
