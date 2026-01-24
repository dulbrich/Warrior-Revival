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
  bio: "Katie holds a doctorate in clinical psychology and has dedicated her career to supporting military personnel. Passionate about trauma recovery and the transition to civilian life, she believes in the healing power of outdoor recreation and community connection for veterans.",
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
