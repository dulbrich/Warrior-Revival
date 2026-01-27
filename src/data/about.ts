export type LeadershipMember = {
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  image: string;
};

export type VolunteerMember = {
  firstName: string;
  lastInitial: string;
  branch: string;
  image?: string;
};

export const founderProfile: LeadershipMember = {
  firstName: "Katie",
  lastName: "Fry",
  role: "Founder | President",
  bio: "Dr. Katie Fry is a trauma psychologist with the Department of Veterans Affairs and serves as a Captain in the Utah Army National Guard. She is the founder of Warrior Revival, a Utah-based nonprofit dedicated to supporting service members, veterans, and their families. Dr. Fry also serves in a leadership role within the American Psychological Association's Division 19, the Society for Military Psychology. In addition to her public service, she owns a private practice specializing in trauma, addiction, and veteran care. In 2025, Dr. Fry was honored with the Pillar Award by the Utah Department of Veterans & Military Affairs' Veteran Business Resource Center.",
  image: "/about/leadership/katie-fry.jpg"
};

export const leadershipTeam: LeadershipMember[] = [
  {
    firstName: "Lyss",
    lastName: "Miller",
    role: "Secretary",
    bio: "Lyss joined Warrior Revival in January 2024 with a deep passion for supporting veterans. A real estate Associate Broker, she values community and service, dedicating her time to giving back to those who have served.",
    image: "/about/leadership/lyss-miller.jpg"
  },
  {
    firstName: "Steve",
    lastName: "Armstrong",
    role: "Fundraising Lead",
    bio: "Steve served 12 years as a radio communication officer, including tours in Iraq and South Korea, before being medically discharged due to a training injury. After his service, he transitioned to corporate life and later founded Steve's Black Sabbath BBQ.",
    image: "/about/leadership/steve-armstrong.jpg"
  },
  {
    firstName: "Carl",
    lastName: "Fry",
    role: "Operations Lead",
    bio: "Carl is a former New York volunteer firefighter recognized as 'Top Responder of the Year' and 'Firefighter of the Year.' Now a Director of Network Infrastructure in IT, he is passionate about giving back and organizes Warrior Revival's major side-by-side event.",
    image: "/about/leadership/carl-fry.jpg"
  }
];

export const volunteers: VolunteerMember[] = [
  {
    firstName: "Aaron",
    lastInitial: "B",
    branch: "U.S. Army & USAF",
    image: "/about/volunteers/aaron-b.jpg"
  },
  {
    firstName: "Audrey",
    lastInitial: "M",
    branch: "U.S. Army",
    image: "/about/volunteers/audrey-m.jpg"
  },
  {
    firstName: "Sonny",
    lastInitial: "W",
    branch: "U.S. Army",
    image: "/about/volunteers/sonny-w.jpg"
  },
  {
    firstName: "Brandy",
    lastInitial: "",
    branch: "Volunteer"
  },
  {
    firstName: "Teresa",
    lastInitial: "",
    branch: "Volunteer"
  },
  {
    firstName: "Mike",
    lastInitial: "",
    branch: "Volunteer"
  },
  {
    firstName: "Dave",
    lastInitial: "U",
    branch: "Volunteer",
    image: "/about/volunteers/dave.jpg"
  }
];
