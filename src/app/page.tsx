import HomePageClient from "./HomePageClient";
import { fetchUpcomingEvents } from "@/lib/events/queries";

export default async function Home() {
  const upcomingEvents = await fetchUpcomingEvents(3);
  return <HomePageClient upcomingEvents={upcomingEvents} />;
}
