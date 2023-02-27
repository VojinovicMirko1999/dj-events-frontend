import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Event({ evt }) {
  const router = useRouter();

  const deleteEvent = async () => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/eventss/${evt.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <ToastContainer />
        <h1>{evt.attributes.name}</h1>
        {evt.attributes.image.data && (
          <div className={styles.image}>
            <Image
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
              alt="Event image"
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link className={styles.back} href="/events">
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${API_URL}/eventss/${id}`);
  const events = await res.json();

  console.log(events);

  return {
    props: { evt: events.data },
  };
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/eventss`);
//   const events = await res.json();

//   const paths = events.data.map((evt) => ({
//     params: { id: evt.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps(paths) {
//   // or we can write instead of paths : { params : { slug }}
//   const res = await fetch(
//     `${API_URL}/eventss/${paths.params.id}?populate=image`
//   ); // if we write { params : { slug } } in parameter of function, we can us just slug
//   const events = await res.json();

//   return {
//     props: { evt: events.data },
//     revalidate: 1,
//   };
// }

// slug is optional name, but here in these 2 methods, if we named it as a slug, we need to named it exactly
