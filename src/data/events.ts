export type EventItem = {
  name: string;
  dateIso: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  category: string;
  address?: string;
  notes?: string;
  contact?: {
    name: string;
    phone: string;
  };
  register_link: string;
};

export const buildEventId = (event: EventItem) => `${event.name}-${event.dateIso}`;

const hikeContact = { name: "Audrey", phone: "801-682-5939" };
const alphaCoffeeAddress = "7260 S Racquet Club Dr, Cottonwood Heights, UT 84121";
const battlePitAddress = "1895 Washington Blvd, Suite 300, Ogden, UT 84401";
const suuAddress = "351 West University Boulevard, Cedar City, UT 84720";
const suuRoom = "Escalante Room 144C, Sharwan Smith Student Center";

export const events: EventItem[] = [
  {
    name: "Book Club",
    dateIso: "2025-03-25",
    dateLabel: "Mar 25, 2025",
    timeLabel: "6:00 pm - 7:30 pm MDT",
    location: "Draper, UT",
    category: "Veteran + Support Person",
    register_link: ""
  },
  {
    name: "2nd Annual Warrior Revival Golf Tournament",
    dateIso: "2025-06-13",
    dateLabel: "Jun 13, 2025",
    timeLabel: "6:30 am - 4:00 pm MDT",
    location: "South Jordan, UT",
    category: "Fundraiser / Community",
    register_link: ""
  },
  {
    name: "MTB Ride & BBQ/Games",
    dateIso: "2025-07-26",
    dateLabel: "Jul 26, 2025",
    timeLabel: "10:00 am - 5:00 pm MDT",
    location: "Kamas, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Utah Air National Guard - Family Palooza",
    dateIso: "2025-08-02",
    dateLabel: "Aug 2, 2025",
    timeLabel: "8:00 am - 12:00 pm MDT",
    location: "Salt Lake City, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Muddy Dash",
    dateIso: "2025-08-09",
    dateLabel: "Aug 9, 2025",
    timeLabel: "8:00 am - 5:00 pm MDT",
    location: "Midway, UT",
    category: "Veteran + Support Person",
    register_link: ""
  },
  {
    name: "Fishing Tournament",
    dateIso: "2025-09-20",
    dateLabel: "Sep 20, 2025",
    timeLabel: "All day",
    location: "Strawberry Reservoir, UT",
    category: "Community",
    register_link: ""
  },
  {
    name: "Trail Hero",
    dateIso: "2025-09-29",
    dateLabel: "Sep 29 - Oct 4, 2025",
    timeLabel: "Multi-day",
    location: "Hurricane, UT",
    category: "Community",
    register_link: ""
  },
  {
    name: "Lunch with Vets (Weber County)",
    dateIso: "2025-10-26",
    dateLabel: "Oct 26, 2025",
    timeLabel: "10:00 am - 11:00 am MDT",
    location: "Ogden, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Coffee Hour (Utah County)",
    dateIso: "2025-11-01",
    dateLabel: "Nov 1, 2025",
    timeLabel: "9:30 am - 10:30 am MDT",
    location: "Saratoga Springs, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Coffee Hour (Salt Lake County)",
    dateIso: "2025-11-16",
    dateLabel: "Nov 16, 2025",
    timeLabel: "9:00 am - 10:30 am MST",
    location: "Cottonwood Heights, UT",
    category: "Veteran Only",
    register_link: ""
  },
  {
    name: "Where Art Meets Service - A Night for Military Families",
    dateIso: "2026-01-04",
    dateLabel: "Jan 4, 2026",
    timeLabel: "11:00 am - 2:00 pm MST",
    location: "Murray, UT",
    category: "Veteran + Family",
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-01-10",
    dateLabel: "Jan 10, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Draper Suspension Bridge, Draper, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-01-11",
    dateLabel: "Jan 11, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    notes: "Coffee donated by Alpha Coffee. Monthly volunteer meeting to follow.",
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-02-15",
    dateLabel: "Feb 15, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-03-15",
    dateLabel: "Mar 15, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-04-19",
    dateLabel: "Apr 19, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-05-17",
    dateLabel: "May 17, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-06-21",
    dateLabel: "Jun 21, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-07-19",
    dateLabel: "Jul 19, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-08-16",
    dateLabel: "Aug 16, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-09-13",
    dateLabel: "Sep 13, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-10-18",
    dateLabel: "Oct 18, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-11-15",
    dateLabel: "Nov 15, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-12-13",
    dateLabel: "Dec 13, 2026",
    timeLabel: "9:00 am - 10:30 am",
    location: "Alpha Coffee, Cottonwood Heights, UT",
    category: "Veteran Only",
    address: alphaCoffeeAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-01-25",
    dateLabel: "Jan 25, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    notes: "Must purchase own lunch. Appetizers will be offered.",
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-02-22",
    dateLabel: "Feb 22, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-03-29",
    dateLabel: "Mar 29, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-04-26",
    dateLabel: "Apr 26, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-05-31",
    dateLabel: "May 31, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-06-28",
    dateLabel: "Jun 28, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-07-26",
    dateLabel: "Jul 26, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-08-30",
    dateLabel: "Aug 30, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-09-27",
    dateLabel: "Sep 27, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-10-25",
    dateLabel: "Oct 25, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-11-29",
    dateLabel: "Nov 29, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "The Battle Pit: Lunch with Vets",
    dateIso: "2026-12-27",
    dateLabel: "Dec 27, 2026",
    timeLabel: "10:00 am - 11:00 am",
    location: "Steve's Black Sabbath BBQ, Ogden, UT",
    category: "Veteran Only",
    address: battlePitAddress,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-02-01",
    dateLabel: "Feb 1, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Little Mountain Summit, Emigration Canyon, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-03-07",
    dateLabel: "Mar 7, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Ensign Peak, Salt Lake City, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-04-12",
    dateLabel: "Apr 12, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Corner Canyon, Draper, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-05-02",
    dateLabel: "May 2, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Mueller Park Trail, Bountiful, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-06-07",
    dateLabel: "Jun 7, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Waterfall Canyon Trail, Ogden, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-07-11",
    dateLabel: "Jul 11, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Adams Canyon Trail, Layton, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-08-09",
    dateLabel: "Aug 9, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Scout Falls, AF Canyon, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-09-12",
    dateLabel: "Sep 12, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Living Room Lookout Trail, Salt Lake City, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-10-18",
    dateLabel: "Oct 18, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Alien Tower via Deer Ridge Trailhead, Draper, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-11-14",
    dateLabel: "Nov 14, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Grove Creek Trail, Pleasant Grove, UT",
    category: "Veteran + Family",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Hike with Audrey",
    dateIso: "2026-12-25",
    dateLabel: "Dec 25, 2026",
    timeLabel: "9:00 am - 11:30 am",
    location: "Rattlesnake Gulch, Millcreek, UT",
    category: "Veteran + Family",
    notes: "Christmas Day Hike",
    contact: hikeContact,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-01-29",
    dateLabel: "Jan 29, 2026",
    timeLabel: "6:30 pm - 8:00 pm",
    location: "Southern Utah University, Cedar City, UT",
    category: "Veteran / Service Member / Student",
    address: suuAddress,
    notes:
      `Room: ${suuRoom}. Open to service members, veterans, and SUU students. Coffee donated by Alpha Coffee.`,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-02-26",
    dateLabel: "Feb 26, 2026",
    timeLabel: "6:30 pm - 8:00 pm",
    location: "Southern Utah University, Cedar City, UT",
    category: "Veteran / Service Member / Student",
    address: suuAddress,
    notes: `Room: ${suuRoom}.`,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-03-26",
    dateLabel: "Mar 26, 2026",
    timeLabel: "6:30 pm - 8:00 pm",
    location: "Southern Utah University, Cedar City, UT",
    category: "Veteran / Service Member / Student",
    address: suuAddress,
    notes: `Room: ${suuRoom}.`,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-04-30",
    dateLabel: "Apr 30, 2026",
    timeLabel: "6:30 pm - 8:00 pm",
    location: "Southern Utah University, Cedar City, UT",
    category: "Veteran / Service Member / Student",
    address: suuAddress,
    notes: `Room: ${suuRoom}.`,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-05-28",
    dateLabel: "May 28, 2026",
    timeLabel: "6:30 pm - 8:00 pm",
    location: "Southern Utah University, Cedar City, UT",
    category: "Veteran / Service Member / Student",
    address: suuAddress,
    notes: `Room: ${suuRoom}.`,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-06-25",
    dateLabel: "Jun 25, 2026",
    timeLabel: "6:30 pm - 8:00 pm",
    location: "Southern Utah University, Cedar City, UT",
    category: "Veteran / Service Member / Student",
    address: suuAddress,
    notes: `Room: ${suuRoom}.`,
    register_link: ""
  },
  {
    name: "Beyond the Uniform - Military Coffee Hour",
    dateIso: "2026-07-23",
    dateLabel: "Jul 23, 2026",
    timeLabel: "6:30 pm - 8:00 pm",
    location: "Southern Utah University, Cedar City, UT",
    category: "Veteran / Service Member / Student",
    address: suuAddress,
    notes: `Room: ${suuRoom}.`,
    register_link: ""
  },
  {
    name: "Slide Into Winter Fun! - Snow Tubing",
    dateIso: "2026-02-19",
    dateLabel: "Feb 19, 2026",
    timeLabel: "6:00 pm - 8:00 pm",
    location: "Soldier Hollow Nordic Center, Midway, UT",
    category: "Veteran + Family",
    address: "2002 Soldier Hollow Lane, Midway, UT 84089",
    contact: hikeContact,
    notes: "Snow tubing winter activity. Pre-registration required via QR code.",
    register_link: "https://secure.qgiv.com/for/warriorrevival/event/snowtubing/"
  },
  {
    name: "Mission Ready: Southern Utah Military, Veteran & Family Wellness Fair",
    dateIso: "2026-02-21",
    dateLabel: "Feb 21, 2026",
    timeLabel: "10:00 am - 2:00 pm MST",
    location: "Southern Utah Military, Veteran & Family Wellness Fair",
    category: "Community / Resource Fair",
    notes:
      "Organizations are invited to participate as exhibitors to provide resources and services to military members, veterans, and families. Focus areas: Employment & Education, Family Support, Health & Wellness, Benefits & Claims. Features: Food trucks, entertainment, family activities.",
    register_link:
      "https://docs.google.com/forms/d/e/1FAIpQLSdhESI4wLfoNSdzEtF220Ctd_j0oXWyhEDAolcMTyrVrw1Wgg/viewform"
  },
  {
    name: "Military Kids Roller Skate",
    dateIso: "2026-04-11",
    dateLabel: "Apr 11, 2026",
    timeLabel: "9:00 am - 11:00 am",
    location: "Neptune Skating, Ogden, UT",
    category: "Veteran + Family / Military Kids",
    address: "2770 Washington Blvd, Ogden, UT 84401",
    notes:
      "Purple Up event celebrating the Month of the Military Child. Registration opens February 11, 2026.",
    register_link: ""
  },
  {
    name: "St. George Mission Ready Resource Fair",
    dateIso: "2026-02-21",
    dateLabel: "Feb 21, 2026",
    timeLabel: "10:00 am - 2:00 pm MST",
    location: "St. George, UT",
    category: "Community",
    register_link: ""
  },
  {
    name: "Ski/Snowboard Day",
    dateIso: "2026-03-19",
    dateLabel: "Mar 19, 2026",
    timeLabel: "12:00 pm - 3:30 pm MST",
    location: "Park City, UT",
    category: "Veteran Only",
    register_link: "https://secure.qgiv.com/for/warriorrevival/event/nacskisnowboarding/"
  },
  {
    name: "Warrior Revival Summer Fun",
    dateIso: "2026-06-20",
    dateLabel: "Jun 20, 2026",
    timeLabel: "8:00 am - 5:00 pm MDT",
    location: "Heber City, UT",
    category: "Veteran + Family",
    register_link: ""
  }
];
