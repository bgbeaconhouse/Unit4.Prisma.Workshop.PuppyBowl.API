const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create 10 players
  const createPlayers = async () => {
    const players = [
        {name: "Ben", breed: "labrador", status: "BENCH"},
        {name: "Derrick", breed: "poodle", status: "BENCH"},
        {name: "Jonas", breed: "retriever", status: "FIELD"},
        {name: "Cody", breed: "dalmation", status: "BENCH"},
        {name: "Tommy", breed: "bulldog", status: "BENCH"},
        {name: "Ralph", breed: "great dane", status: "FIELD"},
        {name: "Jimmy", breed: "rotweiler", status: "BENCH"},
        {name: "Ryan", breed: "yorkie", status: "FIELD"},
        {name: "Sebastian", breed: "beagle", status: "FIELD"},
        {name: "Mike", breed: "basset hound", status: "BENCH"},

    ]
    await prisma.player.createMany({data: players});
  };
  await createPlayers()
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });