const db = require("../models");
const { getSeedUsers } = require("./seed-data");

async function seedUsers() {
  const users = getSeedUsers();

  await db.User.deleteMany({});
  await db.User.create([...users]);
}

function getRandomItem(arr = []) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  seedUsers: seedUsers,
  getRandomItem: getRandomItem,
};
