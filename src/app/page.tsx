import HomePageClient from "./HomePageClient";
import { fetchUpcomingEvents } from "@/lib/events/queries";

export default async function Home() {
  const upcomingEvents = await fetchUpcomingEvents(5);
  return <HomePageClient upcomingEvents={upcomingEvents} />;
}
