import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedPeople = [
  {
    firstName: "Maya",
    lastName: "Lopez",
    email: "maya.lopez@example.com",
    age: 29,
    city: "Austin",
  },
  {
    firstName: "Jordan",
    lastName: "Nguyen",
    email: "jordan.nguyen@example.com",
    age: 34,
    city: "Seattle",
  },
  {
    firstName: "Riley",
    lastName: "Patel",
    email: "riley.patel@example.com",
    age: 26,
    city: "Chicago",
  },
];

async function main() {
  for (const person of seedPeople) {
    await prisma.person.upsert({
      where: { email: person.email },
      update: {
        firstName: person.firstName,
        lastName: person.lastName,
        age: person.age,
        city: person.city,
      },
      create: person,
    });
  }

  console.log(`Seeded ${seedPeople.length} people.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
