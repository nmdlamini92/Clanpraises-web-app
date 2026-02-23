import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {

  const nmd = await prisma.user1.create({ 
    data: { 
      username: "guest", 
      tribe: "swati",
      email: "new@guest.com",
      password: "guest",
      clan: "dlamini",
    } 
    })


  const tribe = await prisma.tribe.create({
    data: {
      tribe: "zulu",
      praises_Plural: "Izithakazelo ZamaZulu",
      praises_Singular: "Izithakazelo"
    },
  })

  const tribe1 = await prisma.tribe.create({
    data: {
      tribe: "sotho",
      praises_Plural: "Diboko",
      praises_Singular: "Diboko"
    },
  })
  const tribe2 = await prisma.tribe.create({
    data: {
      tribe: "swati",
      praises_Plural: "Tinanatelo TemaSwati",
      praises_Singular: "Tinanatelo"
    },
  })

  const tribe3 = await prisma.tribe.create({
    data: {
      tribe: "shona",
      praises_Plural: "Nhetembo dzemandzinza",
      praises_Singular: "Nhetembo dzemandzinza"
    },
  })

  const tribe4 = await prisma.tribe.create({
    data: {
      tribe: "tsonga",
      praises_Plural: "hlomo",
      praises_Singular: "hlomo"
    },
  })

  const tribe5 = await prisma.tribe.create({
    data: {
      tribe: "other",
      praises_Plural: "clan praises",
      praises_Singular: "clan praises"
    },
  })

}

seed()
  .then(() => {
      console.log("Seeding done.");
    })
    .catch((e) => {
      console.error("Seeding failed:", e);
      process.exit(1);
    })
    .finally(() => {
      prisma.$disconnect();
    });


