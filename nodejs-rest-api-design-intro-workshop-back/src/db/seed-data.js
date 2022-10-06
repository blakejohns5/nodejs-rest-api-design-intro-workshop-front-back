function getSeedUsers() {
  return [
    {
      firstName: "Jordan",
      lastName: "Peterson",
      email: "woga@wi.lu",
      password: "jordan-super-password",
      speaks: ["english", "javascript"],
    },
    {
      firstName: "Margaret",
      lastName: "Watkins",
      email: "edde@kodbi.eh",
      password: "margaret-super-password",
      speaks: ["catalan", "spanish"],
    },
    {
      firstName: "Mable",
      lastName: "Schneider",
      email: "ba@wuf.ws",
      password: "mable-super-password",
      speaks: ["german", "english"],
    },
    {
      firstName: "Alta",
      lastName: "Harris",
      email: "cuk@boeli.gn",
      password: "alta-super-password",
      speaks: ["english", "spanish"],
    },
    {
      firstName: "Darrell",
      lastName: "Wilkerson",
      email: "ecdescu@riwluzhok.pf",
      password: "darrell-super-password",
      speaks: ["english", "javascript"],
    },
    {
      firstName: "Ryan",
      lastName: "McGuire",
      email: "beta@houboem.py",
      password: "ryan-super-password",
      speaks: ["english", "spanish"],
    },
  ];
}

function getSeedBooks() {
  return [
    {
      title: "Incubus Sky",
      author: null,
      genre: "Fantasy",
      year: 2010,
      pages: 220,
    },
    {
      title: "The Twilight Wanderer",
      author: null,
      genre: "Fantasy",
      year: 2012,
      pages: 300,
    },
    {
      title: "City of Monday",
      author: null,
      genre: "Crime",
      year: 2020,
      pages: 250,
    },
    {
      title: "The Saturday's Shaman",
      author: null,
      genre: "Romance",
      year: 2015,
      pages: 280,
    },
    {
      title: "The Underground of the Bane",
      author: null,
      genre: "Thriller",
      year: 2020,
      pages: 20,
    },
    {
      title: "God in the Roadtrip",
      author: null,
      genre: "Fantasy",
      year: 2018,
      pages: 320,
    },
    {
      title: "Sunken Haven",
      author: null,
      genre: "Comedy",
      year: 2017,
      pages: 240,
    },
    {
      title: "The Harrowing Temper",
      author: null,
      genre: "Crime",
      year: 2012,
      pages: 120,
    },
    {
      title: "Sleep of Hallows",
      author: null,
      genre: "Fantasy",
      year: 2012,
      pages: 220,
    },
    {
      title: "The Cavern's Fire",
      author: null,
      genre: "Crime",
      year: 2014,
      pages: 240,
    },
  ];
}

module.exports = {
  getSeedUsers: getSeedUsers,
  getSeedBooks: getSeedBooks,
};
